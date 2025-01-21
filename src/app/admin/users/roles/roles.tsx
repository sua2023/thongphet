"use client";
import { RoleColumns } from "@/columns";
import { Action } from "@/components/action";
import CustomDropdown from "@/components/customDropdown";
import HeadTable from "@/components/headTable";
import { SearchIcon } from "@/components/icons/icons";
import DeleteModal from "@/components/modal/deleteModal";
import Pagination from "@/components/pagination";
import GeneralStatus from "@/components/status/generalStatus";
import { DoctorStatusEnum } from "@/enum/doctor.enum";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { IRoleObjType } from "@/interfaces";
import { useEdit } from "@/lib/useCreate";
import useFilter from "@/lib/useFiltter";
import { useFetchRoles } from "@/lib/users/useFetchRole";
import { useToast } from "@/lib/useToast";
import { closeOpen, setIsOpen } from "@/redux/features/dialogSlice";
import { RootState } from "@/redux/store";
import { PageLimits } from "@/utils/pageLimit";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Roles() {
  const router = useRouter();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total } = useFetchRoles(filter);
  const [roleData, setRoleData] = React.useState<IRoleObjType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { editForever } = useEdit();
  const { errorMessage, successPromiseMessage } = useToast();
  const dispatch = useDispatch();
  const { isOpen, dataEvents, status } = useSelector(
    (state: RootState) => state.dialog
  );

  React.useEffect(() => {
    if (data) {
      setRoleData(data);
    }
  }, [data]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    setSearchTerm(newValue);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (newValue) {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: newValue });
      } else {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: "" });
      }
    }, 500);
  };

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };

  const handleEvent = (action: string, data: IRoleObjType) => {
    switch (action) {
      case "edit":
        router.push(`/admin/users/roles/${data?.id}`);
        break;
      case "delete":
        dispatch(
          setIsOpen({
            isOpen: true,
            status: "delete_role",
            dataEvents: data,
          })
        );
        break;
      default:
        return;
    }
  };

  const handleClose = () => {
    dispatch(closeOpen());
  };
  const handleDelete = async () => {
    try {
      const newValues = { status: DoctorStatusEnum.INACTIVE };
      const edited = await editForever(`roles/${dataEvents?.id}`, newValues);

      if (edited?.status === 200) {
        successPromiseMessage("Delete role success", 2000);
        setRoleData((prev) =>
          prev.map((role) =>
            role.id === dataEvents?.id
              ? { ...role, status: edited?.data?.status }
              : role
          )
        );
      } else {
        errorMessage("Delete role failed", 2000);
      }
      handleClose();
    } catch (error) {
      errorMessage("Someting went wrong", 2000);
    }
  };
  return (
    <>
      <div>
        <p className="text-base text-gray700">All role</p>
        <div className="flex justify-between py-3 gap-1">
          <CustomDropdown onChange={handleOffsetChange} options={PageLimits} />
          <div className="flex gap-1 lg:gap-4">
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={18} />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border-[1.5px] border-gray300 bg-transparent ps-10 p-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  placeholder="Search.."
                  required
                />
              </div>
            </div>
            <button
              className="py-1.5 px-3 bg-primary rounded-lg text-white text-sm"
              onClick={() => router.push("/admin/users/roles/create")}
            >
              Add new
            </button>
          </div>
        </div>
        <div className="relative overflow-y-auto overflow-x-auto max-h-[calc(100vh-210px)]">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <HeadTable columns={RoleColumns} />
            <tbody>
              {roleData &&
                roleData?.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray bg-white hover:bg-gray100"
                  >
                    <td className="pl-2 py-4">
                      {calculateIndexPaginate({ filter, index })}
                    </td>
                    <td>{row.name}</td>
                    <td>
                      <GeneralStatus status={row.status} />
                    </td>
                    <td>
                      <Action
                        isView={false}
                        onEvents={(action) => handleEvent(action, row)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="sticky bg-white -bottom-1 flex items-center justify-between text-sm p-2">
          <p>
            Showing {filter.page} to {total} of {filter.offset} entries
          </p>
          {total > filter.offset && (
            <Pagination
              filter={filter}
              totalPage={total}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {status == "delete_role" && (
          <DeleteModal
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleDelete}
          />
        )}
      </div>
    </>
  );
}
