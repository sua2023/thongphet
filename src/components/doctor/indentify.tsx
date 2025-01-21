import { formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { IdentifyTypeOption } from "@/helps/generalOption";
import { IDoctorEditTypes } from "@/interfaces";
import { FormikErrors } from "formik";
import Image from "next/image";
import React from "react";
import { UploadIcon } from "../icons/icons";
import Select from "../select";

interface IDentifyPropType {
  values: IDoctorEditTypes;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
}

export default function Identify(props: IDentifyPropType) {
  const { values, handleChange, setFieldValue } = props;

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    action: string
  ) => {
    const file = event.target?.files?.[0] || null;
    if (file) {
      setFieldValue(
        action === "front" ? "identifyFront" : "identifyBack",
        file
      );
    }
  };
  return (
    <div>
      <div className="mb-5">
        <label
          htmlFor="base-input"
          className="block  text-sm font-medium text-gray700"
        >
          Card type <span className="text-red">*</span>
        </label>
        <Select
          options={IdentifyTypeOption}
          value={values.documentType || ""}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setFieldValue("documentType", selectedOption);
            }
          }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input"
          className="block  text-sm font-medium text-gray700"
        >
          Card number <span className="text-red">*</span>
        </label>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card number"
          value={values.cardNumber || ""}
          onChange={handleChange}
          id="base-input"
          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input"
          className="block  text-sm font-medium text-gray700"
        >
          Created date <span className="text-red">*</span>
        </label>
        <input
          type="date"
          name="issueDate"
          placeholder="Created date"
          id="base-input"
          value={formatDateToYYYYMMDD(values.issueDate)}
          onChange={handleChange}
          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="base-input"
          className="block  text-sm font-medium text-gray700"
        >
          Expired date <span className="text-red">*</span>
        </label>
        <input
          type="date"
          name="expiryDate"
          placeholder="Expired date"
          id="base-input"
          value={formatDateToYYYYMMDD(values.expiryDate)}
          onChange={handleChange}
          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
        />
        <div className="lg:flex md:flex gap-5">
          <div className="flex items-center">
            <div>
              <p className="mt-5">Card font:</p>
              <label className="flex flex-col items-center justify-center size-56 border-2 border-gray300 border-dashed rounded-lg cursor-pointer bg-white">
                {values?.identifyFront ? (
                  <Image
                    src={
                      values?.identifyFront instanceof File
                        ? URL?.createObjectURL(values?.identifyFront)
                        : values?.identifyFront
                    }
                    alt={values?.identifyFront?.name || "image"}
                    className="rounded object-contain p-2 size-56"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon size={40} />
                    <p className="mb-2 text-sm text-gray500">
                      <span className="font-semibold">Upload</span>
                    </p>
                    <p className="text-xs m-2 text-gray500">PNG, JPG or JPEG</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFileUpload(e, "front");
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <p className="mt-5">Card Back:</p>
              <label className="flex flex-col items-center justify-center size-56 border-2 border-gray300 border-dashed rounded-lg cursor-pointer bg-white">
                {values.identifyBack ? (
                  <Image
                    src={
                      values?.identifyBack instanceof File
                        ? URL?.createObjectURL(values?.identifyBack)
                        : values?.identifyBack
                    }
                    alt={values?.identifyBack?.name || "image"}
                    className="rounded object-contain p-2 size-56"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon size={40} />
                    <p className="mb-2 text-sm text-gray500">
                      <span className="font-semibold">Upload</span>
                    </p>
                    <p className="text-xs m-2 text-gray500">PNG, JPG or JPEG</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFileUpload(e, "back");
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
