"use client";
import { staffColumns } from "@/columns";
import CustomSelect from "@/components/customDropdown";
import { DeleteButtonIcon } from "@/components/deleteButtonIcon";
import { EditButtonIcon } from "@/components/editButtionIcon";
import HeadTable from "@/components/headTable";
import { SearchIcon, UnlockIcon } from "@/components/icons/icons";
import DeleteModal from "@/components/modal/deleteModal";
import FormModal from "@/components/modal/formModal";
import Pagination from "@/components/pagination";
import ForgotPassword from "@/components/staff/forgotPassword";
import { userStatus } from "@/enum/user.enum";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { DateFormat } from "@/helps/dateFormat";
import useApi from "@/lib/useApi";
import useFilter from "@/lib/useFiltter";
import useDeleteUser from "@/lib/users/useDeleteUser";
import { useFetchUsers } from "@/lib/users/useFetchUser";
import { useToast } from "@/lib/useToast";
import { clearData, setData } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { PageLimits } from "@/utils/pageLimit";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AllStaff() {
  const router = useRouter();
  const api = useApi();
  const useDelete = useDeleteUser();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user.data);
  const { data, total, loading, error, refresh } = useFetchUsers(filter);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] =
    React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { successPromiseMessage, errorMessage, errorPromiseMessage } =
    useToast();

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };

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

  const handleClose = () => {
    setIsOpen(!isOpen);
    dispatch(clearData());
  };
  const handlePasswordClose = () => {
    setIsChangePassword(!isChangePassword);
    dispatch(clearData());
  };
  const handleDelete = async () => {
    try {
      if (userData) {
        const url = `users/${userData.id}`;
        const result = await useDelete.handleDelete(url);
        if (result.status === 200) {
          successPromiseMessage("Delete user success", 2000);
          refresh();
        } else {
          errorPromiseMessage("Delete user failed", 2000);
        }
        handleClose();
      }
    } catch (error) {
      errorPromiseMessage("Someting went wrong", 2000);
    }
  };

  const handleChangePassword = async (
    values: string,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await api({
        url: `users/${userData?.id}/reset-password`,
        method: "PUT",
        params: values,
      });
      if (result.status === 200) {
        successPromiseMessage("Change user success", 1000);
        resetForm();
        handlePasswordClose();
      } else {
        errorMessage("Change user password failed", 1000);
      }
    } catch (error) {
      errorMessage("Change user password failed", 1000);
    }
  };

  return (
    <>
      <div>
        <p className="text-base text-gray700">All staff</p>
        <div className="flex justify-between py-3 gap-1">
          <CustomSelect onChange={handleOffsetChange} options={PageLimits} />
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
                  className="bg-white border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 focus:ring-gray300"
                  placeholder="Search.."
                  required
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <button
              className="py-1.5 px-3 bg-primary rounded-lg text-white text-sm"
              onClick={() => router.push("/admin/users/staff/create")}
            >
              Create
            </button>
          </div>
        </div>
        <div className="relative overflow-y-auto overflow-x-auto max-h-[calc(100vh-210px)]">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <HeadTable columns={staffColumns} />
            <tbody>
              {data.map((row, index: number) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray bg-white hover:bg-gray"
                  >
                    <td className="pl-2 py-4">
                      {calculateIndexPaginate({ filter, index })}
                    </td>

                    <td>{`${row.firstName} ${row.lastName}`}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>
                      {(() => {
                        switch (row.status) {
                          case userStatus.ACTIVE:
                            return (
                              <div className="bg-primary/20 text-primary flex items-center justify-center rounded-full w-20 p-1">
                                {row.status}
                              </div>
                            );
                          case userStatus.INACTIVE:
                            return (
                              <div className="bg-gray700/20 text-gray700 flex items-center justify-center rounded-full w-20 p-1">
                                {row.status}
                              </div>
                            );
                          case userStatus.DELETED:
                            return (
                              <div className="bg-red/20 text-red flex items-center justify-center rounded-full w-20 p-1">
                                {row.status}
                              </div>
                            );
                          case userStatus.LOCKED:
                            return (
                              <div className="bg-blur100 text-blur800 flex items-center justify-center rounded-full w-20 p-1">
                                {row.status}
                              </div>
                            );
                          case userStatus.BLOCKED:
                            return (
                              <div className="bg-pink100 text-pink800 flex items-center justify-center rounded-full w-20 p-1">
                                {row.status}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </td>
                    <td>{DateFormat(row.createdAt)}</td>
                    <td>
                      <div className="flex gap-0">
                        <DeleteButtonIcon
                          onClick={() => {
                            dispatch(setData(row));
                            setIsOpen(true);
                          }}
                        />

                        <EditButtonIcon
                          onClick={() => {
                            dispatch(setData(row));
                            router.push(`/admin/users/staff/edit/${row.id}`);
                          }}
                        />
                        <button
                          onClick={() => {
                            dispatch(setData(row));
                            setIsChangePassword(true);
                          }}
                          className="text-gray700 hover:border-gray700/50 hover:bg-gray700/50 hover:text-white focus:ring-2 focus:outline-none focus:ring-gray font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
                          type="button"
                        >
                          <UnlockIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

        <DeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleDelete}
        />
        <FormModal isOpen={isChangePassword} onClose={handlePasswordClose}>
          <ForgotPassword
            handleSubmit={handleChangePassword}
            onClose={handlePasswordClose}
          />
        </FormModal>
      </div>
    </>
  );
}
