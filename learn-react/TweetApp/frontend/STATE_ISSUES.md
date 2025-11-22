# Frontend – State-Related Issues

This document lists state-related issues identified in the **frontend** project (React app under `frontend/`). They are grouped by category with file references and suggested fixes.

---

## 1. Duplicate / Derived State (Redux + Local State)

**Issue:** Components keep local state that is fully derived from Redux (and sometimes from other props). This duplicates source of truth and can get out of sync; it also adds unnecessary `useEffect` and re-renders.

### 1.1 ViewTopicRouterPage – `pinnedTopics` and `isPinned`

- **File:** `src/components/topic/sub-components/common/ViewTopicRouterPage.jsx`
- **Status:** Addressed — values are derived with **`useMemo`** from Redux (no local sync state).
- **What (historical):** `pinnedTopics` and `isPinned` were stored in `useState` and updated in a `useEffect` that derived them from `pinnedItems` (Redux) and `topics` (Redux).
- **Why it’s a problem:** Derived data is kept in state and synced via effect instead of being computed. Extra state and effect; risk of one-off sync bugs.
- **Recommendation:** Compute with `useMemo` and remove the effect and local state, e.g.:

```js
const pinnedTopics = useMemo(() => {
  if (!pinnedItems?.length || !topics?.length) return [];
  const list = pinnedItems.filter(
    (pi) => pi.linkedItemType === "topic" && pi.softDelete === false
  );
  return list.map((pit) => ({
    ...pit,
    title: topics.find((t) => t.uniqueId === pit.linkedUniqueId)?.title || "",
  }));
}, [pinnedItems, topics]);

const isPinned = useMemo(
  () => pinnedTopics.some((pit) => pit.linkedUniqueId === id),
  [id, pinnedTopics]
);
```

### 1.2 ViewTaskRouterPage – same pattern

- **File:** `src/components/my-tasks/sub-components/common/ViewTaskRouterPage.jsx`
- **Status:** Addressed — **`useMemo`** derivation (same as topic view).
- **What (historical):** `pinnedTasks` and `isPinned` were local state derived from `pinnedItems` and `tasks` in a `useEffect`.
- **Recommendation:** Same as 1.1 – derive with `useMemo` and remove the effect and related state.

### 1.3 MemoryMapListRouterPage – `selectedMemoryMap` from `location.state`

- **File:** `src/components/memory-maps/list/MemoryMapListRouterPage.jsx`
- **Status:** Addressed — `selectedMemoryMap` is derived with **`useMemo`** from `location.state.data` (no `useEffect` mirroring into `useState`).

---

## 2. Stale Closure in setState

**Issue:** `setState` is called with a value that depends on current state (e.g. `state` or `activities`) instead of the functional form, so under rapid or async updates the closure can be stale and overwrite newer state.

### 2.1 ActionableContainer – appending to `activities`

- **File:** `src/ApnaPlayground/actionable/ActionableContainer.jsx`
- **What:** `setActivities([...activities, response.data])` uses `activities` from the closure. If two requests resolve close together, the second can overwrite the first.
- **Recommendation:** Use functional update:

```js
setActivities((prev) => [...prev, response.data]);
```

---

## 3. Redux Slice / Server State Issues

### 3.1 topicSlice – `createTopic.fulfilled` does nothing

- **File:** `src/redux/slices/topicSlice.js`
- **What:** In `extraReducers`, `createTopic.fulfilled` has no logic (commented-out push). The new topic is never added to `state.data`.
- **Impact:** After creating a topic, the list does not update until a refetch or manual refresh.
- **Recommendation:** Either add the new topic to the tree (or to a flat list if you maintain one) in `createTopic.fulfilled`, or refetch topics after create so the list stays in sync.

### 3.2 topicSlice – `updateTopic.fulfilled` may overwrite tree structure

- **File:** `src/redux/slices/topicSlice.js`
- **What:** `state.data[index] = updatedTopic` replaces the whole node with the API response. If the API does not return `children` (or full tree), you can lose the subtree.
- **Recommendation:** Merge: e.g. keep existing `children` (and other fields) when the API doesn’t return them, or ensure the API returns the full node including children.

### 3.3 Store uses `dataSlice1`; `dataSlice.js` exists separately

- **File:** `src/redux/store.js` imports `dataSlice1`; `src/redux/slices/dataSlice.js` also exists.
- **What:** Naming is confusing; it’s unclear whether both are needed or one is legacy. `dataSlice.js` uses a different API base URL (`localhost:3001`).
- **Recommendation:** Clarify which slice is canonical, remove or rename the unused one, and align API base URL with the rest of the app (e.g. `globalConstants`).

---

## 4. useEffect Dependency and Stale-Closure Risks

**Issue:** Missing dependencies or disabled exhaustive-deps can hide stale closures or unnecessary/insufficient runs.

### 4.1 ViewTopicRouterPage – disabled deps

- **File:** `src/components/topic/sub-components/common/ViewTopicRouterPage.jsx`
- **What:** Two `useEffect` hooks use `// eslint-disable-next-line react-hooks/exhaustive-deps` and omit `refetch` and `sectionsRefetch` (and possibly others) from dependency arrays.
- **Recommendation:** Add the real dependencies (e.g. `refetch`, `sectionsRefetch`) and remove the eslint-disable, or document why it’s safe to omit them.

### 4.2 TreeBase – effect deps and initial call

