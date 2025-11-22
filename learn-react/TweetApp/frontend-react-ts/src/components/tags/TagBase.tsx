import React, { useEffect, useMemo, useRef, useState } from "react";
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
import useDataFetching from "../../common/hooks/useDataFetching/v1";
import {
  createTag,
  fetchTags,
  selectAllFlatTags,
  selectNextTagUniqueId,
  selectPrevTagUniqueId,
  selectTagsForComboOptions,
  selectTagsStateCombined,
  setSelectedTagUniqueId,
  updateTag,
} from "../../redux/slices/tagsSlice";
import TagCard, { TagLinkedItemType } from "./TagCard";
import TagForm from "./TagForm";
import type { AppDispatch } from "../../redux/store"; // ✅ Removed unused RootState
import TagListOldView from "./TagListOldView";

const TagBase = () => {
  const [selectedView, setSelectedView] = useState("list");
  const handleChangeView = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedView(event.target.value);
  };
  return (
    <div>
      <ViewSwitcher
        viewList={[
          { viewName: "list", viewLabel: "List View" },
          { viewName: "card", viewLabel: "Card View" },
        ]}
        onChange={handleChangeView}
        selectedView={selectedView}
      >
        {/* no-op */}
      </ViewSwitcher>
      {selectedView === "list" && <ListTags />}
      {selectedView === "card" && <TagListOldView />}
    </div>
  );
};

const ListTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectedElementRef = useRef<HTMLSpanElement | null>(null);
  const sidebarButtonClass =
    "bg-gray-100 border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 rounded hover:bg-gray-200 transition";

  // Fetch tags data only when component mounts
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  // Use combined selector to optimize multiple useSelector calls
  const { tags, status, error, selectedId: selectedTagUniqueId } = useSelector(selectTagsStateCombined); // ✅ Standardized: removed loading alias, use status directly

  useEffect(() => {
    if (selectedElementRef.current) {
      selectedElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [selectedTagUniqueId]);

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  const handleLinkSelection = (selectedItem: any) => {
    // console.log(JSON.stringify(selectedItem));
    // setSelectedLink(selectedItem);
    navigate(`${selectedItem.uniqueId}`);
  };

  if (status === "loading") { // ✅ Standardized: pending -> loading
    return <div>Loading...</div>;
  }

  if (status === "failed" || error) { // ✅ Standardized: rejected -> failed
    return <div>Error: {String(error)}</div>;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-72 lg:flex-shrink-0">
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
          <Tree
            data={tags}
            selectedNodeId={selectedTagUniqueId || undefined}
            renderNode={(tag) => (
              <span
                ref={selectedTagUniqueId === tag.uniqueId ? selectedElementRef : null}
                className={`block cursor-pointer py-1 text-xs ${
                  selectedTagUniqueId && selectedTagUniqueId === tag.uniqueId ? "font-semibold text-green-600" : "text-gray-700"
                }`}
                onClick={() => handleLinkSelection(tag)}
              >
                {tag.name}
              </span>
            )}
            onDragStart={undefined as any}
            onDrop={undefined as any}
            errorMessageOnNoData={"" as any}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="min-h-[24rem] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const ViewTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  // ✅ Memoize URL to prevent infinite loops
  const url = useMemo(
    () => `${BACKEND_APPLICATION_BASE_URL}/tags/${id}`,
    [id]
  );
  const { data, refetch } = useDataFetching({ url });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]); // Removed refetch from dependencies to prevent infinite loop

  const handleEdit = (_item: any) => {
    if (!id) return;
    navigate(`/tags/${id}/edit`, { state: { data } });
  };

  const handleLinkSelection = (selectedItem: any, itemType: string) => {
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

  const addChildTag = (id: string) => {
    navigate(`/tags/${id}/add-sub-tag`);
  };

  const handleChildTagClick = (item: any) => {
    navigate(`/tags/${item?.uniqueId}`);
  };

  const handleMoveAnotherParent = (_item: any) => {
    navigate(`/tags/${id}/move-parent`);
  };

  const handleTagTraversal = (increment: number) => {
    if (increment === 1 && nextTagUniqueId) {
      navigate(`/tags/${nextTagUniqueId}`);
    } else if (increment === -1 && prevTagUniqueId) {
      navigate(`/tags/${prevTagUniqueId}`);
    }
  };

  const handleAncestorClick = (ancestor: any) => {
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
      onAddSubTag={() => addChildTag(id || "")}
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
    <>No data found for given tag id : {id}</>
  );
};

const CreateTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const handleCancel = () => {
    navigate(-1);
  };
  const handleSaveTag = (data: any) => {
    // alert(JSON.stringify(data, null, 2));
    dispatch(createTag({ ...data } as any));
    navigate(-1);
  };
  return (
    <>
      {`parentId: ${parentId}`}
      <TagForm
        formData={{ parentId: parentId || "" }}
        onSubmit={handleSaveTag}
        onCancel={handleCancel}
      />
    </>
  );
};

