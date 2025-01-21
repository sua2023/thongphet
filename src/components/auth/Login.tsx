"use client";

import useAuth from "@/app/context/useAuth";
import { useFormik } from "formik";
import Image from "next/image";
import FormModal from "../modal/formModal";
import React from "react";
import { useToast } from "@/lib/useToast";

export default function LoginForm() {
  const { login, twoFa, verify2fa } = useAuth();

  const [isOpen, setIsOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { successMessage, errorMessage } = useToast();

  const handleClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    setIsOpen(twoFa);
  }, [twoFa]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      await login(values.email, values.password);
      if (values.email && values.password && twoFa) {
        setIsOpen(true);
      }
    },
  });

  const handleVerifyTwoFA = async () => {
    await verify2fa(code);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-white">
      <div className="flex justify-between items-center w-[calc(100vw)] lg:h-[80vh] h-[100vh] lg:w-[80%] bg-white gap-5 shadow-2xl rounded-lg">
        <Image
          src="/images/calling_doctor.jpg"
          width={500}
          height={200}
          alt="Calling Doctor"
          priority
          className="lg:block hidden size-full object-cover rounded-l-lg"
          style={{ height: "80vh" }}
        />
        <div className="w-full flex justify-center items-center">
          <div className="lg:py-10 lg:px-5 lg:w-[70%] w-[80%] rounded-md">
            <form className="space-y-6 p-4 mt-4" onSubmit={formik.handleSubmit}>
              <h5 className="text-xl text-center font-medium text-gray700">
                Sign in
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray900"
                >
                  Your email <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray100 border border-gray300 text-gray700 text-sm rounded-md focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray900"
                >
                  Your password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray100 border border-gray300 text-gray700 text-sm rounded-md focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
              >
                {formik.isSubmitting ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline size-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FormModal isOpen={isOpen} onClose={handleClose} hideClose={true}>
        <div className="w-full text-start">
          <p className="my-2">Verify authenticator code</p>
          <label
            htmlFor="password"
            className="block mb-2 mt-5 text-sm font-medium text-gray900"
          >
            Enter code <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="code"
            id="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="code"
            className="bg-gray100 border border-gray300 text-gray700 text-sm rounded-md focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5"
            required
          />
          <div className="mt-6 mb-2">
            <button
              type="button"
              onClick={handleVerifyTwoFA}
              className="w-full text-white bg-primary hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
            >
              {false ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline size-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                "Verify now"
              )}
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
