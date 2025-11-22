import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Select from "react-select";
import CustomButton from "../../common/components/custom-button/CustomButton";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import ViewSwitcher from "../../common/components/view-switcher/ViewSwitcher";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import {
  useFetchByUrl,
  useReduxDataFetching,
} from "../../common/hooks/useDataFetching";
import {
  createTag,
  fetchTags,
  getTagForUniqueId,
  getTagsForComboOptions,
  selectAllFlatTags,
  selectNextTagUniqueId,
  selectPrevTagUniqueId,
  selectTagsStateCombined,
  setSelectedTagUniqueId,
  updateTag,
} from "../../redux/slices/tagsSlice";
import TagCard, { TagLinkedItemType } from "./TagCard";
import TagForm from "./TagForm";
import TagListOldView from "./TagListOldView";

const TagBase = () => {
  const [selectedView, setSelectedView] = useState("list");
  const handleChangeView = (event) => {
    setSelectedView(event.target.value);
  };
  return (
    <div className="space-y-4">
      <ViewSwitcher
        viewList={[
          { viewName: "list", viewLabel: "List View" },
          { viewName: "card", viewLabel: "Card View" },
        ]}
        onChange={handleChangeView}
        selectedView={selectedView}
      />
      {selectedView === "list" && <ListTags />}
      {selectedView === "card" && <TagListOldView />}
    </div>
  );
};

const ListTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedElementRef = useRef(null);
  const sidebarButtonClass =
    "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150";

  // Fetch tags data only when component mounts (with smart caching)
  useReduxDataFetching(fetchTags, (state) => state.tags);

  // Use combined selector to optimize multiple useSelector calls
  const { tags, loading: status, error, selectedId: selectedTagUniqueId } = useSelector(selectTagsStateCombined);

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [selectedTagUniqueId]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleLinkSelection = (selectedItem) => {
    navigate(`${selectedItem.uniqueId}`);
  };

  if (status === "pending" || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[24rem] rounded-xl border border-gray-200 bg-gray-50/50">
        <span className="text-sm font-medium text-gray-500">Loading tags…</span>
      </div>
    );
  }

  if (status === "rejected" || status === "failed" || error) {
    return (
      <div className="flex items-center justify-center min-h-[24rem] rounded-xl border border-red-200 bg-red-50/80">
        <span className="text-sm font-medium text-red-700">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="lg:w-72 lg:flex-shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <CustomButton className={sidebarButtonClass} onClick={() => handleButtonClick("create")}>
              Create Tag
            </CustomButton>
            <CustomButton className={sidebarButtonClass} onClick={() => dispatch(fetchTags())}>
              Refresh
            </CustomButton>
            <CustomButton className={sidebarButtonClass} onClick={() => navigate(`/tags/search`)}>
              Search
            </CustomButton>
          </div>
          <nav className="text-sm" aria-label="Tags tree">
            <Tree
              data={tags}
              selectedNodeId={selectedTagUniqueId}
              renderNode={(tag) => (
                <button
                  type="button"
                  ref={selectedTagUniqueId === tag.uniqueId ? selectedElementRef : null}
                  className={`w-full text-left rounded-md px-2 py-1.5 text-xs transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 ${
                    selectedTagUniqueId && selectedTagUniqueId === tag.uniqueId
                      ? "font-semibold text-green-700 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => handleLinkSelection(tag)}
                >
                  {tag.name}
                </button>
              )}
            />
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="min-h-[24rem] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const ViewTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/tags/${id}`;
  const { data, refetch } = useFetchByUrl({ url });
  // const [searchParams] = useSearchParams();
  // const sectionId = searchParams.get("sectionId");

  // const selectedTagUniqueId = useSelector(selectSelectedTagUniqueId);
  const nextTagUniqueId = useSelector(selectNextTagUniqueId);
  const prevTagUniqueId = useSelector(selectPrevTagUniqueId);

  useEffect(() => {
    if (id) {
      refetch();
      dispatch(setSelectedTagUniqueId(id));
    }
  }, [id, dispatch, refetch]);

  const handleEdit = (item) => {
    navigate(`/tags/${data.uniqueId}/edit`, { state: { data } });
  };

  const handleLinkSelection = (selectedItem, itemType) => {
    if (selectedItem && itemType) {
      if (TagLinkedItemType.topic === itemType) {
        navigate(`/topic-mgmt/${selectedItem.uniqueId}`);
      } else if (TagLinkedItemType.topicSection === itemType) {
        navigate({
          pathname: `/topic-mgmt/${selectedItem.linkedTopicUniqueId}`,
          search: selectedItem.uniqueId
            ? createSearchParams({
                sectionId: selectedItem.uniqueId,
              }).toString()
            : "",
        });
      } else if (TagLinkedItemType.task === itemType) {
        navigate(`/task-mgmt/${selectedItem.uniqueId}`);
      } else if (TagLinkedItemType.question === itemType) {
        navigate(`/interview-mgmt/questions/${selectedItem.uniqueId}`);
      }
    }
  };

  const addChildTag = (id) => {
    navigate(`/tags/${id}/add-sub-tag`);
  };

  const handleChildTagClick = (item) => {
    navigate(`/tags/${item?.uniqueId}`);
  };

  const handleMoveAnotherParent = (item) => {
    navigate(`/tags/${id}/move-parent`);
  };

  const handleTagTraversal = (increment) => {
    if (increment === 1 && nextTagUniqueId) {
      navigate(`/tags/${nextTagUniqueId}`);
    } else if (increment === -1 && prevTagUniqueId) {
      navigate(`/tags/${prevTagUniqueId}`);
    }
  };

  const handleAncestorClick = (ancestor) => {
    if (!ancestor) {
      return;
    }
    navigate(`/tags/${ancestor.uniqueId}`);
  };

  const handleBaseSpanClick = () => {
    dispatch(setSelectedTagUniqueId(null));
    navigate(`/tags`);
  };

  return data ? (
    <TagCard
      onAddSubTag={() => addChildTag(id)}
      showDescription={true}
      tag={data}
      onEdit={handleEdit}
      onLinkedItemClick={handleLinkSelection}
      onChildTagClick={handleChildTagClick}
      onMoveAnotherParent={handleMoveAnotherParent}
      onTagTraversal={handleTagTraversal}
      onAncestorClick={handleAncestorClick}
      onBaseSpanClick={handleBaseSpanClick}
    />
  ) : (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
      No data found for tag id: {id}
    </div>
  );
};

const CreateTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const handleCancel = () => {
    navigate(-1);
  };
  const handleSaveTag = (data) => {
    dispatch(createTag({ ...data }));
    navigate(-1);
  };
  return (
    <div className="space-y-6">
      {parentId && (
        <p className="text-sm text-gray-500">
          Parent tag: <span className="font-medium text-gray-700">{parentId}</span>
        </p>
      )}
      <TagForm
        formData={{ parentId: parentId || "" }}
        onSubmit={handleSaveTag}
        onCancel={handleCancel}
      />
    </div>
  );
};

const EditTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state || {};
  const handleCancel = () => {
    navigate(-1);
  };

  const handleEditTag = (data) => {
    dispatch(updateTag({ ...data }));
    navigate(-1);
  };
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Edit Tag</h2>
      {data ? (
        <TagForm
          formData={data}
          onSubmit={handleEditTag}
          onCancel={handleCancel}
        />
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          No tag data available. Open a tag first, then use Edit.
        </div>
      )}
    </div>
  );
};

// const MoveToAnotherTagParent=()=>{
//     return(
//         <>Move to another tag parent</>
//     )
// }

const AddSubTagComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const treeStructuredTasks = useSelector((state) => state.tags.data);
  const { id } = useParams();

  const tag = useSelector(getTagForUniqueId(id));

  const tagOptions = useSelector(getTagsForComboOptions);

  const handleTaskSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the tag data
    setFormData({
      ...formData,
      children: selectedTags.map((tag) => tag.value),
    });
  };

  const [formData, setFormData] = useState({
    // _id: tag && tag._id ? tag._id : "",
    uniqueId: tag && tag.uniqueId ? tag.uniqueId : "",
    // title: tag && tag.title ? tag.title : "",
    // description: tag && tag.description ? tag.description : "",
    // parentId: tag && tag.parentId ? tag.parentId : "",
    // linkedTasks: tag && tag.linkedTasks ? tag.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked tag IDs
    // tags: tag && tag.tags ? tag.tags : [], // Set the initial tags based on the tag
    children: tag && tag.children ? tag.children.map((c) => c.uniqueId) : [],
  });

  const handleSaveTask = () => {
    // console.log(
    //     `Going to save: tagId: ${tag._id} , formData : ${JSON.stringify(
    //         formData
    //     )}`
    // );
    if (tag && tag.uniqueId) {
      // If a tag is provided, it's an update
      dispatch(
        updateTag({
          ...{ children: formData.children },
          uniqueId: tag.uniqueId,
        })
      );
      // console.log("updated!!!");
    } else {
      // console.log("Not updated!!!");
    }
    navigate(-1);
  };

  const handleCreateNewSubtag = () => {
    navigate({
      pathname: `/tags/create`,
      search: createSearchParams({
        parent: id,
      }).toString(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <CustomButton onClick={handleCreateNewSubtag}>
          Create new Sub-Tag
        </CustomButton>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <label htmlFor="tags" className="mb-3 block text-sm font-semibold text-gray-700">
          Add Existing Tags
        </label>
        <Select
          classNamePrefix="react-select"
          isMulti
          name="tags"
          options={tagOptions}
          value={tagOptions.filter(
            (t) =>
              formData.children.includes(t.value) &&
              t.value !== formData.uniqueId
          )}
          onChange={handleTaskSelect}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </div>
  );
};

const MoveToAnotherTagParent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const treeStructuredTasks = useSelector((state) => state.tags.data);
  const { id } = useParams();

  // const tags = prepareTasksQueue(treeStructuredTasks);
  const tag = useSelector(getTagForUniqueId(id));
  const tags = useSelector(selectAllFlatTags);

  //   const tag = tags?.find((t) => t.uniqueId === id);

  const tagOptions = tags
    .filter((t) => t.uniqueId !== tag.uniqueId)
    .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(tag.uniqueId))
    .map((t) => ({
      value: t.uniqueId, // Assuming tag have unique IDs
      label: t.title, // Display tag title in the dropdown
    }));
  // .push({
  //     value: '', // Assuming tag have unique IDs
  //     label: 'ROOT', // Display tag title in the dropdown
  // });

  const handleTaskSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the tag data
    // console.log(
    //     `JSON.stringify(selectedTags): ${JSON.stringify(selectedTags)}`
    // );
    setFormData({ ...formData, parentId: selectedTags.value });
  };

  const [formData, setFormData] = useState({
    // _id: tag && tag._id ? tag._id : "",
    uniqueId: tag && tag.uniqueId ? tag.uniqueId : "",
    // title: tag && tag.title ? tag.title : "",
    // description: tag && tag.description ? tag.description : "",
    parentId: tag && tag.parentId ? tag.parentId : "",
    // linkedTasks: tag && tag.linkedTasks ? tag.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked tag IDs
    // tags: tag && tag.tags ? tag.tags : [], // Set the initial tags based on the tag
    // children: tag && tag.children ? tag.children.map(c => c.uniqueId) : []
  });

  const handleSaveTask = () => {
    // console.log(
    //     `Going to save: tagId: ${tag._id} , formData : ${JSON.stringify(
    //         formData
    //     )}`
    // );
    if (tag && tag.uniqueId) {
      // If a tag is provided, it's an update
      dispatch(
        updateTag({
          ...{ parentId: formData.parentId },
          uniqueId: tag.uniqueId,
        })
      );
      // console.log("updated!!!");
    } else {
      // console.log("Not updated!!!");
    }
    navigate(-1);
  };

  const [selectedOption] = useState("");

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{tag?.title}</p>
        <label htmlFor="tags" className="mt-4 mb-3 block text-sm font-semibold text-gray-700">
          Select New Parent
        </label>
        <Select
          classNamePrefix="react-select"
          name="tags"
          options={tagOptions}
          defaultValue={selectedOption}
          onChange={handleTaskSelect}
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </div>
  );
};


const SearchTagRouterPage = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
      Search Tag — coming soon
    </div>
  );
};

export default TagBase;
export {
  AddSubTagComp,
  CreateTag,
  EditTag,
  MoveToAnotherTagParent,
  SearchTagRouterPage,
  ViewTag,
};
