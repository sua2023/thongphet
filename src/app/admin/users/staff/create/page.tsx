"use client";
import SelectOptions from "@/components/selectOption";
import { IRoleObjType, IUsersCreateTypes } from "@/interfaces";
import useApi from "@/lib/useApi";
import useFilter from "@/lib/useFiltter";
import { useFetchAllRoles, useFetchRoles } from "@/lib/users/useFetchRole";
import { useUploadProfile } from "@/lib/users/useUploadProfile";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

const initialValues: IUsersCreateTypes = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  address: "",
  profile: "",
  role: { id: "", name: "" },
};

const validate = (values: IUsersCreateTypes) => {
  const errors: { [key: string]: string } = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "Phone must be a number";
  } else if (values.phone.length < 8) {
    errors.phone = "Phone number must be at least 8 characters";
  }
  return errors;
};
export default function CreateStaff() {
  const router = useRouter();
  const fetcthApi = useApi();
  const upload = useUploadProfile();
  const { successPromiseMessage, errorMessage, warningMessage } = useToast();
  const [dataRole, setDataRole] = React.useState<IRoleObjType[]>([]);
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total } = useFetchAllRoles();

  React.useEffect(() => {
    if (data) {
      setDataRole(data);
    }
  }, [data]);

  const handleSubmit = async (
    values: IUsersCreateTypes,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (action: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      const roleId = values.role?.id;
      const { role, profile, ...submitData } = values;
      const dataToSubmit = {
        ...submitData,
        roleId,
      };

      const result = await fetcthApi({
        url: "users",
        method: "POST",
        params: dataToSubmit,
      });
      if (result.status == 201) {
        successPromiseMessage("Create user success", 1000);
        resetForm();
      } else if (result.status == 404) {
        errorMessage("Create user failed", 2000);
      } else if (result.status == 403) {
        errorMessage("Your permission denied", 2000);
      } else {
        errorMessage(result, 1000);
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      errorMessage("Something wrong", 1000);
    }
  };
  return (
    <Layout>
      <div className="lg:m-5 m-2">
        <p className="mt-2 text-base text-gray700">Create an staff</p>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(
            values: IUsersCreateTypes,
            { resetForm, setSubmitting }
          ) => {
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
            setFieldValue,
            isSubmitting,
          }) => (
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 lg:py-5 py-0">
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Firstname <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Firstname"
                    id="base-input"
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <p className="text-sm text-red">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Lastname <span className="text-red">*</span>
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Lastname"
                    id="base-input"
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <p className="text-sm text-red">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Email <span className="text-red">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    id="base-input"
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <p className="text-sm text-red">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Phone number <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder="Phone number"
                    id="base-input"
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <p className="text-sm text-red">
                    {errors.phone && touched.phone && errors.phone}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Password <span className="text-red">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    id="base-input"
                    placeholder="Password"
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <p className="text-sm text-red">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Role
                  </label>
                  <SelectOptions
                    placeholder="Select role"
                    options={dataRole}
                    value={values?.role?.name}
                    onChange={(id, name) => {
                      const selectedRole = {
                        id: id,
                        name: name,
                      };
                      setFieldValue("role", selectedRole);
                    }}
                  />
                </div>

                <div className="lg:mb-2 mb-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray700"
                  >
                    Address
                  </label>
                  <textarea
                    id="message"
                    rows={1.5}
                    value={values.address}
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="Address here..."
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  className="py-2 px-6 bg-red text-white text-sm rounded-lg"
                  href="/admin/users/staff"
                >
                  Back
                </a>
                <button
                  className="py-2 px-6 bg-primary text-white text-sm rounded-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Create now"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
