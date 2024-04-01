# My Bugs/New Requirements

## [Code Freeze till 30th June 2024]

### New Feature or Enhancements
- The tree view of topics should be collapsible/expandable.
- CSS-related issue in the topics list page.
- CSS-related issue in the links list page.
- CSS-related issue in the tasks list page.
- Feature to convert a topic into a section.
- Feature to convert a section into a topic.
- Feature to add tags to a section.
- Feature to make tags hierarchical. Also, in Redux, store `treeData` and `flattenedData`. `FlattenedData` is computed data post-fetch of `treeData`.
- Please add a search input below the "Create Topic" button on the topic landing page.
- Please change the Description component in `LinkForm` to `SmartEditor`.
- Please change the Description component in the Topic Creation and Edit Form to `SmartEditor`.
  - For backward compatibility, the description will become read-only. If someone is going to edit a topic, they will see `SmartEditor`, with the default selection for `CKEditor`.
- Please change the Description component in the Task Creation and Edit Form to `SmartEditor`.
  - For backward compatibility, the description will become read-only. If someone is going to edit a task, they will see `SmartEditor`, with the default selection for `CKEditor`.
- Please rethink the Links functionality. As we are creating a hierarchical structure, not all nodes in the link tree will be clickable or contain links.
  - One possible way could be to use `linkType: EXTERNAL-WEB`. In case a link is being used as a container, then we can make `linkType` to `CONTAINER`.
- If `linkType` is `EXTERNAL-WEB` or `INTERNAL-WEB`, then it must not have children. However, it can have Sections.
- If `linkType` is `CONTAINER`, then only it may have children.
- For a given search string, please search a topic:
  - if any topic title contains the given search string.
  - if any topic title is exactly the same as the given search string.
  - if any topic contains the search string in the title or description.
- For a given list of one or more tag `uniqueId`, find a list of linked Tweets, Tasks, Topics, Links, and Sections. On click of a tag, it should be routed to a page rendering data from the previously mentioned API.
- A topic can have list of related topics, with relation
  - If `Topic A` is `Depends on` `Topic B`, then `Topic B` is `Blocked By` `Topic A`
- Feature to pin a topic. Pinned topic's uniqueId can be stored in localstorage in a `pinnedTopics` list.

### Code Refactor
- Add `RouterPage` prefix to components used for routing pages. This is due to some confusion about which component is for routing pages.

### Bug Fix
- Cancel button missing in `LinkForm`.
- Refresh button missing in the link base page, next to the "Create Link" button.

### Additional Requests
- Please make the application/process take regular database backups and put the data into GitHub/Google Drive.