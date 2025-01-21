"use client";
import { useRefreshState } from "@/context/autoRefreshProvider";
import { ICategoriesTypes } from "@/interfaces";
import useApi from "@/lib/useApi";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface ICategoryPropsType {
  data?: ICategoriesTypes;
}
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});
export default function EditCategory({ data }: ICategoryPropsType) {
  const api = useApi();
  const { refreshAuto, setRefreshAuto } = useRefreshState();
  const { successPromiseMessage, errorMessage } = useToast();
  const [categories, setCategories] = React.useState({
    id: data?.id,
    name: data?.name,
  });
  React.useEffect(() => {
    if (data) {
      setCategories({ id: data?.id, name: data?.name });
    }
  }, [data]);

  const handleSubmit = async (values: { name: string }) => {
    try {
      const result = await api({
        url: `categories/${categories.id}`,
        method: "PUT",
        params: values,
      });
      if (result.status === 200) {
        successPromiseMessage("Edit category success", 2000);
        setRefreshAuto((prev) => ({
          ...prev,
          isAutoClose: !prev?.isAutoClose,
          isStatus: "edit_category",
        }));
      } else if (result.status === 400) {
        errorMessage("Edit already created", 2000);
      } else {
        errorMessage("Edit category failed", 2000);
      }
    } catch (error) {
      errorMessage("Edit Category failed", 2000);
    }
  };
  return (
    <>
      <div className="text-start py-5">
        <p className="text-gray700 text-base mb-2">Edit category</p>
        <Formik
          enableReinitialize={true}
          initialValues={{ name: categories?.name || "" }}
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
                  className="block mb-1 text-sm font-medium text-gray700"
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
                <p className="text-sm text-red">
                  {errors.name && touched.name && errors.name}
                </p>
              </div>
              <div className="mt-5 pt-2">
                <button
                  type="submit"
                  className="mt-2 py-2 px-3 bg-primary text-white w-32 flex items-center justify-center text-sm rounded-lg"
                >
                  Edit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
