"use client";

import ColumnStatus from "@/components/status/status";
import { DateFormat } from "@/helps/dateFormat";
import { IPatienTypes } from "@/interfaces/patients";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import PatientTransaction from "./transaction";
import PatientBank from "./bank";
import { useFetchTransaction } from "@/lib/transaction/useFetchTransaction";
import { PreviousLinkIcon } from "@/components/icons/icons";
import { CalculatorAge } from "@/helps/calculatorAge";

interface IPatientDetailTypeProps {
  id?: string;
}
export default function DetailsPatient({ id }: IPatientDetailTypeProps) {
  const router = useRouter();
  const [tabs, setTabs] = React.useState<string>("transaction");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [patienDetail, setPatienDetail] = React.useState<IPatienTypes | null>(
    null
  );
  const { data: trnaction, loading, error, total } = useFetchTransaction(id);

  React.useEffect(() => {
    const data = params.get("data");
    if (data) {
      setPatienDetail(JSON.parse(decodeURIComponent(data)));
    } else {
      router.push("/admin/patiens");
    }
  }, [router]);

  const listTabs = [
    {
      title: "transaction",
    },
    { title: "appointment" },
    { title: "comments" },
    { title: "banks" },
  ];

  return (
    <>
      <div className="py-2">
        <p className="text-base text-gray700">Patient details</p>
        <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="lg:col-span-1 col-span-3 border border-gray300 rounded-sm my-3 py-5 px-4">
            <p className="text-base text-gray700">Patient personal:</p>
            <div className="flex justify-start my-5">
              <Image
                src={"/images/user/sua.jpg"}
                width="150"
                height="150"
                alt={patienDetail?.profile || ""}
                className="rounded-lg"
              />
            </div>
            <div className="flex gap-8">
              <div>
                <p className="mt-2 lg:text-base text-sm">Name:</p>
                <p className="mt-2 lg:text-base text-sm">Birthday:</p>
                <p className="mt-2 lg:text-base text-sm">Age:</p>
                <p className="mt-2 lg:text-base text-sm">Phone number:</p>
                <p className="mt-2 lg:text-base text-sm">Email:</p>
                <p className="mt-2 lg:text-base text-sm">Gener:</p>
                <p className="mt-2 lg:text-base text-sm">Phone number:</p>
                <p className="mt-2 lg:text-base text-sm">Created:</p>
                <p className="mt-2 lg:text-base text-sm">Balance:</p>
                <p className="mt-2 lg:text-base text-sm">Role:</p>
                <p className="mt-2 lg:text-base text-sm">Address:</p>
                <p className="text-sm">Status:</p>
              </div>
              <div>
                <p className="mt-2 lg:text-base text-sm">
                  {patienDetail?.firstName
                    ? `${patienDetail?.firstName} ${patienDetail?.lastName}`
                    : "Loading.."}
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  {DateFormat(patienDetail?.dob)} 
                </p>
                <p className="mt-2 lg:text-base text-sm">
                  {CalculatorAge(patienDetail?.dob)} year old
                </p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.phone}</p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.email}</p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.gender}</p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.phone}</p>
                <p className="mt-2 lg:text-base text-sm">
                  {DateFormat(patienDetail?.createdAt)}
                </p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.balance}</p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.role}</p>
                <p className="mt-2 lg:text-base text-sm">{patienDetail?.address}</p>
                  
                <div className="py-3">
                <ColumnStatus status={patienDetail?.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-3 border border-gray300 rounded-sm my-3 p-2">
            <p className="text-base text-gray700">Activity</p>
            <div className="flex flex-nowrap gap-2 my-5 px-2 overflow-auto">
              {listTabs.map((item, index: number) => (
                <ul
                  key={index}
                  className={`  ${
                    item.title == tabs
                      ? "text-primary bg-primary/20"
                      : "text-gray700 bg-white"
                  } cursor-pointer border border-1 border-gray300 flex items-center capitalize justify-center rounded-full w-max py-1 px-4`}
                  onClick={(e) => setTabs(item.title)}
                >
                  <span
                    className={`w-2 h-2 me-1 ${
                      item.title == tabs ? "bg-primary" : "bg-gray700"
                    } rounded-full`}
                  />
                  {item.title}
                </ul>
              ))}
            </div>
            <div className="px-2">
              {id &&
                (() => {
                  switch (tabs) {
                    case "transaction":
                      return <PatientTransaction data={trnaction} />;
                    case "banks":
                      return <PatientBank data={patienDetail?.banks} />;
                    default:
                      return null;
                  }
                })()}
            </div>
          </div>
        </div>
        <a
          className="py-2 px-3 bg-red400 text-white w-32 flex items-center justify-center text-sm rounded-lg"
          href="/admin/patients"
        >
          <PreviousLinkIcon size={20} /> Back
        </a>
      </div>
    </>
  );
}
