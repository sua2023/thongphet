"use client";

import useAuth from "@/app/context/useAuth";
import { useEdit } from "@/lib/useCreate";
import { useToast } from "@/lib/useToast";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";

export default function TwoFAEnabled() {
  const { editForever } = useEdit();
  const { errorMessage, successMessage } = useToast();
  const [code, setCode] = React.useState("");
  const [isErrorCode, setIsErrorCode] = React.useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = React.useState(false);
  const { user, refreshUserData } = useAuth();
  const [isChecked, setIsChecked] = React.useState(false);
  const [enabledTwoFA, setEnabledTwoFA] = React.useState({
    qrCodeDataUrl: "",
    secret: "",
  });


  React.useEffect(() => {
    if (user) {
      setIsTwoFactorEnabled(user?.isTwoFactorEnabled);
    }
  }, [user]);
  
  const handleEnableTwoFa = async () => {
    try {
      const enabledTwoFA = await editForever("users/2fa/enable", {});
      if (enabledTwoFA?.status == 200) {
        setEnabledTwoFA({
          qrCodeDataUrl: enabledTwoFA?.data?.qrCodeDataUrl,
          secret: enabledTwoFA?.data?.secret,
        });
        setIsChecked(true);
        const newUser = {
          ...user,
          isTwoFactorEnabled: true,
          twoFactorSecret: enabledTwoFA?.data?.qrCodeDataUrl,
        };
        setIsTwoFactorEnabled(newUser.isTwoFactorEnabled);
        Cookies.set("user", JSON.stringify(newUser));
        setTimeout(() => {
          refreshUserData();
        }, 100);
        successMessage("Enable authenticator success", 2000);
      } else {
        errorMessage("Enable two fa failed", 2000);
      }
    } catch (error) {
      errorMessage("Something wrong", 2000);
    }
  };

  const handleDisableTwoFa = async () => {
    try {
      const verifyTwoFa = await editForever(`users/2fa/disable`, {});
      if (verifyTwoFa?.status == 200) {
        successMessage("Disabled authenticator success", 2000);
        setIsChecked(false);
        const newUser = {
          ...user,
          isTwoFactorEnabled: false,
          twoFactorSecret: "",
        };
        setIsTwoFactorEnabled(newUser.isTwoFactorEnabled);
        Cookies.set("user", JSON.stringify(newUser));
        setTimeout(() => {
          refreshUserData();
        }, 100);
      } else {
        errorMessage("Disabled authenticator failed", 2000);
      }
    } catch (error) {
      errorMessage("Something wrong", 2000);
    }
  };
  return (
    <div className="flex justify-center mx-5 lg:mt-10 mt-5 text-sm text-gray700">
      <div className="w-full mt-5">
        <p className="text-base">
          Two-Factor Authentication, or 2FA, adds an extra layer of security to
          your account. Instead of just entering a password to log in.
        </p>
        <ol className="space-y-4 text-gray700 list-decimal list-inside">
          <li>
            How to use:
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                After entering your password, you’ll be prompted to enter a
                unique code.
              </li>
              <li>
                This code is generated by an app (like Google Authenticator) or
                sent to your device.
              </li>
              <li>
                Each code is temporary, usually expiring within 30-60 seconds.
              </li>
            </ul>
          </li>
        </ol>
        <div className="mt-5">
          <label className="inline-flex items-center text-sm mb-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onClick={(e) => {
                if (isTwoFactorEnabled) {
                  handleDisableTwoFa();
                } else {
                  handleEnableTwoFa();
                }
              }}
            />

            <div
              className={`relative w-9 h-5 cursor-pointer ${
                isChecked || isTwoFactorEnabled ? `bg-primary` : "bg-gray"
              } rounded-full transition-colors`}
            >
              <div
                className={`absolute top-[2px] left-[2px] h-4 w-4 bg-white border border-gray300 rounded-full transition-all ${
                  isChecked || isTwoFactorEnabled
                    ? "translate-x-full border-white"
                    : ""
                }`}
              ></div>
            </div>
            <span className="ms-3 text-sm font-medium text-gray700">
              {isTwoFactorEnabled ? "Disabled 2FA" : "Enable 2FA"}
            </span>
          </label>
        </div>
        {(isChecked || isTwoFactorEnabled) && (
          <div className="mt-5">
            <p className="text-lg">Enable multi-factor authentication</p>
            <div className="lg:flex gap-5 block mt-5">
              <div className="size-56">
                <Image
                  src={
                    enabledTwoFA.qrCodeDataUrl || user?.twoFactorSecret || ""
                  }
                  alt="qrcode"
                  width={200}
                  height={200}
                />
              </div>
              <div className="lg:w-[50%] w-full mt-2">
                <p className="text-gray500 text-base font-bold">
                  Scan this QR code
                </p>
                <p className="text-sm my-3">
                  Use any Authenticator app that supports time-based, one-time
                  password (TOTP) such Google Authenticator or Microsoft
                  Authenticator.
                </p>

                <a
                  href={enabledTwoFA.qrCodeDataUrl}
                  download="qrcode.png"
                  className="mt-5 py-2 px-4 border text-gray700 border-primary hover:bg-primary hover:text-white text-sm rounded-lg"
                >
                  Download QR Code
                </a>
                {/* <div className="mt-5">
                  <label
                    htmlFor="base-input"
                    className="block mb-1 text-sm font-medium text-gray700"
                  >
                    Code<span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentPassword"
                    required
                    placeholder="Code"
                    id="base-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <button
                    className="my-5 py-2 px-6 bg-primary text-white text-sm rounded-lg"
                    type="button"
                    onClick={handleVerifyTwoFa}
                    disabled={user?.isTwoFactorEnabled}
                  >
                    Verify now
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
