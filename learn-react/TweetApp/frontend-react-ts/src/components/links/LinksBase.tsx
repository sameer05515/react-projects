import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomButton from "../../common/components/custom-button/CustomButton";
import useDataFetching from "../../common/hooks/useDataFetching/v2";
import { createLink, fetchLinks, fetchLinksByUniqueId, selectLinksStateCombined, updateLink } from "../../redux/slices/linksSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import ToggleablePanel from "../../common/components/toggleable-panel/ToggleablePanel";
import { SmartEditor, SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
import { apiRequest } from "../../common/service/apiClient/v1";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

const ViewLink = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  // Use combined selector to optimize multiple useSelector calls
  const { linkDetails, status, error } = useSelector((state: RootState) => selectLinksStateCombined(state)); // ✅ Standardized: loading -> status

  const handleLinkSelection = (selectedItem) => {
    navigate(`/links-mgmt/${selectedItem.uniqueId}`);
  };

  useEffect(() => {
    dispatch(fetchLinksByUniqueId(id as any) as any);
  }, [dispatch, id]);

  if (status === "loading") { // ✅ Standardized: pending -> loading
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const addNewLink = (id) => {
    navigate({
      pathname: "/links-mgmt/create",
      search: id
        ? createSearchParams({
            parent: id,
          }).toString()
        : "",
    });
  };

  return (
    <>
      <div>
        {/* <div><code>{JSON.stringify(linkDetails)}</code></div> */}
        <CustomButton onClick={() => navigate(`/links-mgmt/${id}/edit`)}>EditLink</CustomButton>
        <CustomButton onClick={() => addNewLink(id)}> Add Child </CustomButton>
        <CustomButton onClick={() => addNewLink(linkDetails ? linkDetails.parentId : "")}> Add Sibling </CustomButton>
      </div>
      {/* <div><b>View Link details for :</b> {id} </div> */}
      {linkDetails && (
        <>
          <div>
            <Breadcrumbs ancestors={linkDetails.ancestors} />
            {/* <span><b>unique id:</b> </span> {linkDetails.uniqueId} <br /> */}
            <span>
              <b>name:</b>{" "}
            </span>{" "}
            {linkDetails.name} <br />
            <span>
              <b>linkType:</b>{" "}
            </span>{" "}
            {linkDetails.linkType} <br />
            {/* <span><b>Parent id:</b> </span> {linkDetails.parentId} <br /> */}
            <span>
              <b>linkUrl:</b>{" "}
            </span>{" "}
            {linkDetails.linkUrl} <br />
            {/* <span>
              <b>description:</b>{" "}
            </span>{" "}
            {linkDetails.description} <br /> */}
            <div className="mt-4">
              <ToggleablePanel showContent={true} title={"Descriptions:"}>
                {linkDetails.descriptions?.map((descr, idx) => (
                  <ToggleablePanel
                    key={idx}
                    showContent={linkDetails.descriptions.length === 1}
                    title={`Description #${idx + 1}`}
                  >
                    <SmartPreviewer data={descr} />
                  </ToggleablePanel>
                ))}
              </ToggleablePanel>
            </div>
            {linkDetails.children && linkDetails.children.length > 0 ? (
              <div>
                <b>Children:</b>
                <ul>
                  {linkDetails.children?.map((child, index) => (
                    <li key={child.uniqueId}>
                      <span onClick={() => handleLinkSelection(child)}>
                        {/* ${child.uniqueId} : */}
                        {` ${child.name}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span>
                <h3>No childerens yet!</h3>
              </span>
            )}
          </div>
        </>
      )}
      <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      <JSONDataViewer metadata={{ linkDetails }} title="linkDetails" />
    </>
  );
};

// Reusable form component
// const LinkForm = ({
//   formData,
//   formErrors,
//   handleInputChange,
//   validateForm,
//   handleSubmit,
//   handleSmartEditorError,
//   handleSmartEditorChange,
// }) => {
//   return (
//     <div>
//       {formErrors.length > 0 && (
//         <div>
//           {formErrors.map((error, index) => (
//             <span key={index} style={styles.error}>
//               {error}
//             </span>
//           ))}
//         </div>
//       )}
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="linkUrl">Link Url:</label>
//         <input type="text" id="linkUrl" name="linkUrl" value={formData.linkUrl} onChange={handleInputChange} required />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         {/* <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} /> */}
//         <SmartEditor
//           preview={false}
//           initialValue={formData.descriptions[0]}
//           onChange={handleSmartEditorChange}
//           onError={handleSmartEditorError}
//         />
//       </div>
//       <CustomButton onClick={handleSubmit}>Save Changes</CustomButton>
//       <JSONDataViewer metadata={{ formData }} title="X-Ray" />
//     </div>
//   );
// };

const CreateLink = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const [formData, setFormData] = useState({
    name: "",
    parentId: parentId || "",
    linkType: "EXTERNAL-WEB",
    linkUrl: "",
    description: "",
    descriptions: [
      {
        content: "",
        textOutputType: "",
        textInputType: "",
      },
    ],
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent: any) => {
    setFormData((prev) => ({ ...prev, descriptions: [smartContent] }));
  };

  const handleSmartEditorError = (error: string | null) => {
    setSmartEditorError(error);
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    if (!formData.linkUrl.trim()) {
      errors.push("linkUrl is required");
    }
    if (!formData.linkType.trim()) {
      errors.push("linkType is required");
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveTag = () => {
    if (validateForm()) {
      // If creating a new tag, dispatch the createTag action
      dispatch(createLink(formData) as any);
      navigate(-1);
    }
  };

  return (
    <>
      {/* <LinkForm
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        validateForm={validateForm}
        handleSubmit={(e) => handleSaveTag(e)}
      /> */}
      <div>
        {formErrors.length > 0 && (
          <div className="mb-4">
            {formErrors.map((error, index) => (
              <span key={index} className="block text-red-600 text-sm mt-1.5">
                {error}
              </span>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkUrl" className="block font-semibold mb-2 text-gray-700">Link Url:</label>
          <input
            type="text"
            id="linkUrl"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Description:</label>
          <div className="border border-gray-300 p-1.5 m-1.5 rounded">
            <SmartEditor
              preview={false}
              initialValue={formData.descriptions[0]}
              onChange={handleSmartEditorChange}
              onError={handleSmartEditorError}
            />
          </div>
        </div>
        <CustomButton onClick={handleSaveTag}>Save Changes</CustomButton>
        <JSONDataViewer metadata={{ formData }} title="X-Ray" />
      </div>
    </>
  );
};

const EditLink = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  // const links = useSelector((state) => state.links.flatData);
  // const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    uniqueId?: string;
    name: string;
    parentId: string;
    linkType: string;
    linkUrl: string;
    description: string;
    descriptions: Array<{
      content: string;
      textOutputType: string;
      textInputType: string;
    }>;
  }>({
    name: "",
    parentId: "",
    linkType: "EXTERNAL-WEB",
    linkUrl: "",
    description: "",
    descriptions: [
      {
        content: "",
        textOutputType: "",
        textInputType: "",
      },
    ],
  });

  useEffect(() => {
    const fetchLink = async () => {
      try {
        // // Check if the link already exists in Redux store
        // const existingLink = links.find((link) => link.uniqueId === id);
        // // console.log("links : " + JSON.stringify(links));
        // if (existingLink) {
        //   // If link exists, set it directly in the state
        //   setLink(existingLink);
        //   setFormData((prev) => ({
        //     ...prev,
        //     ...existingLink,
        //   }));
        // } else {
        //   // If link doesn't exist, fetch it from the server
        //   dispatch(fetchLinksByUniqueId(id));
        //   // setLink(fetchedLink);
        // }
        setLoading(true);
        apiRequest({ method: "get", url: `${BACKEND_APPLICATION_BASE_URL}/links/${id}` })
          .then((response) => {
            // setLink(response.data);
            setFormData(response.data);
          })
          .catch((error) => {
            console.log(error);
            setFormErrors(["Some error occurred during fetch"]);
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error fetching link:", error);
      }
    };
    fetchLink();
    // console.log(`My link object for id : ${id} : ${JSON.stringify(link)}`);
  }, [dispatch, id]);

  const [smartEditorError, setSmartEditorError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }
    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    // setFormErrors(errors);
    if (!formData.linkUrl.trim()) {
      errors.push("linkUrl is required");
      // errors.name = 'linkUrl is required';
    }
    if (!formData.linkType.trim()) {
      errors.push("linkType is required");
      // errors.name = 'linkType is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSmartEditorChange = (smartContent: any) => {
    setFormData((prev) => ({ ...prev, descriptions: [smartContent] }));
  };

  const handleSmartEditorError = (error: string | null) => {
    setSmartEditorError(error);
  };

  const handleSaveTag = () => {
    if (validateForm()) {
      // If creating a new tag, dispatch the createTag action
      if (formData.uniqueId) {
        dispatch(updateLink({ ...formData, uniqueId: formData.uniqueId }) as any);
      }
      navigate(-1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <LinkForm
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleSmartEditorChange={handleSmartEditorChange}
        handleSmartEditorError={handleSmartEditorError}
        validateForm={validateForm}
        handleSubmit={(e) => handleSaveTag(e)}
      /> */}
      <div>
        {formErrors.length > 0 && (
          <div className="mb-4">
            {formErrors.map((error, index) => (
              <span key={index} className="block text-red-600 text-sm mt-1.5">
                {error}
              </span>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkUrl" className="block font-semibold mb-2 text-gray-700">Link Url:</label>
          <input
            type="text"
            id="linkUrl"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2 text-gray-700">Description:</label>
          <div className="border border-gray-300 p-1.5 m-1.5 rounded">
            <SmartEditor
              preview={false}
              initialValue={formData.descriptions[0]}
              onChange={handleSmartEditorChange}
              onError={handleSmartEditorError}
            />
          </div>
        </div>
        <CustomButton onClick={handleSaveTag}>Save Changes</CustomButton>
        <JSONDataViewer metadata={{ formData }} title="X-Ray" />
      </div>
    </>
  );
};

const LinksBase = () => {
  const navigate = useNavigate();

  // Fetch links data only when component mounts (with smart caching)
  useDataFetching(
    fetchLinks,
    (state) => state.links
  );

  // Use combined selector to optimize multiple useSelector calls
  const { links, status, error } = useSelector(selectLinksStateCombined); // ✅ Standardized: removed loading alias, use status directly

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleLinkSelection = (selectedItem) => {
    // setSelectedLink(selectedItem);
    navigate(`${selectedItem.uniqueId}`);
  };

  const getLinksJSX = (links) => {
    return (
      <>
        {links && links.length > 0 && (
          <ul>
            {links.map((link) => (
              <li key={link.uniqueId}>
                <span onClick={() => handleLinkSelection(link)}>{link.name}</span>
                {getLinksJSX(link.children)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  if (status === "loading") { // ✅ Standardized: pending -> loading
    return <div>Loading...</div>;
  }

  if (status === "failed" || error) { // ✅ Standardized: rejected -> failed
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-72 lg:flex-shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <CustomButton onClick={() => handleButtonClick("create")}>Create Link</CustomButton>
          </div>
          <div className="text-sm">
            {getLinksJSX(links)}
          </div>
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

interface Ancestor {
  name: string;
  uniqueId?: string;
  [key: string]: any;
}

interface BreadcrumbsProps {
  parentId?: string;
  ancestors?: Ancestor[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ parentId = "", ancestors: providedAncestors = [] }) => {
  const [ancestors, setAncestors] = useState<Ancestor[]>([]);

  useEffect(() => {
    setAncestors((prev) => [...providedAncestors]);
    // const fetchAncestors = async () => {
    //   try {
    //     const response = await axios.get(`/ancestors/${parentId}`);
    //     setAncestors(response.data);
    //   } catch (error) {
    //     console.error('Error fetching ancestors:', error);
    //   }
    // };

    // fetchAncestors();
  }, [providedAncestors]);

  return (
    <div>
      <div className="mb-5">
        <span className="inline-block mr-1.5">
          <h1 className="inline">Home</h1>
        </span>
        {ancestors.map((ancestor, index) => (
          <span className="inline-block mr-1.5" key={index}>
            <h2 className="inline">/{ancestor.name}</h2>
          </span>
        ))}
      </div>
    </div>
  );
};


export default LinksBase;
export { CreateLink, EditLink, ViewLink };
