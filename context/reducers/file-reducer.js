import { CASE_NAME } from "@/constants/constants";


export function FileReducer(state, action) {
  switch (action.type) {
    case CASE_NAME.SET_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case CASE_NAME.UPEND_FILE:
      return {
        ...state,
        file: state.file.concat(action.payload)
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

    default:
      return state;
  }
}