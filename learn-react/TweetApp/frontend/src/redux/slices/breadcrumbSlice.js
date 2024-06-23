import { createSelector, createSlice } from "@reduxjs/toolkit";


const breadcrumbSlice = createSlice({
    name: "breadcrumbItems",
    initialState: {
        selectedModuleName: null,
    },

    reducers: {
        setSelectedModuleName: (state, action) => {
            console.log(`action.payload : ${action.payload}`)
            state.selectedModuleName = action.payload;
        }
    }
});


export default breadcrumbSlice.reducer;
export const { setSelectedModuleName } = breadcrumbSlice.actions;

/* ============== Selectors ======================*/
const selectBreadcrumbState = (state) => state.breadcrumbItems;

export const selectSelectedModuleName = createSelector(
    selectBreadcrumbState,
    (breadcrumbState) => breadcrumbState.selectedModuleName
);

