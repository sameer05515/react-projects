// import React from 'react'
// import { BACKEND_APPLICATION_BASE_URL } from '../../../common/constants/globalConstants';

// const EditCategory = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const url = `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/categories/${id}`;
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