"use client";
import Checkbox from "@/components/checkbox";
import { CallIcon, MapIcon } from "@/components/icons/icons";
import { CalculatorAge } from "@/helps/calculatorAge";
import { DateFormat } from "@/helps/dateFormat";
import { IDoctorTypes } from "@/interfaces";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface IDoctorProps {
  data: IDoctorTypes;
}
export default function DoctorPersonal({ data }: IDoctorProps) {
  const dispatch = useDispatch();
  const stepData = useSelector((state: RootState) => state.approval);
  const handleCheckboxChange = (step: number, isChecked: boolean) => {};

  return (
    <>
      <div className="w-full overflow-auto">
        <div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray300 border-0" />
            <h6 className="text-lg text-bold absolute px-3 text-gray700 -translate-x-1/2 bg-white left-1/2">
              Personal:
            </h6>
          </div>
          <div className="pt-2">
            <div className="flex gap-5">
              <div>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Firstname:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Lastname:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Email:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Gender:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Birthday:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Age:</strong>
                </p>
              
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Address:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Register date:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Created by:</strong>
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Bio:</strong>
                </p>
              </div>
              <div>
                <p className="mt-2 lg:text-base text-sm">{data?.firstName}</p>
                <p className="mt-2 lg:text-base text-sm">{data?.lastName}</p>
                <p className="mt-2 lg:text-base text-sm">{data?.email}</p>
                <p className="mt-2 lg:text-base text-sm">{data?.gender}</p>
                <p className="mt-2 lg:text-base text-sm">
                  {DateFormat(data?.dob)}
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  {CalculatorAge(data?.dob)} year old
                </p>
                <p className="mt-2 lg:text-base text-sm">{data?.address1}</p>
                <p className="mt-2 lg:text-base text-sm">
                  {DateFormat(data?.createdAt)}
                </p>
                <p className="mt-2 lg:text-base text-sm">{data?.createdBy}</p>
                <p className="mt-2 lg:text-base text-sm">{data?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
