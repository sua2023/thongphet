"use client";
import Loader from "@/components/loader";
import { IUsersCreateTypes, IUsersTypes } from "@/interfaces";
import useApi from "@/lib/useApi";
import { useFetchMe } from "@/lib/users/useFetchUser";
import { useUploadProfile } from "@/lib/users/useUploadProfile";
import { useToast } from "@/lib/useToast";
import { Formik } from "formik";
import { tree } from "next/dist/build/templates/app-page";
import Image from "next/image";
import React, { useRef } from "react";

const validate = (values: IUsersCreateTypes) => {
  const errors: { [key: string]: string } = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (values.phone.length < 8) {
    errors.phone = "Phone number must be at least 8 characters";
  }
  return errors;
};
export default function MyProfile() {
  const api = useApi();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadProfile();
  const { data, refresh } = useFetchMe();
  const [account, setAccount] = React.useState<IUsersTypes | null>(null);
  const [profile, setProfile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const defaultProfile = "/images/user/null_profile.png";
  const { successPromiseMessage, errorMessage, errorPromiseMessage } =
    useToast();
  const [previewProfile, setPreviewProfile] = React.useState<string | null>(
    null
  );

  const initialValues = {
    firstName: account?.firstName,
    lastName: account?.lastName,
    address: account?.address,
    phone: account?.phone,
  };

  React.useEffect(() => {
    if (data) {
      setAccount(data);
    }
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewProfile(previewUrl);
      setProfile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadProfile = async () => {
    if (!profile || profile == null) {
      return;
    }
    const url = "users/profile";

    try {
      const result = await upload.uploadProfile(url, profile);

      if (result?.status !== 200) {
        errorMessage("Upload profile failed", 2000);
      }
      refresh();
      setPreviewProfile(null);
    } catch (error) {}
  };

  const handleSubmit = async (
    values: IUsersCreateTypes,
    { resetForm }: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    try {
      const newValues = {
        ...values,
        ...(values.phone !== data?.phone && { phone: values.phone }),
        ...(values.email !== data?.email && { email: values.email }),
      };

      await handleUploadProfile();
      const result = await api({
        url: `users/${account?.id}`,
        method: "PUT",
        params: newValues,
      });

      if (result.status === 200) {
        successPromiseMessage("Change information success", 1000);
        setSubmitting(false);
      } else if (result.status == 400) {
        errorMessage("Change your information failed", 1000);
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
      errorMessage("Something wrong", 1000);
    }
  };
  console.log(loading);

  return (
    <>
      <div>
        <div className="lg:m-5 m-2">
          <p className="mt-2 text-base text-gray700">Information</p>
          <Formik
            initialValues={initialValues}
            validate={validate}
            enableReinitialize={true}
            onSubmit={(values: IUsersCreateTypes, { resetForm }) => {
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
                <div className="flex gap-8">
                  {!loading ? (
                    <Loader />
                  ) : (
                    <Image
                      className="rounded size-36 object-contain"
                      src={
                        previewProfile
                          ? previewProfile
                          : data?.profile
                          ? data?.profile
                          : defaultProfile
                      }
                      width={200}
                      height={150}
                      alt={account?.firstName || ""}
                      onLoad={(e) => {
                        if (e) {
                          setLoading(true);
                        } else {
                          setLoading(false);
                        }
                      }}
                      loading="lazy"
                    />
                  )}
                  <div className="flex items-end">
                    <button
                      className="bg-primary px-5 h-8 rounded-lg text-white"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      Change
                      <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        onChange={handleFileChange}
                      />
                    </button>
                  </div>
                </div>
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
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
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
                      disabled
                      type="email"
                      value={account?.email}
                      placeholder="Email"
                      id="base-input"
                      className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                    />
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
                      Role
                    </label>
                    <input
                      // value={data?.role}
                      disabled
                      type="text"
                      id="base-input"
                      className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                    />
                  </div>

                  <div className="lg:mb-2 mb-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray700 dark:text-white"
                    >
                      Address
                    </label>
                    <textarea
                      id="message"
                      rows={1.5}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Address here..."
                    />
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
                    {submitting ? "Submitting..." : "Save change"}
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
