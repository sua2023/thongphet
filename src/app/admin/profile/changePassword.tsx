"use client";
import {
  CheckCircleIcon,
  CircleFullIcon,
  EyeFillIcon,
  EyeVisibleIcon,
} from "@/components/icons/icons";
import useApi from "@/lib/useApi";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import React from "react";

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
const validate = (values: any) => {
  const errors: { [key: string]: string } = {};
  const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!values.currentPassword) {
    errors.currentPassword = "Current password is required";
  }
  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (!passwordRegex.test(values.newPassword)) {
    errors.newPassword =
      "Password must be at least 8 characters, include at least one lowercase letter, and one special character (e.g., ! @ # ?)";
  }
  return errors;
};
export default function ChangePasswrod() {
  const api = useApi();
  const { successPromiseMessage, errorMessage } = useToast();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isCurrentVisible, setIsCurrentVisible] =
    React.useState<boolean>(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };
  const handleSubmit = async (
    values: IChangePassword,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await api({
        url: "users/change-password",
        method: "PUT",
        params: values,
      });
      if (result.status === 200) {
        handleVisible();
        handleCurrentVisible();
        resetForm();
        successPromiseMessage("Change password success", 2000);
      } else if (result.status == 400) {
        errorMessage("Current password is incorrect", 2000);
      } else {
        errorMessage(result, 1000);
      }
    } catch (error) {
      errorMessage("Change password failed", 2000);
    }
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleCurrentVisible = () => {
    setIsCurrentVisible(!isVisible);
  };
  return (
    <>
      <div className="p-4">
        <Formik
          initialValues={initialValues}
          validate={validate}
          enableReinitialize={true}
          onSubmit={(values: IChangePassword, { resetForm }) => {
            handleSubmit(values, { resetForm });
          }}
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
              <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 lg:py-5 py-0">
                <div className="lg:mb-2 mb-3">
                  <div className="relative">
                    <label
                      htmlFor="base-input"
                      className="block mb-1 text-sm font-medium text-gray700"
                    >
                      Current password <span className="text-red">*</span>
                    </label>
                    <input
                      type={isCurrentVisible ? "text" : "password"}
                      name="currentPassword"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currentPassword}
                      placeholder="Current password"
                      id="base-input"
                      className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                    />
                    <span
                      className="absolute inset-y-3.5 right-0 flex items-end pr-3 cursor-pointer"
                      onClick={handleCurrentVisible}
                    >
                      {isCurrentVisible ? (
                        <EyeVisibleIcon />
                      ) : (
                        <EyeFillIcon color="#475569" />
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-red">
                    {errors.currentPassword &&
                      touched.currentPassword &&
                      errors.currentPassword}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <div className="relative">
                    <label
                      htmlFor="base-input"
                      className="block mb-1 text-sm font-medium text-gray700"
                    >
                      New password <span className="text-red">*</span>
                    </label>
                    <input
                      name="newPassword"
                      type={isVisible ? "text" : "password"}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.newPassword}
                      placeholder="New password"
                      id="base-input"
                      className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                    />
                    <span
                      className="absolute inset-y-3.5 right-0 flex items-end pr-3 cursor-pointer"
                      onClick={handleVisible}
                    >
                      {isVisible ? (
                        <EyeVisibleIcon />
                      ) : (
                        <EyeFillIcon color="#475569" />
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-red">
                    {errors.newPassword &&
                      touched.newPassword &&
                      errors.newPassword}
                  </p>
                </div>
                <div className="mb-4 mt-2 lg:my-0">
                  <h2 className="mb-2 text-gray700">Password requirements:</h2>
                  <ul className="max-w-md space-y-1 text-gray700 list-inside">
                    <li className="flex items-center gap-2 text-sm">
                      {values.newPassword && values.newPassword.length >= 8 ? (
                        <CheckCircleIcon color="#009b91" size={16} />
                      ) : (
                        <CircleFullIcon color="#475569" size={16} />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      {values.newPassword &&
                      /[a-z]/.test(values.newPassword) ? (
                        <CheckCircleIcon color="#009b91" size={16} />
                      ) : (
                        <CircleFullIcon color="#475569" size={16} />
                      )}
                      At least one lowercase character
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      {values.newPassword &&
                      /[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword) ? (
                        <CheckCircleIcon color="#009b91" size={16} />
                      ) : (
                        <CircleFullIcon color="#475569" size={16} />
                      )}
                      At least one special character, e.g., ! @ # ?
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  className="py-2 px-3 bg-red text-white text-sm rounded-lg"
                  href="/admin/dashboard"
                >
                  Back
                </a>
                <button
                  className="py-2 px-3 bg-primary text-white text-sm rounded-lg"
                  type="submit"
                >
                  Save change
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
