"use client";
import { formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { OptionsYears } from "@/helps/doctorOption";
import { GenderOptions } from "@/helps/genderOption";
import {
  IDoctorCeritificate,
  IDoctorEditTypes
} from "@/interfaces";
import { IExpertiseTypes } from "@/interfaces/expertiseType";
import { useFetchAllCategory } from "@/lib/category/useFetchCategories";
import { useFetchSpecialist } from "@/lib/expertise/useFetchExpertise";
import { useCreate } from "@/lib/useCreate";
import { useDeleteForever } from "@/lib/useDeleteForever";
import { useToast } from "@/lib/useToast";
import {
  addCombobox,
  isClearComplete,
  isCloseConfirm,
  isDeleteComplete,
  removeCombobox,
} from "@/redux/features/combobox";
import { closeOpen, setIsOpen } from "@/redux/features/dialogSlice";
import { RootState } from "@/redux/store";
import { Formik } from "formik";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ComboBox from "../combobox";
import {
  CloseIcon,
  DeleteIcon,
  EyeFillIcon,
  PlusIcon,
  UploadIcon,
} from "../icons/icons";
import DeleteModal from "../modal/deleteModal";
import FormModal from "../modal/formModal";
import Select from "../select";
import SelectOptions from "../selectOption";
import ToolTip from "../tooltip";
import AddSpcialist from "./addspcialist";
import Identify from "./indentify";

interface IFormEditProps {
  initialValues: IDoctorEditTypes;
  validationSchema?: Yup.ObjectSchema<any>;
  handleSubmit: (values: IDoctorEditTypes, actions: any) => void;
  options?: { value: string; label: string }[];
}
export default function FormEditDoctor({
  initialValues,
  validationSchema,
  handleSubmit,
  options,
}: IFormEditProps) {
  const dispatch = useDispatch();
  const { isOpen, status } = useSelector((state: RootState) => state.dialog);
  const { createForever } = useCreate();
  const { successPromiseMessage } = useToast();
  const { deletedForever } = useDeleteForever();
  const { data: listSpecialist, refresh } = useFetchSpecialist();
  const { data: category } = useFetchAllCategory();
  const { isConfirm } = useSelector((state: RootState) => state.combobox);
  const [isDeleteCertificate, setIsDeleteCertificate] =
    React.useState<boolean>(false);
  const [isDeleteDoc, setIsDeleteDoc] = React.useState<boolean>(false);
  const [deleteSpecialist, setDeleteSpecialist] =
    React.useState<IExpertiseTypes | null>(null);
  const [newExpertise, setNewExpertise] = React.useState<string>("");
  const yearOtions = OptionsYears();
  const [dataEvents, setDataEvents] =
    React.useState<IDoctorCeritificate | null>(null);
  const [categories, setCategories] = React.useState<any>({
    id: "",
    name: "",
  });

  const handleClose = () => {
    dispatch(closeOpen());
  };

  const handlePreviewCertificate = (certificate: any) => {
    if (typeof certificate === "string" && certificate.trim() !== "") {
      window.open(certificate, "_blank");
    }
  };
  const handleRemoveCertifycate = async () => {
    if (!dataEvents || !dataEvents.id) {
      return;
    }
    const url = `certificates/${dataEvents?.id}`;
    const deleted = await deletedForever(url);
    if (deleted?.status == 200) {
      setIsDeleteDoc(false);
      setIsDeleteCertificate(true);
      setTimeout(() => {
        setIsDeleteCertificate(false);
      }, 2000);
    }
    return deleted;
  };

  const handleAddExpertise = async () => {
    const newSpacialist = { name: newExpertise };
    const created = await createForever("specialists", newSpacialist);
    if (created?.status === 201) {
      refresh();
      successPromiseMessage("Create specialists success", 2000);
      handleClose();
    }
  };
  const handleDeleteDoctorSpecialist = async () => {
    if (!deleteSpecialist?.id) return;
    const url = `doc-specialists/${deleteSpecialist?.id}`;
    const deleted = await deletedForever(url);
    dispatch(removeCombobox(deleteSpecialist));
    return deleted;
  };
  const handleSelectSpecialist = React.useCallback(
    (selectedOptions: IExpertiseTypes[]) => {
      selectedOptions.forEach((item) => {
        dispatch(addCombobox(item));
      });
    },
    [dispatch]
  );

  return (
    <>
      <div className="lg:m-5 m-2">
        <p className="mt-2 text-base text-gray700">Edit an doctor</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: IDoctorEditTypes,
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
          }) => {
            React.useEffect(() => {
              if (isDeleteCertificate && dataEvents?.id) {
                const updatedEducations = values?.educations?.map(
                  (educationItem) => {
                    return {
                      ...educationItem,
                      certificates: educationItem.certificates?.filter(
                        (certificate) => certificate.id !== dataEvents.id
                      ),
                    };
                  }
                );

                setFieldValue("educations", updatedEducations);
              }
            }, [isDeleteCertificate, dataEvents, setFieldValue]);
            React.useEffect(() => {
              const firstCategory =
                Array.isArray(values.doctorCategories) &&
                values.doctorCategories.length > 0
                  ? {
                      id: values.doctorCategories[0].id,
                      name: values.doctorCategories[0].name,
                    }
                  : { id: "", name: "" };

              setCategories(firstCategory);
            }, []);
            return (
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="border my-2 border-gray rounded-md">
                  <div>
                    <p className="p-2 text-base bg-gray100 border-b-2 border-gray300 font-semibold text-gray700">
                      Personal information
                    </p>
                  </div>
                  <div className="p-2 m-2">
                    <div className="grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 gap-5 lg:py-5 py-0">
                      <div className="lg:col-span-2 col-span-3">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-3">
                          <div>
                            <label
                              htmlFor="base-input"
                              className="block  text-sm font-medium text-gray700"
                            >
                              Firstname <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.firstName}
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
                              className="block  text-sm font-medium text-gray700"
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
                              {errors.lastName &&
                                touched.lastName &&
                                errors.lastName}
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="base-input"
                              className="block  text-sm font-medium text-gray700"
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
                              className="block  text-sm font-medium text-gray700"
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
                              className="block text-sm font-medium text-gray700"
                            >
                              Gender
                            </label>
                            <Select
                              options={GenderOptions}
                              value={values.gender || undefined}
                              onChange={(selectedOption) => {
                                if (selectedOption) {
                                  setFieldValue("gender", selectedOption);
                                }
                              }}
                            />
                            <p className="text-sm text-red">
                              {errors.gender && touched.gender && errors.gender}
                            </p>
                          </div>
                          <div>
                            <div>
                              <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray700"
                              >
                                Category
                              </label>
                              <SelectOptions
                                options={category}
                                value={categories.name}
                                onChange={(id, name) => {
                                  const updatedCategories = [
                                    {
                                      id: id,
                                      name: name,
                                    },
                                  ];

                                  setFieldValue(
                                    "doctorCategories",
                                    updatedCategories
                                  );
                                  setCategories({ id: id, name: name });
                                }}
                              />
                              <p className="text-sm text-gray400">
                                Department of doctor for choose
                              </p>
                              <p className="text-sm text-red">
                                {errors.doctorCategories &&
                                  touched.doctorCategories &&
                                  errors.doctorCategories}
                              </p>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="base-input"
                              className="block text-sm font-medium text-gray700"
                            >
                              Birthday
                            </label>
                            <input
                              type="date"
                              id="base-input"
                              name="dob"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={
                                values?.dob
                                  ? formatDateToYYYYMMDD(values?.dob)
                                  : ""
                              }
                              className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                            />
                            <p className="text-sm text-red">
                              {errors.dob && touched.dob && errors.dob}
                            </p>
                          </div>

                          <div>
                            <label
                              htmlFor="base-input"
                              className="block text-sm font-medium text-gray700"
                            >
                              Status
                            </label>
                            <Select
                              options={options}
                              value={values?.status || ""}
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
                              className="block text-sm font-medium text-gray700"
                            >
                              Address
                            </label>
                            <textarea
                              id="message"
                              rows={3}
                              name="address1"
                              value={values?.address1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // {...(values.address1 as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                              className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              placeholder="Address here..."
                            />
                            <p className="text-sm text-gray400">
                              Example: Vientiane capital, Saysetha, Thant luang
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-1 col-span-1">
                        <div className="flex items-center justify-center p-2 mt-5">
                          <div className="relative group">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center border-2 border-gray300 h-56 border-dashed rounded-lg cursor-pointer bg-white"
                            >
                              {values?.profile ? (
                                <Image
                                  src={
                                    values?.profile instanceof File
                                      ? URL?.createObjectURL(values?.profile)
                                      : values?.profile
                                  }
                                  alt={values?.firstName || ""}
                                  className="rounded-md object-contain size-56 p-2"
                                  width={100}
                                  height={100}
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <UploadIcon size={40} />
                                  <p className="mb-2 m-2 text-sm text-gray500">
                                    <span className="font-semibold">
                                      Click to upload profile
                                    </span>
                                  </p>
                                  <p className="text-xs m-2 text-gray500">
                                    PNG, JPG or JPEG (MAX. 800x400px)
                                  </p>
                                </div>
                              )}
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const file = e.target?.files?.[0];
                                  setFieldValue("profile", file);
                                }}
                              />
                            </label>
                            <ToolTip title="Change profile" />
                          </div>
                        </div>
                        <p className="text-center">Profile</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="p-2 text-base bg-gray border-b-2 border-gray300 font-semibold text-gray700">
                      Bio about doctor
                    </p>
                  </div>
                  <div className="p-2 m-2">
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray700"
                      >
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        name="bio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bio || ""}
                        className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="Bio about yourself..."
                      />
                      <p className="text-sm text-gray400">
                        Short description of a person A bio, short for
                        "biography," on social media refers to a brief
                        description or summary of yourself, your interests
                      </p>
                    </div>
                  </div>
                  <div className="my-5">
                    <div className="my-5">
                      <p className="p-2 text-base bg-gray border-b-2 border-gray300 font-semibold text-gray700">
                        Education information
                      </p>
                    </div>
                    {values.educations?.map((edu, index) => {
                      return (
                        <div key={index} className="px-2 mx-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                Degree
                              </label>
                              <input
                                type="text"
                                name={`educations[${index}].degree`}
                                value={edu.degree || ""}
                                onChange={(e) => {
                                  setFieldValue(
                                    `educations[${index}].degree`,
                                    e.target.value
                                  );
                                }}
                                placeholder="Degree"
                                className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                College/University
                              </label>
                              <input
                                type="text"
                                name={`educations[${index}].university`}
                                value={edu?.university}
                                onChange={(e) => {
                                  setFieldValue(
                                    `educations[${index}].university`,
                                    e.target.value
                                  );
                                }}
                                placeholder="College/University"
                                className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                Start year
                              </label>
                              <Select
                                options={yearOtions}
                                value={edu.from || ""}
                                onChange={(selectedOption) => {
                                  if (selectedOption) {
                                    setFieldValue(
                                      `educations[${index}].from`,
                                      selectedOption
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                Graduated Year
                              </label>
                              <Select
                                options={yearOtions}
                                value={edu.to || ""}
                                onChange={(selectedOption) => {
                                  if (selectedOption) {
                                    setFieldValue(
                                      `educations[${index}].to`,
                                      selectedOption
                                    );
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="file_input"
                                className="block text-sm  font-medium text-gray700"
                              >
                                Upload certificate
                              </label>
                              <input
                                id="file_input"
                                type="file"
                                onChange={(event) => {
                                  const files = event.currentTarget.files;
                                  if (files && files.length > 0) {
                                    const fileArray = Array.from(files);
                                    const currentCertificates =
                                      values.educations?.[index]
                                        ?.certificates || [];

                                    const updatedCertificates = fileArray.map(
                                      (file) => ({
                                        id: "",
                                        name: file.name,
                                        photo: file,
                                        status: "pending",
                                      })
                                    );

                                    setFieldValue(
                                      `educations[${index}].certificates`,
                                      [
                                        ...currentCertificates,
                                        ...updatedCertificates,
                                      ]
                                    );
                                  }
                                }}
                                accept="application/pdf"
                                className="cursor-pointer bg-white w-full border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block p-1.5"
                              />
                            </div>
                          </div>
                          {edu?.certificates &&
                            edu.certificates.length > 0 &&
                            edu?.certificates?.map(
                              (certifi, cerIndex: number) => {
                                return (
                                  <div
                                    key={cerIndex}
                                    className="flex gap-5 items-center mt-2"
                                  >
                                    <li>{certifi?.name}.pdf</li>
                                    <div className="flex gap-2">
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                          handlePreviewCertificate(
                                            certifi.photo
                                          );
                                        }}
                                      >
                                        <EyeFillIcon color="gray" size={18} />
                                      </span>
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => {

                                          if (!certifi?.id) {
                                            const certificates =
                                              values?.educations?.[index]
                                                ?.certificates || [];

                                            const updatedCertificates =
                                              certificates.filter(
                                                (img: IDoctorCeritificate) =>
                                                  img.name !== certifi.name
                                              );

                                            if (
                                              updatedCertificates.length !==
                                              certificates.length
                                            ) {
                                              setFieldValue(
                                                `educations[${index}].certificates`,
                                                updatedCertificates
                                              );
                                            }
                                          } else {
                                            setDataEvents(certifi);
                                            setIsDeleteDoc(true);
                                          }
                                        }}
                                      >
                                        <CloseIcon color="red" size={18} />
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            )}

                          <div className="flex justify-end mt-2 gap-2">
                            <button
                              className="px-2 py-1 bg-primary text-white text-sm rounded-md"
                              type="button"
                              onClick={() => {
                                setFieldValue("educations", [
                                  ...(values.educations || []),
                                  {
                                    degree: "",
                                    university: "",
                                    from: null,
                                    to: null,
                                  },
                                ]);
                              }}
                            >
                              <PlusIcon />
                            </button>
                            {(values.educations?.length || 0) > 1 && (
                              <button
                                className="px-2 py-1 bg-red text-white text-sm rounded-md"
                                type="button"
                                onClick={() => {
                                  const newEducations = [
                                    ...(values.educations || []),
                                  ];
                                  newEducations.pop();
                                  setFieldValue("educations", newEducations);
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="my-5">
                    <div className="my-5">
                      <p className="p-2 text-base bg-gray border-b-2 border-gray300 font-semibold text-gray700">
                        Specialist information
                      </p>
                    </div>
                    <div className="p-2 m-2">
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray700"
                        >
                          Specialist
                        </label>
                        <ComboBox
                          options={listSpecialist}
                          onSubmit={handleSelectSpecialist}
                          onDelete={(data) => {
                            setDeleteSpecialist(data);
                          }}
                          isConfirm={true}
                        />
                        <p className="text-sm text-gray400">
                          Department of specialist
                        </p>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          className="p-2 bg-primary text-white text-sm rounded-md"
                          type="button"
                          onClick={() =>
                            dispatch(
                              setIsOpen({
                                isOpen: true,
                                status: "addMoreExpertise",
                                dataEvents: "",
                              })
                            )
                          }
                        >
                          <span className="flex items-center gap-2">
                            <PlusIcon /> Add more
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="my-5">
                    <div className="my-5">
                      <p className="p-2 text-base bg-gray border-b-2 border-gray300 font-semibold text-gray700">
                        Experience information
                      </p>
                    </div>
                    <div className="p-2 m-2">
                      <div className="mb-5">
                        <label
                          htmlFor="base-input"
                          className="block  text-sm font-medium text-gray700"
                        >
                          Current hospital <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          name="hospital"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.hospital || ""}
                          placeholder="Hostital"
                          id="base-input"
                          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                        />
                        <p className="text-sm text-red">
                          {errors.hospital &&
                            touched.hospital &&
                            errors.hospital}
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray700"
                        >
                          Experience
                        </label>
                        <textarea
                          rows={3}
                          name="experience"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.experience || ""}
                          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                          placeholder="Your experience..."
                        />
                        <p className="text-sm text-gray400">
                          Long description of a person experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-8 border border-gray rounded-md">
                  <div className="mb-5">
                    <p className="p-2 text-base bg-gray100 border-b-2 border-gray300 font-semibold text-gray700">
                      Identify information
                    </p>
                  </div>
                  <div className="p-2 m-2">
                    <Identify
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <a
                    className="py-2 px-3 w-32 flex justify-center bg-red text-white text-sm rounded-lg"
                    href="/admin/doctor"
                  >
                    Back
                  </a>
                  <button
                    // disabled={isSubmitting ? true : false}
                    className="py-2 px-3 w-32 bg-primary text-white text-sm rounded-lg"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Edit"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
        <DeleteModal
          isOpen={isConfirm}
          onClose={() => {
            dispatch(isCloseConfirm());
            dispatch(isClearComplete());
          }}
          onSubmit={() => {
            dispatch(isDeleteComplete());
            handleDeleteDoctorSpecialist();
            dispatch(isCloseConfirm());
            setTimeout(() => {
              dispatch(isClearComplete());
            }, 3000);
          }}
        />
        <DeleteModal
          isOpen={isDeleteDoc}
          onClose={() => {
            setIsDeleteDoc(false);
          }}
          onSubmit={() => {
            handleRemoveCertifycate();
          }}
        />
        {status == "addMoreExpertise" && (
          <FormModal isOpen={isOpen} onClose={handleClose}>
            <AddSpcialist
              newExpertise={newExpertise}
              setNewExpertise={setNewExpertise}
              handleAddExpertise={handleAddExpertise}
            />
          </FormModal>
        )}
      </div>
    </>
  );
}
