"use client";
import { RootState } from "@/redux/store";
import { Formik } from "formik";
import { useSelector } from "react-redux";

const validate = (values: any) => {
  const errors: { [key: string]: string } = {};
  const passwordRegex = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (!passwordRegex.test(values.newPassword)) {
    errors.newPassword =
      "Password must be at least 8 characters, include at least one lowercase letter, and one special character (e.g., ! @ # ?)";
  }
  return errors;
};

interface IForgotPassword {
  onClose: () => void;
  handleSubmit: (values: string, actions: any) => void;
}
export default function ForgotPassword({
  handleSubmit,
  onClose,
}: IForgotPassword) {
  const userData = useSelector((state: RootState) => state.user.data);

  const initialValues = {
    newPassword: "",
  };
  return (
    <>
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          validate={validate}
          enableReinitialize={true}
          onSubmit={(values: string, { resetForm }) => {
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
            <form className="text-start" onSubmit={handleSubmit}>
              <h4 className="text-gray700 text-lg">
                Change password for staff
              </h4>
              <div className="mt-8">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray900"
                >
                  User
                </label>
                <input
                  disabled
                  type="text"
                  value={userData?.firstName}
                  className="bg-gray100 border border-gray300 text-gray700 text-sm rounded-md focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="New password"
                  required
                />
              </div>
              <div className="mt-8">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray900"
                >
                  New password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  className="bg-gray100 border border-gray300 text-gray700 text-sm rounded-md focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="New password"
                  required
                />
                <p className="text-sm text-red">
                  {typeof errors.newPassword === "string" &&
                    touched.newPassword &&
                    errors.newPassword}
                </p>
              </div>
              <div className="mb-5 flex gap-5">
                <button
                  onClick={onClose}
                  type="button"
                  className="mt-5 text-white bg-red hover:bg-red/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="mt-5 text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