- **File:** `src/common/components/tree-base/TreeBase.jsx`
- **What:**
  - `useEffect(() => { onNodeSelection(flattenedTree[selectedIndex]); }, [selectedIndex]);` – missing `flattenedTree` and `onNodeSelection` in the dependency array. Can call with stale `flattenedTree` or trigger at wrong times.
  - On first mount, `flattenedTree` can be `[]`, so `onNodeSelection(flattenedTree[0])` may run with `undefined`.
- **Recommendation:** Add `flattenedTree` and `onNodeSelection` to the dependency array. Guard the call (e.g. only call when `flattenedTree[selectedIndex]` is defined) or run the effect only when `flattenedTree.length > 0` if that matches intended behavior.

### 4.3 AddUpdateSkeletonUsingTreeEditor – previewSkeleton in deps

- **File:** `src/components/memory-maps/AddUpdateSkeletonUsingTreeEditor.jsx`
- **What:** `useEffect(() => { previewSkeleton(); }, [previewSkeleton]);` runs on every change of `formData.skeleton` (because `previewSkeleton` is recreated when it changes). That may be intended, but worth confirming. Also, `formData` is initialized from `initialFormData` (e.g. from `location.state`) with no sync when `initialFormData` changes.
- **Recommendation:** If “preview when skeleton text changes” is desired, current pattern is acceptable; otherwise consider a more explicit dependency (e.g. `formData.skeleton`). For `formData`, either document that it’s “initial only” or add a sync effect when `initialFormData` (or route) changes so editing a different item updates the form.

---

## 5. Form State Not Synced With Props / Route

**Issue:** Form state is initialized from props or route once; when the same component is reused with different props (e.g. different item id), form state does not update.

### 5.1 QuestionForm – formData vs initialFormData

- **File:** `src/components/interview-mgmt/sub-components/QuestionForm.jsx`
- **What:** `formData` is set once via `useState(initialFormData...)`. If the parent passes a new `initialFormData` (e.g. when switching to another question), `formData` does not update.
- **Recommendation:** Either:
  - Sync when `initialFormData` (or a stable id from it) changes: e.g. `useEffect(() => { setFormData(...); }, [initialFormData?.uniqueId]);`, or
  - Use a key on the form so the component remounts when the edited entity changes (e.g. `key={initialFormData?.uniqueId}`).

### 5.2 AddUpdateSkeletonUsingTreeEditor – formData from location.state

- **File:** `src/components/memory-maps/AddUpdateSkeletonUsingTreeEditor.jsx`
- **What:** `formData` is initialized from `location.state.data`. Navigating to the same route with different `location.state` does not reset form state.
- **Recommendation:** Same as 5.1: sync form state when the “source” identity changes (e.g. `initialFormData?.uniqueId`) or remount with a key.

---

## 6. Auth State Only in Local Component State

**Issue:** Auth is stored only in React state; no single source of truth shared across tabs or with token refresh logic.

### 6.1 App.js – isAuthenticated and loading

- **File:** `src/App.js`
- **What:** `isAuthenticated` and `loading` live in local `useState`. Token is read once on mount. If the user logs in/out in another tab, or the token is refreshed/revoked elsewhere, this app’s state won’t reflect it.
- **Recommendation:** Consider moving auth state to a global store (e.g. Redux or Context) or a small auth module that can react to storage events / token changes, and drive `isAuthenticated` and loading from there.

---

## 7. Redux / Backdrop Slice – Console and Redundant Check

### 7.1 backdropSlice – console.log and redundant branch

- **File:** `src/redux/slices/backdropSlice/index.js`
- **What:** `updateBackdropV3` has `console.log("state.customBackdrop.v3: ", ...)` in production code and an `if (v3.active)` branch after already returning when `!v3.active`.
- **Recommendation:** Remove the console.log (or guard with `process.env.NODE_ENV`). Simplify the reducer by removing the redundant `if (v3.active)` block.

---

## 8. Summary Table

| Category              | Location(s)                                      | Severity / impact                          |
|-----------------------|--------------------------------------------------|--------------------------------------------|
| Derived state         | ViewTopicRouterPage, ViewTaskRouterPage          | Medium – unnecessary state and effects     |
| Stale closure setState| ActionableContainer                              | Medium – race condition on rapid updates   |
| Redux create/update   | topicSlice (createTopic, updateTopic)            | High – list not updating / tree loss       |
| Redux naming/duplication | store.js vs dataSlice.js                       | Low – clarity and consistency              |
| useEffect deps        | ViewTopicRouterPage, TreeBase, AddUpdateSkeleton | Low–Medium – stale closures or wrong runs  |
| Form sync with props  | QuestionForm, AddUpdateSkeletonUsingTreeEditor   | Medium – wrong data when prop/route changes|
| Auth global state     | App.js                                           | Medium – cross-tab / refresh consistency   |
| Backdrop slice        | backdropSlice/index.js                           | Low – cleanup only                         |

---

## 9. Recommended Order of Fixes

1. **High:** Fix topicSlice so create/update correctly update or refetch state (3.1, 3.2).
2. **Medium:** Replace derived state with `useMemo` in ViewTopic and ViewTask (1.1, 1.2); fix ActionableContainer setState (2.1); consider form sync or keys for QuestionForm and AddUpdateSkeleton (5.1, 5.2).
3. **Low:** Fix useEffect deps and remove eslint-disables where possible (4.x); remove console and redundant logic in backdropSlice (7.1); clarify or remove duplicate data slice (3.3); consider global auth state (6.1).
