import React, { useEffect, useState } from "react";
import CustomButton from "../../common/components/CustomButton";
import useDataFetching from "../../common/hooks/useDataFetching"; // Assuming you saved the hook in a separate file
import {
  Outlet,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./interview.css";
import HtmlTextRendrer from "../../common/components/HtmlTextRenderer";
import TreeBase from "../../common/components/TreeBase";
import HoverableSpan from "../../common/components/HoverableSpan";
import RatingComponent from "../../common/components/RatingComponent";

const InterviewMgmtBase = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currPageNo = searchParams.get("pageNo");

  const [pageNo, /*setPageNo*/] = useState(parseInt(currPageNo) || 0);
  const pageSize = 3; // Assuming page size is fixed
  const url = `http://127.0.0.1:3003/categories?pageSize=${pageSize}&pageNo=${pageNo}`;
  const { data, /*loading, error, refetch*/ } = useDataFetching(url);

  const [catTreeList, setCatTreeList] = useState([]);
  const [qIdMap, setQIdMap] = useState([]);

  useEffect(() => {
    const createCatTreeList = (catData = []) => {
      if (!catData || !catData.length > 0) {
        return [];
      }
      return catData.map((c) => {
        return {
          id: c.uniqueId,
          name: "Cat_" + c.uniqueId,
          type: "category",
          children: c.questions
            ? c.questions.map((q) => {
              return {
                id: q.uniqueId,
                name: "Ques_" + q.uniqueId,
                type: "question",
              };
            })
            : [],
        };
      });
    };

    const createQIdMap = (catData = []) => {
      if (!catData || !catData.length) {
        return [];
      }

      // Initialize an empty array to store the resulting map
      const qIdMap = [];

      // Iterate over each category
      catData.forEach((category) => {
        // Check if the category has questions
        if (category.questions && category.questions.length > 0) {
          // Iterate over each question in the category
          category.questions.forEach((question) => {
            // Create a new object containing category uniqueId and question uniqueId
            const qIdObj = {
              categoryUniqueId: category.uniqueId,
              questionUniqueId: question.uniqueId,
            };

            // Add the new object to the resulting map array
            qIdMap.push(qIdObj);
          });
        }
      });

      return qIdMap;
    };
    setCatTreeList((prev) => createCatTreeList(data));
    setQIdMap((prev) => createQIdMap(data));
  }, [data]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleNodeSelection = (node) => {
    if (node && node.id) {
      switch (node.type) {
        case "category":
          navigate(`${node.id}`);
          return;
        case "question":
          navigate(
            `/interview-mgmt/${qIdMap.find((q) => q.questionUniqueId === node.id)
              ?.categoryUniqueId || ""
            }/questions/${node.id}`
          );
          return;
          default: return;
      }
    }
  };

  const customStyle = {
    // width: "90%",
    height: "300px",
    border: "1px solid black",
    overflowY: "auto",
  };
  return (
    <div className="linksContainer">
      <div className="left-section">
        <CustomButton onClick={() => handleButtonClick("create")}>
          CreateLink
        </CustomButton>
        {/* <CategoryList /> */}
        <TreeBase
          treeList={catTreeList}
          customStyle={customStyle}
          onNodeSelection={handleNodeSelection}
        />
        {/* <TreeBase treeList={treeList} /> */}
      </div>
      <div className="right-section">
        <div>
          <Outlet />
        </div>
        {/* <pre>{JSON.stringify(catTreeList, null, 4)}</pre> */}
        {/* <pre>{JSON.stringify(qIdMap, null, 2)}</pre> */}
      </div>
    </div>
  );
};

// const CategoryList = () => {
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();
//   const currPageNo = searchParams.get("pageNo");

//   const [pageNo, setPageNo] = useState(parseInt(currPageNo) || 0);
//   const pageSize = 3; // Assuming page size is fixed
//   const url = `http://127.0.0.1:3003/categories?pageSize=${pageSize}&pageNo=${pageNo}`;
//   const { data, loading, error, refetch } = useDataFetching(url);

//   const nextPage = () => {
//     setPageNo(pageNo + 1);
//     navigate({
//       pathname: "/interview-mgmt",
//       search: createSearchParams({
//         pageNo: pageNo,
//       }).toString(),
//     });
//     console.log(url);
//     refetch();
//   };

//   const handleLinkSelection = (selectedItem) => {
//     // setSelectedLink(selectedItem);
//     navigate(`${selectedItem.uniqueId}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       {/* <h2>Category List</h2> */}

//       <ul>
//         {data.map((category) => (
//           <li key={category._id}>
//             <strong>{category.uniqueId}</strong>
//             <span onClick={() => handleLinkSelection(category)}>
//               {category.title || "Title not set"}
//             </span>
//           </li>
//         ))}
//       </ul>
//       <CustomButton onClick={nextPage}>Next</CustomButton>
//       <CustomButton onClick={refetch}>Refetch</CustomButton>
//     </div>
//   );
// };

const ViewCategoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://127.0.0.1:3003/categories/${id}`;
  const { data, loading, error, refetch } = useDataFetching(url);
  const addNewLink = (id) => {
    navigate({
      pathname: "/interview-mgmt/create",
      search: id
        ? createSearchParams({
          parent: id,
        }).toString()
        : "",
    });
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div>
        {/* <div><code>{JSON.stringify(linkDetails)}</code></div> */}
        <CustomButton onClick={() => navigate(`/interview-mgmt/${id}/edit`)}>
          EditLink
        </CustomButton>
        <CustomButton onClick={() => addNewLink(id)}> Add Child </CustomButton>
        {/* <CustomButton onClick={() => addNewLink(linkDetails ? linkDetails.parentId : '')}> Add Sibling </CustomButton> */}
      </div>
      {/* Category details for : {id} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <CategoryCard category={data} />
    </>
  );
};

const CreateCategory = () => {
  //const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");
  return <>Create Category : parentId : {parentId}</>;
};

const EditCategory = () => {
  //const navigate = useNavigate();
  const { id } = useParams();
  return <>Edit Category for : {id}</>;
};

const CategoryCard = ({ category }) => {
  // const [selected, setSelected] = useState(false);
  // const toggleStar = () => {
  //   setSelected(!selected);
  // };
  return (
    <>
      <div>
        <div>
          {/* {category} */}
          <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {category.rating}               
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {category.uniqueId}
            </span>
          </div>
          <h2>
            <b>Category: </b><HtmlTextRendrer htmlString={category.categoryName} />
            {/* <div onClick={toggleStar} style={{ cursor: 'pointer' }}>
              {selected ? <StarIcon style={{ color: 'gold' }} /> : <StarOutlineIcon />}
            </div> */}
          </h2>
          <RatingComponent rating={category.rating}/>
        </div>
        <div>
          {/* <strong>Questions</strong> */}
          <div>
            <strong>{category?.questions?.length || 0} Questions</strong>
            <HoverableSpan
              style={{ padding: "0px 5px" }}
              onClick={() =>
                alert("Add question functionality will be added soon")
              }
            >
              Add New Question
            </HoverableSpan>
          </div>
          <div style={{}}>
            {/* <b>Count: </b> */}
            {category?.questions.length > 0 &&

              category.questions.map((q, index) => (
                <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }} key={q.uniqueId}>
                  <HtmlTextRendrer htmlString={q.title || q.ques} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

const ViewQuestionDetails = () => {
  const { id, qid } = useParams();
  const url = `http://127.0.0.1:3003/categories/${id}/questions/${qid}`;
  const { data, /*loading, error,*/ refetch } = useDataFetching(url);
  useEffect(() => {
    if (id && qid) {
      refetch();
    }
  }, [id, qid]);
  return (
    <>
      {/* Question details: {`Category ID: ${id}, Question ID: ${qid}`} */}
      {data && <QuestionCard question={data} categoryId={id} />}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

const QuestionCard = ({ question, categoryId }) => {
  return (
    <>
      <div>
        <div>
          {/* {category} */}
          <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {question.rating}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {question.uniqueId}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Category Id:</strong> {categoryId}
            </span>
          </div>
          <h2>
            <b>Question: </b><HtmlTextRendrer htmlString={question.ques} />
          </h2>
          <RatingComponent rating={question.rating}/>
        </div>
        <div>
          <div>
            <strong>{question.answers.length || 0} Answers</strong>
            <HoverableSpan
              style={{ padding: "0px 5px" }}
              onClick={() =>
                alert("Add Answer functionality will be added soon")
              }
            >
              Add New Answer
            </HoverableSpan>
          </div>
          <div>
            {/* <b>Count: </b> */}
            {question.answers &&
              question.answers.length > 0 &&
              question.answers.map((a) => (
                <AnswerCard key={a.uniqueId} answer={a} />
              ))}
          </div>
        </div>
      </div>

    </>
  );
};

const AnswerCard = ({ answer: ansObj, style = {} }) => {
  return (
    <>
      {/* <pre>{JSON.stringify(ansObj,null, 2)}</pre> */}
      <div style={{ border: "1px solid black", padding: "10px", margin: "5px", ...style }}>
        <div>
          {/* {category} */}
          <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {ansObj.rating}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {ansObj.uniqueId}
            </span>
            <span style={{ marginRight: "10px" }}>
            <RatingComponent rating={ansObj.rating}/>
            </span>
          </div>
          <span>
            <HtmlTextRendrer htmlString={ansObj.answer} />
          </span>
        </div>
        {/* <div>
          <strong>Questions</strong>
          <span>
            <b>Count: </b>
            {question.answers && question.answers.length>0 &&
            question.answers.map(a=>(<AnswerCard answer={a}/>))}
          </span>
        </div> */}
      </div>
    </>
  );
};

const styles = {
  activityStyle: {
    //backgroundColor: "blue", // Grey background color
    //border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    marginRight: "10px",
    marginLeft: "10px",
  },
  tagStyle: {
    backgroundColor: "#ccc", // Grey background color
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    marginRight: "10px",
  },
  datesStyle: {
    // padding: "10px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    // margin: "10px",
  },
};

export default InterviewMgmtBase;
export {
  ViewCategoryDetails,
  CreateCategory,
  EditCategory,
  ViewQuestionDetails,
};
