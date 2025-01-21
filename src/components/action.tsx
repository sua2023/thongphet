import React from "react";
import { EditButtonIcon } from "./editButtionIcon";
import ToolTip from "./tooltip";
import { ViewButtonIcon } from "./viewButtionIcon";
import { DeleteButtonIcon } from "./deleteButtonIcon";

interface TypeProps {
  onEvents?: (action: string) => void;
  isEdit?: boolean;
  isView?: boolean;
  isDelete?: boolean;
}
export const Action = (props: TypeProps) => {
  const { onEvents, isEdit = true, isView = true, isDelete = true } = props;

  return (
    <React.Fragment>
      <div className="flex">
        {isEdit && (
          <span className="relative group">
            <EditButtonIcon onClick={() => onEvents && onEvents("edit")} />
            <ToolTip title="Edit" />
          </span>
        )}
        {isView && (
          <span className="relative group">
            <ViewButtonIcon onClick={() => onEvents && onEvents("view")} />
            <ToolTip title="View" />
          </span>
        )}
        {isDelete && (
          <span className="relative group">
            <DeleteButtonIcon onClick={() => onEvents && onEvents("delete")} />
            <ToolTip title="Delete" />
          </span>
        )}
      </div>
    </React.Fragment>
  );
};
