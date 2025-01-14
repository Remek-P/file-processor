import {CASE_NAME} from "@/constants/constants";


export function Reducer(state, action) {
  switch (action.type) {
      // For File Data
    case CASE_NAME.SET_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case CASE_NAME.SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload,
      };
    case CASE_NAME.SET_FETCHED:
      return {
        ...state,
        isFetched: action.payload,
      };

      // For Warnings
    case CASE_NAME.ADD_WARNING:
      return {
        ...state,
        warnings: [...state.warnings, action.payload],
      };
    case CASE_NAME.DELETE_WARNING:
      return {
        ...state,
        warnings: state.warnings.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
}