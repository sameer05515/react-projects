// import React from 'react'


// const EditCategory = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const url = `http://localhost:3003/intvw-mgmt/v2/categories/${id}`;
//     const { data } = useDataFetching({url});
//     return (
//         <>
//             Edit Category for : {id} <br />
//             {data && (
//                 <CategoryForm
//                     category={data}
//                     onSave={() => {
//                         navigate(-1);
//                     }}
//                     onCancelEdit={() => navigate(-1)}
//                 />
//             )}
//         </>
//     );
// };

// export default EditCategoryRouterPage