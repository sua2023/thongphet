"use client";
import { PreviousLinkIcon } from "@/components/icons/icons";
import { IChangeDoctorPassword } from "@/interfaces";
import useApi from "@/lib/useApi";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const vildateSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("New password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ChangeDoctorPassword({ userId }: { userId: string }) {
  const api = useApi();

  const { successPromiseMessage, errorMessage, errorPromiseMessage } =
    useToast();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: IChangeDoctorPassword,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    try {
      const result = await api({
        url: `doctors/${userId}/change-password`,
        method: "PUT",
        params: values,
      });

      if (result.status === 200) {
        successPromiseMessage("Change user password success", 1000);
        setSubmitting(false);
      } else {
        errorMessage(result, 1000);
        setSubmitting(false);
      }
      resetForm();
    } catch (error) {
      setSubmitting(false);
      errorMessage("Change user password failed", 1000);
    }
  };
  return (
    <>
      <div>
        <div className="lg:m-5 m-2">
          <p className="mt-2 text-base text-gray700">Change doctor password</p>
          <Formik
            initialValues={initialValues}
            validationSchema={vildateSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              handleSubmit(values, { resetForm, setSubmitting });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 lg:py-5 py-0">
                  <div className="lg:mb-2 mb-2">
                    <label
                      htmlFor="error"
                      className="block mb-2 text-sm font-medium text-gray700"
                    >
                      New password <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="newPassword"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      placeholder="New passwrod"
                      id="error"
                      className={`bg-white border ${
                        errors.newPassword && touched.newPassword
                          ? "border-red"
                          : "border-gray300"
                      } text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5`}
                    />
                    <p className="text-sm text-red">
                      {errors.newPassword &&
                        touched.newPassword &&
                        errors.newPassword}
                    </p>
                  </div>
                  <div className="lg:mb-2 mb-2">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray700"
                    >
                      Confirm password <span className="text-red">*</span>
                    </label>
                    <input
                      name="confirmPassword"
                      type="text"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      placeholder="Confirm password"
                      id="base-input"
                      className={`bg-white border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red"
                          : "border-gray300"
                      } text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5`}
                    />
                    <p className="text-sm text-red">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <a
                    className="py-2 px-3 w-28 flex justify-center items-center bg-red text-white text-sm rounded-lg"
                    href="/admin/doctor"
                  >
                    <PreviousLinkIcon size={22} />
                    <p>Back</p>
                  </a>
                  <button
                    disabled={isSubmitting ? true : false}
                    className="py-2 px-4 bg-primary text-white text-sm rounded-lg"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Save change"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
