// export const CASE_NAME = {
//   SET_LOADING: "SET_LOADING",
//   SET_FILE: "SET_FILE",
//   SET_FILE_NAME: "SET_FILE_NAME",
//   ADD_WARNING: "ADD_WARNING",
//   SET_FETCHED: "SET_FETCHED",
//   SAVE_FILE: "SAVE_FILE",
//   LOAD_SAVED_FILES: "LOAD_SAVED_FILES",
// }
//
//
// export function Reducer(state, action) {
//   switch (action.type) {
//     case CASE_NAME.SET_LOADING:
//       return { ...state, isLoading: action.payload };
//     case CASE_NAME.SET_FILE:
//       return { ...state, excelFile: action.payload };
//     case CASE_NAME.SET_FILE_NAME:
//       return { ...state, excelFileName: action.payload };
//     case CASE_NAME.ADD_WARNING:
//       return { ...state, warnings: [...state.warnings, action.payload] };
//     case CASE_NAME.SET_FETCHED:
//       return { ...state, isFetched: action.payload };
//     case CASE_NAME.SAVE_FILE:
//       const updatedFiles = [...state.savedFiles, action.payload];
//       localStorage.setItem('savedFiles', JSON.stringify(updatedFiles));
//       return { ...state, savedFiles: updatedFiles };
//     case CASE_NAME.LOAD_SAVED_FILES:
//       return { ...state, savedFiles: action.payload };
//     default:
//       return state;
//   }
// }