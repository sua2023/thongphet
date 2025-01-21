import React from "react";

const initialValues = {
  pageSize: 10,
  page: 1,
  search: "",
  status: "",
  date: { startDate: "", endDate: "" },
  startDate: "",
  endDate: "",
};

const ACTION_TYPE = {
  PAGE_ROW: "page",
  PAGINATION: "pagination",
  SEARCH: "search",
  STATUS: "status",
  DATE: "date",
  START_DATE: "startDate",
  END_DATE: "endDate",
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPE.PAGE_ROW:
      return {
        ...state,
        pageSize: action.payload || null,
        page: 1,
      };
    case ACTION_TYPE.PAGINATION:
      return {
        ...state,
        page: action.payload || null,
      };
    case ACTION_TYPE.SEARCH:
      return { ...state, search: action.payload ?? "null" };
    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload ?? "", page: 1 };
    case ACTION_TYPE.DATE:
      return {
        ...state,
        date: {
          startDate: action.payload.startDate ?? "",
          endDate: action.payload.endDate ?? "",
        },
      };
    case ACTION_TYPE.START_DATE:
      return {
        ...state,
        startDate: action.payload ?? "",
        page: 1,
      };
    case ACTION_TYPE.END_DATE:
      return {
        ...state,
        endDate: action.payload ?? "",
        page: 1,
      };
    default:
      return;
  }
};
const usePagination = () => {
  const [state, dispatch] = React.useReducer(reducer, initialValues);
  const data = React.useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

  return {
    state,
    data,
    dispatch,
    ACTION_TYPE,
  };
};
export default usePagination;
