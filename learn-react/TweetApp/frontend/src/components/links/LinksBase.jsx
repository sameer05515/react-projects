import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomButton from "../../common/components/custom-button/CustomButton";
import { createLink, fetchLinksByUniqueId, updateLink } from "../../redux/slices/linksSlice";
import "./Links.css";
import ToggleablePanel from "../../common/components/toggleable-panel/ToggleablePanel";
import { SmartEditor, SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../common/components/json-data-viewer/JSONDataViewer";
import { apiRequest } from "../../common/service/apiClient/v1";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

const ViewLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const linkDetails = useSelector((state) => state.links.linkDetails);
  const loading = useSelector((state) => state.links.loading);
  const error = useSelector((state) => state.links.error);

  const handleLinkSelection = (selectedItem) => {
    navigate(`/links-mgmt/${selectedItem.uniqueId}`);
  };

  useEffect(() => {
    dispatch(fetchLinksByUniqueId(id));
  }, [dispatch, id]);

  if (loading === "pending") {
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
            <div style={styles.descriptionStyle}>
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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  const [formData, setFormData] = useState({
    name: "",
    parentId: parentId,
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

  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSmartEditorChange = (smartContent) => {
    setFormData((prev) => ({ ...prev, descriptions: [smartContent] }));
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const validateForm = () => {
    const errors = [];

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

  const handleSaveTag = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If creating a new tag, dispatch the createTag action
      dispatch(createLink(formData));
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
          <div>
            {formErrors.map((error, index) => (
              <span key={index} style={styles.error}>
                {error}
              </span>
            ))}
          </div>
        )}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="linkUrl">Link Url:</label>
          <input
            type="text"
            id="linkUrl"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          {/* <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} /> */}
          <SmartEditor
            preview={false}
            initialValue={formData.descriptions[0]}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
        <CustomButton onClick={(e) => handleSaveTag(e)}>Save Changes</CustomButton>
        <JSONDataViewer metadata={{ formData }} title="X-Ray" />
      </div>
    </>
  );
};

const EditLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const links = useSelector((state) => state.links.flatData);
  // const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
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

  const [smartEditorError, setSmartEditorError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = [];

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

  const handleSmartEditorChange = (smartContent) => {
    setFormData((prev) => ({ ...prev, descriptions: [smartContent] }));
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  const handleSaveTag = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If creating a new tag, dispatch the createTag action
      dispatch(updateLink(formData));
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
          <div>
            {formErrors.map((error, index) => (
              <span key={index} style={styles.error}>
                {error}
              </span>
            ))}
          </div>
        )}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="linkUrl">Link Url:</label>
          <input
            type="text"
            id="linkUrl"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          {/* <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} /> */}
          <SmartEditor
            preview={false}
            initialValue={formData.descriptions[0]}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>
        <CustomButton onClick={(e) => handleSaveTag(e)}>Save Changes</CustomButton>
        <JSONDataViewer metadata={{ formData }} title="X-Ray" />
      </div>
    </>
  );
};

const LinksBase = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = useSelector((state) => state.links.data);
  const status = useSelector((state) => state.links.status);
  const error = useSelector((state) => state.links.error);

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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="linksContainer">
      <div className="left-section">
        {/* <pre>{links && JSON.stringify(links)}</pre> */}
        <CustomButton onClick={() => handleButtonClick("create")}>Create Link</CustomButton>
        {getLinksJSX(links)}
      </div>
      {/* -- left-section */}

      <div className="right-section">
        <div>
          <Outlet />
        </div>
      </div>
      {/* -- right-section */}
    </div>
    // -- linksContainer
  );
};

const Breadcrumbs = ({ parentId = "", ancestors: providedAncestors = [] }) => {
  const [ancestors, setAncestors] = useState([]);

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
      <div style={breadcrumbStyle.breadcrumbsContainer}>
        <span style={breadcrumbStyle.breadcrumbItem}>
          <h1>Home</h1>
        </span>
        {ancestors.map((ancestor, index) => (
          <span style={breadcrumbStyle.breadcrumbItem} key={index}>
            <h2>/{ancestor.name}</h2>
          </span>
        ))}
      </div>
    </div>
  );
};

const breadcrumbStyle = {
  breadcrumbsContainer: {
    marginBottom: "20px",
  },
  breadcrumbList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  breadcrumbItem: {
    display: "inline-block",
    marginRight: "5px",
  },
  breadcrumbLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  breadcrumbLinkHover: {
    textDecoration: "underline",
  },
};

const styles = {
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
};

export default LinksBase;
export { CreateLink, EditLink, ViewLink };
