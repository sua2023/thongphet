"use client";
import { IRoleObjType, IUsersCreateTypes } from "@/interfaces";
import useFilter from "@/lib/useFiltter";
import { useFetchRoles } from "@/lib/users/useFetchRole";
import { Formik } from "formik";
import React from "react";
import Select from "../select";
import SelectOptions from "../selectOption";

interface IFormCreateEditStaffProps {
  initialValues: IUsersCreateTypes;
  validate: (values: IUsersCreateTypes) => { [key: string]: string };
  handleSubmit: (values: IUsersCreateTypes, actions: any) => void;
  options?: { value: string; label: string }[];
  role: IRoleObjType[];
}
export default function FormCreateEditStaff({
  initialValues,
  validate,
  handleSubmit,
  options,
  role,
}: IFormCreateEditStaffProps) {
  return (
    <>
      <div className="lg:m-5 m-2">
        <p className="mt-2 text-base text-gray700">Edit an staff</p>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values: IUsersCreateTypes, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting });
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
          }) => {
            React.useEffect(() => {
              const matchedRole = role?.find(
                (role) => role.id === values.roleId
              );

              if (matchedRole) {
                setFieldValue("role", {
                  id: matchedRole.id,
                  name: matchedRole.name,
                });
              }
            }, [role, values.roleId, setFieldValue]);

            return (
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 lg:py-5 py-0">
                  <div>
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
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </p>
                  </div>
                  <div>
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
                  <div>
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
                  <div>
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

                  <div>
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray700"
                    >
                      Role
                    </label>
                    <SelectOptions
                      placeholder="Select role"
                      options={role}
                      value={values?.role?.name}
                      onChange={(id, name) => {
                        const selectedRole = {
                          id: id,
                          name: name,
                        };
                        setFieldValue("role", selectedRole);
                        setFieldValue("roleId", selectedRole.id);
                      }}
                    />
                  </div>

                  <div className="lg:mb-2 mb-2">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray700"
                    >
                      Status
                    </label>
                    <Select
                      options={options}
                      value={values.status}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          setFieldValue("status", selectedOption);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray700"
                    >
                      Address
                    </label>
                    <textarea
                      id="message"
                      rows={1.5}
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
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
                    {isSubmitting ? "Submitting..." : "Save change"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
