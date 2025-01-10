export const CASE_NAME = {
  SET_LOADING: "SET_LOADING",
  SET_FILE: "SET_FILE",
  SET_FILE_NAME: "SET_FILE_NAME",
  ADD_WARNING: "ADD_WARNING",
  DELETE_WARNING: "DELETE_WARNING",
  SET_FETCHED: "SET_FETCHED",
}


export function Reducer(state, action) {
  switch (action.type) {
    case CASE_NAME.SET_FILE:
      return {
        ...state,
        file: action.payload };
    case CASE_NAME.SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload };
    case CASE_NAME.ADD_WARNING:
      return {
        ...state,
        warnings: [...state.warnings, action.payload] };
    case CASE_NAME.DELETE_WARNING:
      return {
        ...state,
        warnings: state.warnings.filter((_, index) => index !== action.payload),
      };
    case CASE_NAME.SET_FETCHED:
      return {
        ...state,
        isFetched: action.payload };
    default:
      return state;
  }
}