// import React from 'react'

// const MoveToAnotherCategoryParent = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();

//     const { flatCategoryItemData: flatData, refreshCategoryTree } =
//         useInterviewMgmt();

//     const topic = flatData?.find((t) => t.uniqueId === id) || null;

//     const topicOptions = flatData
//         ?.filter((t) => t.uniqueId !== topic.uniqueId) // Exclude the current topic
//         .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId)) // Exclude ancestors of the topic
//         .filter((t) => !topic.children?.map((c) => c.uniqueId).includes(t.uniqueId)) // Exclude child categories of the topic
//         .map((t) => ({
//             value: t.uniqueId, // Assuming topic have unique IDs
//             label: t.title, // Display tag title in the dropdown
//         }));

//     const handleTaskSelect = (selectedTags) => {
//         setFormData({ ...formData, parentId: selectedTags.value });
//     };

//     const [formData, setFormData] = useState({
//         uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
//         parentId: topic && topic.parentId ? topic.parentId : "",
//     });

//     const handleSaveTask = () => {
//         if (topic && topic.uniqueId) {
//             dispatch(
//                 updateCategory({
//                     ...{ parentId: formData.parentId },
//                     uniqueId: topic.uniqueId,
//                 })
//             ).then(() => refreshCategoryTree());
//         }
//         navigate(-1);
//     };

//     const topicFormStyle = {};

//     const [selectedOption] = useState("");

//     return (
//         <>
//             <div style={topicFormStyle}>
//                 <p>{topic?.title}</p>
//                 <div>
//                     <label htmlFor="tags">Add Existing Topics:</label>
//                     <Select
//                         name="topics"
//                         options={topicOptions}
//                         defaultValue={selectedOption}
//                         onChange={handleTaskSelect}
//                     />
//                 </div>
//             </div>

//             {/* <JSONDataViewer metadata={{topic,flatData}} title="Raw Data"/> */}

//             <div>
//                 <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
//                 <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
//             </div>
//         </>
//     );
// };

// export default MoveToAnotherCategoryParentRouterPage