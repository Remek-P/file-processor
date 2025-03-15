import { CASE_NAME } from "@/constants/constants";


export function WarningsReducer(state, action) {
  switch (action.type) {
    case CASE_NAME.ADD_WARNING:
      return {
        ...state,
        warnings: Array.from(new Set([ ...state.warnings, action.payload ]))
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