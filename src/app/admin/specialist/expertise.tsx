"use client";
import { CategoryColumns } from "@/columns";
import { DeleteButtonIcon } from "@/components/deleteButtonIcon";
import { EditButtonIcon } from "@/components/editButtionIcon";
import HeadTable from "@/components/headTable";
import { SearchIcon } from "@/components/icons/icons";
import DeleteModal from "@/components/modal/deleteModal";
import FormModal from "@/components/modal/formModal";
import Pagination from "@/components/pagination";
import ColumnStatus from "@/components/status/status";
import { useRefreshState } from "@/context/autoRefreshProvider";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { DateFormat } from "@/helps/dateFormat";
import { IExpertiseTypes } from "@/interfaces/expertiseType";
import { useFetchExpertise } from "@/lib/expertise/useFetchExpertise";
import useApi from "@/lib/useApi";
import { useCreate } from "@/lib/useCreate";
import { useDeleteForever } from "@/lib/useDeleteForever";
import useFilter from "@/lib/useFiltter";
import useDeleteUser from "@/lib/users/useDeleteUser";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import React, { useRef } from "react";
import * as Yup from "yup";
import EditExpertise from "./expertiseEdit";
import GeneralStatus from "@/components/status/generalStatus";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});
export default function Expertise() {
  const api = useApi();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { successPromiseMessage, errorMessage, errorPromiseMessage } =
    useToast();
  const { data, error, loading, total, refresh } = useFetchExpertise(filter);
  const deleted = useDeleteUser();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dataEvents, setDataEvents] = React.useState<IExpertiseTypes | null>(
    null
  );
  const { refreshAuto, setRefreshAuto } = useRefreshState();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { createForever } = useCreate();
  const { deletedForever } = useDeleteForever();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  React.useEffect(() => {
    if (refreshAuto?.isStatus == "edit_expertise") {
      refresh();
      handleEditClose();
    }
  }, [refreshAuto?.isAutoClose]);

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

  const handleDelete = async () => {
    try {
      const url = `specialists/${dataEvents?.id}`;
      const result = await deletedForever(url);
      if (result?.status === 200) {
        successPromiseMessage("Delete expertise success", 2000);
        refresh();
      } else {
        errorPromiseMessage("Delete expertise failed", 2000);
      }
      handleClose();
    } catch (error) {
      errorPromiseMessage("Someting went wrong", 2000);
    }
  };

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const created = await createForever("specialists", values);
      if (created?.status === 201) {
        successPromiseMessage("Create specialists success", 2000);
        resetForm();
        refresh();
      } else if (created?.status === 400) {
        errorMessage("Create specialists already created", 2000);
      } else {
        errorMessage("Create specialists failed", 2000);
      }
    } catch (error) {
      errorMessage("Create specialists failed", 2000);
    }
  };

  return (
    <>
      <div>
        <div className="py-2">
          <p className="text-base text-gray700">All specialist</p>
          <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="lg:col-span-1 col-span-3">
              <div className="border border-gray300 rounded-sm my-3 py-5 px-4">
                <p className="text-base text-gray700">Create specialist</p>
                <Formik
                  initialValues={{ name: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form className="mt-5" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="base-input"
                          className="block mb-2 text-sm font-medium text-gray700"
                        >
                          Name <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          placeholder="Name"
                          id="base-input"
                          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                        />
                      </div>
                      <div className="mt-5">
                        <button
                          type="submit"
                          className="py-2 px-3 bg-primary text-white w-32 flex items-center justify-center text-sm rounded-lg"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-3 border border-gray300 rounded-sm my-3 py-5 px-4">
              <div className="flex justify-between items-center">
                <h3>Specialist</h3>
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
                        className="bg-white border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Search.."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-2 overflow-x-auto overflow-y-auto max-h-[calc(100vh-210px)]">
                <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
                  <HeadTable columns={CategoryColumns} />
                  <tbody>
                    {data &&
                      data.map((row, index: number) => (
                        <tr
                          key={index}
                          className="border-b border-gray bg-white hover:bg-gray"
                        >
                          <td className="py-4 px-2">
                            {calculateIndexPaginate({ filter, index })}
                          </td>

                          <td scope="col" className="px-1">
                            {row.name}
                          </td>
                          <td scope="col">{DateFormat(row.createdAt)}</td>
                          <td>
                            <GeneralStatus status={row.status} />
                          </td>

                          <td>
                            <div className="flex gap-0">
                              <EditButtonIcon
                                onClick={() => {
                                  setEditOpen(true);
                                  setDataEvents(row);
                                }}
                              />
                              <DeleteButtonIcon
                                onClick={() => {
                                  setIsOpen(true);
                                  setDataEvents(row);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
              </div>
            </div>
          </div>
        </div>
        <DeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleDelete}
        />
        {editOpen && dataEvents && (
          <FormModal isOpen={editOpen} onClose={handleEditClose}>
            <EditExpertise data={dataEvents} />
          </FormModal>
        )}
      </div>
    </>
  );
}
