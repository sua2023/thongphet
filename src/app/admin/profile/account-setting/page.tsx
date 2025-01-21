"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChangePasswrod from "../changePassword";
import TwoFAEnabled from "../twoFA";
const Layout = dynamic(() => import("@/components/Layout"));

export default function AccountSetting() {
  const [tabs, setTabs] = React.useState("Change password");
  const listTabs = [
    { title: "Change password" },
    {
      title: "Enable 2FA",
    },
  ];
  return (
    <Layout>
      <div>
        <div className="lg:col-span-2 col-span-3 border border-gray300 rounded-sm my-3 p-2">
          <p className="text-base text-gray700">Setting account</p>
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
            {(() => {
              switch (tabs) {
                case "Change password":
                  return <ChangePasswrod />;
                case "Enable 2FA":
                  return <TwoFAEnabled />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
