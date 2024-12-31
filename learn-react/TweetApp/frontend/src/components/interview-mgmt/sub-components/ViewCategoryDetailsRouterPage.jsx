// import React from 'react'

// const ViewCategoryDetails = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const url = `http://localhost:3003/intvw-mgmt/v2/categories/${id}`;
//     const { data, loading, error, refetch } = useDataFetching({url});
//     const addNewLink = (id) => {
//         navigate({
//             pathname: "/interview-mgmt/create",
//             search: id
//                 ? createSearchParams({
//                     parent: id,
//                 }).toString()
//                 : "",
//         });
//     };

//     useEffect(() => {
//         if (id) {
//             refetch();
//             dispatch(setSelectedTreeNodeUID(id));
//             dispatch(setSelectedCategoryUID(id));
//             dispatch(setSelectedQuestionUID(null));
//         }
//     }, [id]);

//     const handleLinkSelection = (selectedItem) => {
//         if (selectedItem) {
//             navigate(`/interview-mgmt/${id}/questions/${selectedItem.uniqueId}`);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }
//     return (
//         <>
//             <ButtonGroup
//                 options={[
//                     {
//                         id: 1,
//                         onClick: () => navigate(`/interview-mgmt/${id}/edit`),
//                         children: "Edit Category",
//                     },
//                     {
//                         id: 2,
//                         onClick: () => addNewLink(id),
//                         children: "Add Sub Category",
//                     },
//                     {
//                         id: 3,
//                         children: "Move to Another Parent Category",
//                         onClick: () => navigate(`/interview-mgmt/${id}/move-parent`),
//                     },
//                 ]}
//             />

//             {data && (
//                 <CategoryCard
//                     category={data}
//                     onQuestionSelection={handleLinkSelection}
//                     onCreateQuestionClick={() =>
//                         navigate(`/interview-mgmt/${id}/questions/create`)
//                     }
//                 />
//             )}
//         </>
//     );
// };

// export default ViewCategoryDetailsRouterPage