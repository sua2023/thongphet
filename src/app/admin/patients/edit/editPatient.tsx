"use client";

import { EyeFillIcon, EyeVisibleIcon } from "@/components/icons/icons";
import Select from "@/components/select";
import { IPatienTypes } from "@/interfaces/patients";
import useApi from "@/lib/useApi";
import { useToast } from "@/lib/useToast";
import { setData } from "@/redux/features/patientSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditPatient() {
  const router = useRouter();
  const api = useApi();
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState<string>("");
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [patientStatus, setPatientStatus] = React.useState<string>("");
  const patientData = useSelector((state: RootState) => state.patient.data);
  const { successPromiseMessage, successMessage } = useToast();
  const options: { value: string; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "deleted", label: "Deleted" },
    { value: "locked", label: "Locked" },
    { value: "blocked", label: "Blocked" },
  ];

  React.useEffect(() => {
    if (!patientData) {
      router.push("/admin/patients");
    }
  }, [router, patientData]);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleChangeStatus = async () => {
    try {
      const result = await api({
        url: `patients/${patientData?.id}/account`,
        params: { status: patientData?.status },
        method: "PUT",
      });
      if (result.status == 200) {
        successPromiseMessage("Change patient status success", 2000);
      }
    } catch (error) {
      successMessage("Change failed", 2000);
    }
  };
  return (
    <>
      <div className="mt-5">
        <h2 className="text-medium">Edit patient information</h2>
        <div className="mt-5 shadow-sm flex p-3 text-sm text-pink800 rounded-lg border border-pink100 bg-yellow50">
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">
              Ensure that these requirements are met:
            </span>
            <ul className="mt-1.5 list-disc list-inside">
              <li>The patient must have an active status to use okardCare</li>
              <li>If not necessary don't change any data </li>
            </ul>
          </div>
        </div>

        <div className="py-2">
          <div className="mt-5 p-3 rounded-md bg-white border border-gray">
            <p className="text-sm py-1">
              Patient: {`${patientData?.firstName} ${patientData?.lastName}`}
            </p>
            <p className="text-sm py-1">Email: {patientData?.email}</p>
            <div className="lg:mb-2 mt-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray700"
              >
                Status
              </label>
              <Select
                options={options}
                value={patientData?.status}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setPatientStatus(selectedOption);
                    dispatch(
                      setData({
                        ...patientData,
                        status: selectedOption,
                      })
                    );
                  }
                }}
              />
            </div>

            <div className="flex gap-2 mt-5 mb-2">
              <a
                className="py-2 px-3 bg-red text-white text-sm rounded-lg"
                href="/admin/patients"
              >
                Back
              </a>
              <button
                className="py-2 px-3 bg-primary text-white text-sm rounded-lg"
                type="button"
                onClick={handleChangeStatus}
              >
                Change status
              </button>
            </div>
          </div>

          <div className="my-2 p-3 rounded-md bg-white border border-gray">
            <p className="text-sm lg:mb-5 mb-3">Change password</p>
            <div className="lg:mb-2 mb-2 relative">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray700"
              >
                Passowrd <span className="text-red">*</span>
              </label>
              <input
                type={isVisible ? "text" : "password"}
                placeholder="*******"
                id="base-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex gap-2 mt-5 mb-2">
              <a
                className="py-2 px-3 bg-red text-white text-sm rounded-lg"
                href="/admin/patients"
              >
                Back
              </a>
              <button
                className="py-2 px-3 bg-primary text-white text-sm rounded-lg"
                type="submit"
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