const EditTag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const { id } = useParams();
  const location = useLocation();
  const { data } = location.state || {};
  const handleCancel = () => {
    navigate(-1);
  };

  const handleEditTag = (data: any) => {
    // alert(JSON.stringify(data, null, 2));
    dispatch(updateTag({ ...data } as any));
    navigate(-1);
  };
  return (
    <>
      {/* <pre>data: {JSON.stringify(data, null, 2)}</pre>
        <pre>location: {JSON.stringify(location, null, 2)}</pre> */}
      Edit Tag
      {data && (
        <TagForm
          formData={data}
          onSubmit={handleEditTag}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

// const MoveToAnotherTagParent=()=>{
//     return(
//         <>Move to another tag parent</>
//     )
// }

const AddSubTagComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const treeStructuredTasks = useSelector((state) => state.tags.data);
  const { id } = useParams();

  // ✅ Optimized: Use useMemo instead of factory selector
  const allTags = useSelector(selectAllFlatTags);
  const tag = useMemo(
    () => allTags.find((t) => t.uniqueId === id) || null,
    [allTags, id]
  );

  const tagOptions = useSelector(selectTagsForComboOptions);

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
        } as any)
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
      search: new URLSearchParams({
        parent: id || "",
      }).toString(),
    });
  };

  return (
    <>
      {/* {`Either create and add as subtag of ${id}`} <br />
            {`my selected tag : ${JSON.stringify(tag)}`} <br /> */}
      {/* {`my transformed formData : ${JSON.stringify(formData)}`} */}
      <div className="mt-6 flex flex-wrap gap-3">
        <CustomButton onClick={handleCreateNewSubtag}>
          Create new Sub-Tag
        </CustomButton>
      </div>

      {/* {`Or select existing subtags from list.`} */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="tags" className="mb-2 block text-sm font-medium text-gray-700">
          Add Existing Tags
        </label>
        <Select
          classNamePrefix="react-select"
          isMulti
          name="tags"
          options={tagOptions as any}
          value={tagOptions.filter(
            (t) =>
              formData.children.includes(t.value) &&
              t.value !== formData.uniqueId
          )}
          onChange={handleTaskSelect}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </>
  );
};

const MoveToAnotherTagParent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const treeStructuredTasks = useSelector((state) => state.tags.data);
  const { id } = useParams();

  // ✅ Optimized: Use useMemo instead of factory selector
  const tags = useSelector(selectAllFlatTags);
  const tag = useMemo(
    () => tags.find((t) => t.uniqueId === id) || null,
    [tags, id]
  );

  //   const tag = tags?.find((t) => t.uniqueId === id);

  const tagOptions = (tags as any[])
    .filter((t) => t.uniqueId !== (tag as any)?.uniqueId)
    .filter((t) => !((t.ancestors || []) as any[]).map((a: any) => a.uniqueId).includes((tag as any)?.uniqueId))
    .map((t) => ({
      value: t.uniqueId, // Assuming tag have unique IDs
      label: t.title, // Display tag title in the dropdown
    }));
  // .push({
  //     value: '', // Assuming tag have unique IDs
  //     label: 'ROOT', // Display tag title in the dropdown
  // });

  const handleTaskSelect = (selectedTags: any) => {
    // Extract the tag values and store them in the 'tags' property of the tag data
    // console.log(
    //     `JSON.stringify(selectedTags): ${JSON.stringify(selectedTags)}`
    // );
    setFormData({ ...formData, parentId: (selectedTags as any).value });
  };

  const [formData, setFormData] = useState({
    // _id: tag && tag._id ? tag._id : "",
    uniqueId: (tag as any) && (tag as any).uniqueId ? (tag as any).uniqueId : "",
    // title: tag && tag.title ? tag.title : "",
    // description: tag && tag.description ? tag.description : "",
    parentId: (tag as any) && (tag as any).parentId ? (tag as any).parentId : "",
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
        } as any)
      );
      // console.log("updated!!!");
    } else {
      // console.log("Not updated!!!");
    }
    navigate(-1);
  };

  const [selectedOption] = useState("");

  return (
    <>
      {/* {`Either create and add as subtag of ${id}`} <br />
            {`my selected tag : ${JSON.stringify(tag)}`} <br /> */}
      {/* {`my transformed formData : ${JSON.stringify(formData)}`} */}
      {/* <div>
                <CustomButton onClick={handleCreateNewSubtag}>Create new Sub-Tag</CustomButton>
            </div> */}

      {/* {`Or select existing subtags from list.`} */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-900">{tag?.title}</p>
        <label htmlFor="tags" className="mt-4 mb-2 block text-sm font-medium text-gray-700">
          Select New Parent
        </label>
        <Select
          classNamePrefix="react-select"
          name="tags"
          options={tagOptions as any}
          defaultValue={selectedOption}
          // value={tagOptions.filter((t) => t.value === formData.uniqueId)}
          onChange={handleTaskSelect}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>
    </>
  );
};


const SearchTagRouterPage = () => {
  return <>Search Tag</>;
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
