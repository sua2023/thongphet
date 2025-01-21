"use client";
import { formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { OptionsYears } from "@/helps/doctorOption";
import { GenderOptions } from "@/helps/genderOption";
import { ICategoriesTypes, IDoctorCreateTypes } from "@/interfaces";
import { IExpertiseTypes } from "@/interfaces/expertiseType";
import { useFetchAllCategory } from "@/lib/category/useFetchCategories";
import { useFetchSpecialist } from "@/lib/expertise/useFetchExpertise";
import { useCreate } from "@/lib/useCreate";
import useFilter from "@/lib/useFiltter";
import { useToast } from "@/lib/useToast";
import { addCombobox } from "@/redux/features/combobox";
import { closeOpen, setIsOpen } from "@/redux/features/dialogSlice";
import { RootState } from "@/redux/store";
import { Formik } from "formik";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ComboBox from "../combobox";
import { CloseIcon, DeleteIcon, PlusIcon, UploadIcon } from "../icons/icons";
import FormModal from "../modal/formModal";
import Select from "../select";
import SelectOptions from "../selectOption";
import AddSpcialist from "./addspcialist";
import Identify from "./indentify";

interface IFormCreateProps {
  initialValues: IDoctorCreateTypes;
  validationSchema?: Yup.ObjectSchema<any>;
  handleSubmit: (values: IDoctorCreateTypes, actions: any) => void;
  options?: { value: string; label: string }[];
}
export default function FormCreateDoctor({
  initialValues,
  validationSchema,
  handleSubmit,
  options,
}: IFormCreateProps) {
  const dispatch = useDispatch();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { isOpen, dataEvents, status } = useSelector(
    (state: RootState) => state.dialog
  );

  const { createForever } = useCreate();
  const { successPromiseMessage } = useToast();
  const { data: epacialist, refresh } = useFetchSpecialist();
  const { data: category } = useFetchAllCategory();
  const [newExpertise, setNewExpertise] = React.useState<string>("");
  const [categories, setCategories] = React.useState<any>({
    id: "",
    name: "",
  });
  const [newOptions, setnewOptions] = React.useState<IExpertiseTypes[]>([]);
  const [newCategoriesOptions, setNewCategoriesOptions] = React.useState<
    ICategoriesTypes[]
  >([]);

  const [previewProfile, setPreviewProfile] = React.useState<string | null>(
    null
  );
  const yearOtions = OptionsYears();

  React.useEffect(() => {
    if (epacialist && epacialist.length > 0) {
      setnewOptions((state) => {
        const newOptions = epacialist.filter(
          (newItem: IExpertiseTypes) =>
            !state.some((item) => item.id === newItem.id)
        );
        return [...state, ...newOptions];
      });
    }
  }, [epacialist]);
  React.useEffect(() => {
    if (category && category.length > 0) {
      setNewCategoriesOptions((state) => {
        const newOptions = category.filter(
          (newItem: ICategoriesTypes) =>
            !state.some((item) => item.id === newItem.id)
        );
        return [...state, ...newOptions];
      });
    }
  }, [category]);

  const handleClose = () => {
    dispatch(closeOpen());
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewProfile(previewUrl);
    }
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

  const handleSelectSpecialist = React.useCallback(
    (selectedOptions: IExpertiseTypes[]) => {
      selectedOptions.forEach((item) => {
        dispatch(addCombobox(item));
      });
    },
    []
  );

  return (
    <>
      <div className="lg:m-5 m-2">
        <p className="mt-2 text-base text-gray700">Create an doctor</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: IDoctorCreateTypes,
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
              if (isSubmitting) {
                setPreviewProfile(null);
              }
            }, [isSubmitting]);

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
                              Password <span className="text-red">*</span>
                            </label>
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.password || ""}
                              id="base-input"
                              placeholder="Password"
                              className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                            />
                            <p className="text-sm text-red">
                              {errors.password &&
                                touched.password &&
                                errors.password}
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
                              value={values?.gender || ""}
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
                                options={newCategoriesOptions}
                                value={categories.name}
                                onChange={(id, name) => {
                                  setFieldValue("categories", [
                                    id,
                                    ...(values.categories || []).slice(1),
                                  ]);
                                  setCategories({ id: id, name: name });
                                }}
                              />
                              <p className="text-sm text-gray400">
                                Department of doctor for choose
                              </p>
                              <p className="text-sm text-red">
                                {errors.categories &&
                                  touched.categories &&
                                  errors.categories}
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
                              htmlFor="message"
                              className="block text-sm font-medium text-gray700"
                            >
                              Address
                            </label>
                            <textarea
                              id="message"
                              rows={3}
                              name="address1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address1}
                              className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              placeholder="Address here..."
                            />
                            <p className="text-sm text-gray400">
                              Example: Vientiane capital, Saysetha, Thant luang
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-1 col-span-3">
                        <div className="flex items-center p-2 mt-5">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center border-2 border-gray300 h-56 border-dashed rounded-lg cursor-pointer bg-white"
                          >
                            {previewProfile ? (
                              <Image
                                src={previewProfile}
                                alt="profile"
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
                                handleFileUpload(e);
                                setFieldValue("profile", file);
                              }}
                            />
                          </label>
                        </div>
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
                        <div className="px-2 mx-2" key={index}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                Degree
                              </label>
                              <input
                                type="text"
                                name={`educations[${index}].degree`}
                                value={edu.degree || ""}
                                onChange={(e) => {
                                  const newEducations = [
                                    ...(values.educations || []),
                                  ];
                                  newEducations[index].degree = e.target.value;
                                  setFieldValue("educations", newEducations);
                                }}
                                placeholder="Degree"
                                className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              />
                              <p className="text-sm text-red">
                                {Array.isArray(errors.educations) &&
                                  errors.educations[index] &&
                                  (errors.educations[index] as any).degree &&
                                  (errors.educations[index] as any).degree}
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                College/University
                              </label>
                              <input
                                type="text"
                                name={`educations[${index}].university`}
                                value={edu.university || ""}
                                onChange={(e) => {
                                  const newEducations = [
                                    ...(values.educations || []),
                                  ];
                                  newEducations[index].university =
                                    e.target.value;
                                  setFieldValue("educations", newEducations);
                                }}
                                placeholder="College/University"
                                className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                              />
                              <p className="text-sm text-red">
                                {Array.isArray(errors.educations) &&
                                  errors.educations[index] &&
                                  (errors.educations[index] as any)
                                    .university &&
                                  (errors.educations[index] as any).university}
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray700">
                                Start year
                              </label>
                              <Select
                                options={yearOtions}
                                value={edu.from}
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
                                value={edu.to}
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
                                multiple
                                onChange={(event) => {
                                  const files = event.currentTarget.files;

                                  if (files && files.length > 0) {
                                    const fileArray = Array.from(files);
                                    const currentImages =
                                      values.educations?.[index]?.certificates
                                        ?.images || [];
                                    setFieldValue(
                                      `educations[${index}].certificates.images`,
                                      [...currentImages, ...fileArray]
                                    );
                                  }
                                }}
                                accept="application/pdf"
                                className="cursor-pointer bg-white w-full border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block p-1.5"
                              />
                            </div>
                          </div>

                          {values?.educations?.[index]?.certificates?.images &&
                            values?.educations?.[
                              index
                            ]?.certificates?.images?.map(
                              (file: File, fileIndex: number) => (
                                <div
                                  key={`${file.name}-${file.lastModified}`}
                                  className="flex items-center bg-gray text-base px-2 py-1 my-2"
                                >
                                  <span>
                                    {fileIndex + 1}.&nbsp;{file.name}
                                  </span>
                                  <button
                                    type="button"
                                    className="ml-2 text-red"
                                    onClick={() => {
                                      const images =
                                        values?.educations?.[index]
                                          ?.certificates?.images;

                                      if (images) {
                                        const updatedImages = images?.filter(
                                          (img: File) => img.name !== file.name
                                        );

                                        if (
                                          updatedImages.length !== images.length
                                        ) {
                                          setFieldValue(
                                            `educations[${index}].certificates.images`,
                                            updatedImages
                                          );
                                        }
                                      }
                                    }}
                                  >
                                    <CloseIcon size={18} />
                                  </button>
                                </div>
                              )
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
                          options={newOptions}
                          onSubmit={handleSelectSpecialist}
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
                          value={values.experience || ""}
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
                    className="py-2 px-3 w-36 flex justify-center bg-red text-white text-sm rounded-lg"
                    href="/admin/doctor"
                  >
                    Back
                  </a>
                  <button
                    // disabled={isSubmitting ? true : false}
                    className="py-2 px-3 w-36 bg-primary text-white text-sm rounded-lg"
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Create"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>

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
