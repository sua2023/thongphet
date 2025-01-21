"use client";
import { useReducer } from "react";
import { FilterState } from "@/interfaces/filter";

const initialValue: FilterState = {
  page: 1,
  offset: 10,
  sort_by: "createdAt",
  order_by: "DESC",
  start_date: "",
  end_date: "",
  filter: {
    search: "",
    status: "",
    isApproved: "",
  },
};

enum ACTION_TYPE {
  PAGE = "PAGE",
  OFFSET = "OFFSET",
  SORTBY = "SORTBY",
  ORDERBY = "ORDERBY",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
  SEARCH = "SEARCH",
  STATUS = "STATUS",
  ISAPPROVED = "ISAPPROVED",
}
type FilterAction =
  | { type: ACTION_TYPE.PAGE; payload: number }
  | { type: ACTION_TYPE.OFFSET; payload: number }
  | { type: ACTION_TYPE.SORTBY; payload: string }
  | { type: ACTION_TYPE.ORDERBY; payload: string }
  | { type: ACTION_TYPE.START_DATE; payload: string }
  | { type: ACTION_TYPE.END_DATE; payload: string }
  | { type: ACTION_TYPE.SEARCH; payload: string }
  | { type: ACTION_TYPE.STATUS; payload: string }
  | { type: ACTION_TYPE.ISAPPROVED; payload: string };

const reducer = (state: FilterState, action: FilterAction) => {
  
  switch (action.type) {
    case ACTION_TYPE.PAGE:
      return {
        ...state,
        page: action.payload || state.page,
      };
    case ACTION_TYPE.OFFSET:
      return {
        ...state,
        offset: action.payload || state.offset,
        page: 1,
      };
    case ACTION_TYPE.SORTBY:
      return {
        ...state,
        sort_by: action.payload || state.sort_by,
      };
    case ACTION_TYPE.ORDERBY:
      return {
        ...state,
        order_by: action.payload || state.order_by,
      };
    case ACTION_TYPE.START_DATE:
      return {
        ...state,
        start_date: action.payload || "",
      };
    case ACTION_TYPE.END_DATE:
      return {
        ...state,
        end_date: action.payload || "",
      };

    case ACTION_TYPE.SEARCH:
      return {
        ...state,
        filter: { search: action.payload, status: "", isApproved: "" },
      };
    case ACTION_TYPE.STATUS:
      return {
        ...state,
        filter: { search: "", isApproved: "", status: action.payload },
      };
    case ACTION_TYPE.ISAPPROVED:
      return {
        ...state,
        filter: {
          search: "",
          status: "",
          isApproved: action.payload,
        },
      };
    default:
      return state;
  }
};

const useFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return {
    state,
    dispatch: dispatch,
    ACTION_TYPE,
  };
};

export default useFilter;
