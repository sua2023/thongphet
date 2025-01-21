"use client";

import React from "react";
import AllDoctors from "./allDoctor";
import DoctorAppointments from "./appointments";
import Profile from "./profile";
import DoctorReviews from "./reviews";
import ScheduleTable from "./scheduleTable";
import useFilter from "@/lib/useFiltter";
import { useFetchDoctor, useFetchDoctors } from "@/lib/doctor/useFetchDoctor";
import { DoctorTabs } from "@/components/doctor/doctorTab";
import { useParams } from "next/navigation";
import ChangeDoctorPassword from "./changePassword";
import DoctorPatient from "./doctorPatient";

export default function MainDoctor() {
  const params = useParams();
  const { id } = params;
  const userId = Array.isArray(id) ? id[0] : id;
  const [tabs, setTabs] = React.useState<string>("Schedule");
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, loading, error, refresh } = useFetchDoctor(userId);

  return (
    <>
      <div className="text-sm font-medium text-gray700">
        <h2 className="lg:text-lg text-base font-bold ml-3 lg:ml:-0">
          Doctor Information
        </h2>
        <ul className="flex mt-2 overflow-x-auto border-b-2 border-b-gray">
          {DoctorTabs.map((tab) => (
            <li
              key={tab}
              className={`inline-block cursor-pointer p-4 ${
                tabs == tab ? "border-b-2 border-primary" : ""
              } rounded-t-lg hover:text-gray-600 hover:border-gray-300`}
              onClick={() => setTabs(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          {(() => {
            switch (tabs) {
              case "Profile":
                return data && <Profile data={data} />;
              case "Review":
                return <DoctorReviews />;
              case "Patients":
                return <DoctorPatient />;
              case "Schedule":
                return <ScheduleTable userId={userId} />;
              case "Appointments":
                return <DoctorAppointments />;
              case "ChangePassord":
                return data && <ChangeDoctorPassword userId={userId} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </>
  );
}
