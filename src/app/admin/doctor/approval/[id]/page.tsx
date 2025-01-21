"use client";
import {
  CallIcon,
  CheckCircleIcon,
  CommentIcon,
  DoneIcon,
  MapIcon,
  NextLinkIcon,
  PreviousLinkIcon,
  SendIcon,
} from "@/components/icons/icons";
import { ApprovalDoctorEnum } from "@/enum/doctor.enum";
import { CalculatorAge } from "@/helps/calculatorAge";
import { useFetchCheckList, useFetchDoctor } from "@/lib/doctor/useFetchDoctor";
import { useFetchSpecialistByDoctorId } from "@/lib/expertise/useFetchExpertise";
import useApi from "@/lib/useApi";
import { useCreate, useEdit } from "@/lib/useCreate";
import useOutside from "@/lib/useOutside";
import { useToast } from "@/lib/useToast";
import {
  clearState,
  setApprovalStatus,
  setDescription,
  updateStepData,
} from "@/redux/features/approvalDoctorSlice";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorPersonal from "../doctorPersonal";
import DoctorEducation from "../education";
import DoctorExperience from "../experience";
import DoctorExpertise from "../expertise";
import Identity from "../identity";
import Loader from "@/components/loader";
const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: false,
});

export default function ApprovalPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const userId = Array.isArray(id) ? id[0] : id;
  const dispatch = useDispatch();
  const callApi = useApi();
  const { data, error, loading, refresh } = useFetchDoctor(userId);
  const [comment, setComment] = React.useState<string>("");
  const { data: checkLists } = useFetchCheckList(userId);
  const { data: doctorSpecialist } = useFetchSpecialistByDoctorId(userId);
  const stepData = useSelector((state: RootState) => state.approval);
  const [doctorStep, setDoctorStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState({
    step: 0,
    submit: false,
  });
  const ref = useRef(null);
  const { createForever } = useCreate();
  const { editForever } = useEdit();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { successPromiseMessage, errorMessage } = useToast();
  useOutside({ ref, setIsFocused: setIsOpen });

  React.useEffect(() => {
    if (!data) {
      dispatch(clearState());
    }
    if (data) {
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    }
  }, [data, dispatch]);

  React.useEffect(() => {
    if (Array.isArray(checkLists) && checkLists.length > 0) {
      checkLists.forEach((checkListItem) => {
        setComment(
          doctorStep === stepData.stepData[doctorStep - 1].step
            ? checkListItem?.description
            : ""
        );
        dispatch(
          updateStepData({
            id: checkListItem.id,
            stages: checkListItem.stages,
            status: checkListItem.status,
            description: checkListItem.description,
          })
        );
      });
    }
  }, [checkLists, dispatch]);

  const handleApprove = async (status: string) => {
    setIsSubmitting((prev) => ({ ...prev, step: 6, submit: true }));
    try {
      const url = `doc-checklists/${userId}/${status}`;
      const result = await callApi({ url: url, params: "", method: "PUT" });
      if (result?.status == 200) {
        successPromiseMessage("Verify appprove doctor success", 2000);
        setTimeout(() => {
          setIsSubmitting((prev) => ({ ...prev, step: 0, submit: false }));
          router.push("/admin/doctor");
        }, 2000);
      }
    } catch (error) {
      setIsSubmitting((prev) => ({ ...prev, step: 0, submit: false }));
      errorMessage("Approve failed.", 2000);
    }
  };

  const handleComplete = async (status: ApprovalDoctorEnum) => {
    const newData = stepData.stepData[doctorStep - 1];
    const url = `doc-checklists/${newData.id}`;
    const stages = { stages: newData.stages, status };

    const result = await editForever(url, stages);
    if (result?.status == 200) {
      dispatch(
        setApprovalStatus({
          stepNumber: doctorStep,
          status: status,
        })
      );
    }
  };

  const handleComment = async () => {
    try {
      const newData = stepData.stepData[doctorStep - 1];
      const url = `doc-checklists/${newData.id}`;
      const stages = { description: comment };

      const result = await editForever(url, stages);

      if (result?.status == 200) {
        successPromiseMessage("Comment success", 2000);
        dispatch(
          setDescription({
            step: doctorStep,
            message: comment,
          })
        );
      } else if (result?.status == 409) {
        errorMessage(
          "The approval step has been verified and is now complete.",
          2000
        );
      }
    } catch (error) {
      errorMessage(
        "The approval step has been verified and is now complete.",
        2000
      );
    }
  };

  const verifyComplete = (isSubmitting: { step: number; submit: boolean }) => {
    const allApproved = stepData?.stepData.every(
      (step) => step.status === "approved"
    );

    if (allApproved) {
      return isSubmitting.step === 6 && isSubmitting.submit
        ? "Submiting..."
        : "Verify approve";
    }
    return null;
  };

  return (
    <Layout>
      <div className="px-4 py-2 text-base text-center">Approval doctor</div>
      <div className="m-2">
        <div className="lg:p-5 py-5 rounded-md">
          <div className="flex justify-center lg:gap-8 gap-2 lg:mt-5 mt-2">
            <div className="border rounded-lg lg:size-62 md:size-62 size-40">
              <div className="flex items-center justify-center h-full">
                {isLoading ? (
                  <Loader />
                ) : (
                  <Image
                    src={data?.profile ?? ""}
                    width={100}
                    height={100}
                    alt={data?.firstName ?? ""}
                    className="object-contain p-2 lg:size-62 size-40 rounded-md transition-all duration-300"
                    onLoadingComplete={() => {
                      setIsLoading(false);
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-base text-bold lg:mt-2">
                {`${data?.firstName}  ${data?.lastName}`}
              </p>

              <div className="mt-3">
                <p className="mt-2 lg:text-base text-sm">{data?.email}</p>
                <p className="mt-2 lg:text-base text-sm">
                  <strong>Age:</strong> {CalculatorAge(data?.dob)} year old
                </p>
                <div className="mt-3">
                  <p className="flex gap-5">
                    <MapIcon size={18} color="#059669" />
                    {data?.address1}
                  </p>
                  <p className="flex gap-5 mt-2">
                    <CallIcon size={18} color="#059669" />
                    {data?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 overflow-auto ">
            <ol className="flex items-center lg:justify-center justify-start w-full py-4 space-x-5 text-sm font-medium text-center text-gray700 bg-white">
              {stepData?.stepData?.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-5 ${
                    doctorStep === step.step ? "text-primary" : "text-gray700"
                  } cursor-pointer`}
                  onClick={() => {
                    setDoctorStep(step.step);
                    setComment(step?.description || "");
                  }}
                >
                  <span
                    className={`flex items-center justify-center size-8 me-2 text-xs rounded-full border-2 ${
                      step.status === ApprovalDoctorEnum.REJECTED
                        ? "bg-red border-red text-white"
                        : "bg-transparent"
                    }  ${
                      doctorStep === step.step
                        ? "border-primary"
                        : "border-gray700"
                    }`}
                  >
                    {step.status === ApprovalDoctorEnum.APPROVED ? (
                      <CheckCircleIcon size={46} color="#009b91" />
                    ) : (
                      step.step
                    )}
                  </span>
                  {step.label}
                  {index < stepData?.stepData?.length - 1 && (
                    <NextLinkIcon size={26} />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex justify-center py-5">
            <div className="lg:w-[80%] w-full lg:mx-2 mx-0 shadow-custom rounded-md">
              <div className="mt-5 flex items-center overflow-auto my-8 lg:mx-8 mx-2">
                {doctorStep == 1
                  ? data && <DoctorPersonal data={data} />
                  : doctorStep == 2
                  ? data && <Identity data={data} />
                  : doctorStep == 3
                  ? data && <DoctorEducation data={data} />
                  : doctorStep == 4
                  ? data && (
                      <DoctorExpertise
                        data={data}
                        doctorSpecialist={doctorSpecialist}
                      />
                    )
                  : data && <DoctorExperience data={data} />}
              </div>
              <div className="mt-5 lg:mx-8 mx-2 pb-2">
                <div className="flex justify-between">
                  <div className="lg:flex lg:gap-4 hidden gap-1 py-2">
                    <button
                      className={`lg:flex items-center hidden py-2 px-3 rounded-full border ${
                        doctorStep == 1
                          ? "border-gray300"
                          : "border-primary hover:bg-primary hover:text-white"
                      } text-gray700  `}
                      onClick={() => {
                        if (doctorStep !== 1) {
                          setDoctorStep(doctorStep - 1);
                        }
                      }}
                    >
                      {doctorStep !== 1 && <PreviousLinkIcon size={24} />}
                      <span className="hidden lg:inline-block">Prev</span>
                    </button>
                    <button
                      className={`py-2 px-3 lg:flex hidden items-center rounded-full ${
                        doctorStep == 5
                          ? "bg-transparent text-gray700 border border-gray300"
                          : "bg-primary text-white hover:bg-primary/80"
                      }  `}
                      onClick={() => {
                        if (doctorStep < 5) {
                          setDoctorStep(doctorStep + 1);
                        }
                      }}
                    >
                      <span className="hidden lg:inline-block">Next</span>
                      {doctorStep !== 5 && <NextLinkIcon size={24} />}
                    </button>
                  </div>
                  <div className="flex gap-4 py- ml-2">
                    {stepData?.stepData.map((step) => {
                      if (step.step == doctorStep) {
                        const allStepsApproved = stepData?.stepData?.every(
                          (step) => step.status === "approved"
                        );
                        console.log(allStepsApproved);

                        return (
                          <div key={step.step}>
                            {allStepsApproved && (
                              <button
                                type="button"
                                className="text-white mx-2 gap-1 bg-primary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                onClick={() => handleApprove("approve")}
                              >
                                {verifyComplete(isSubmitting)}
                              </button>
                            )}

                            <button
                              disabled={
                                step.status === ApprovalDoctorEnum.APPROVED
                                  ? true
                                  : false
                              }
                              className={`py-2 px-3 rounded-full border ${
                                step.status === ApprovalDoctorEnum.REJECTED
                                  ? "bg-red text-white"
                                  : "bg-transparent"
                              } border-red text-gray700 hover:bg-red hover:text-white ${
                                step.status === ApprovalDoctorEnum.APPROVED
                                  ? "hidden"
                                  : ""
                              }`}
                              onClick={() => {
                                handleComplete(ApprovalDoctorEnum.REJECTED);
                                if (doctorStep < 5) {
                                  setDoctorStep(doctorStep + 1);
                                }
                              }}
                            >
                              {step.status === ApprovalDoctorEnum.REJECTED
                                ? "Rejected"
                                : "Reject"}
                            </button>

                            {step.status === ApprovalDoctorEnum.APPROVED &&
                            !allStepsApproved ? (
                              <button
                                type="button"
                                disabled={
                                  step.status === ApprovalDoctorEnum.APPROVED
                                    ? true
                                    : false
                                }
                                className="text-white ml-2 gap-1 bg-primary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                              >
                                <p>Pass</p>
                                <DoneIcon size={20} />
                              </button>
                            ) : !allStepsApproved ? (
                              <button
                                className="py-2 px-3 ml-2 rounded-full border border-primary text-gray700 hover:bg-primary hover:text-white"
                                onClick={() => {
                                  handleComplete(ApprovalDoctorEnum.APPROVED);
                                  if (doctorStep < 5) {
                                    setDoctorStep(doctorStep + 1);
                                  }
                                }}
                              >
                                Complete
                              </button>
                            ) : null}
                          </div>
                        );
                      }
                    })}

                    <div className="relative group" ref={ref}>
                      <button
                        type="button"
                        className="text-primary border border-primary hover:bg-primary hover:text-white focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                        onClick={() => setIsOpen(true)}
                      >
                        <CommentIcon size={20} />
                      </button>
                      {comment && (
                        <div className="absolute top-[-8px] left-6 bg-red size-5 flex justify-center items-center rounded-full">
                          <span className="text-sm text-white">{1}</span>
                        </div>
                      )}
                      <div
                        className={`absolute lg:bottom-16 lg:right-[-10rem] bottom-12 right-[-2rem] p-4 bg-white shadow-custom lg:w-[30vw] w-[16rem] h-96 rounded-lg ${
                          isOpen
                            ? "opacity-100 visible transition-opacity duration-300"
                            : "opacity-0 invisible"
                        } group-hover:opacity-100 group-hover:visible`}
                      >
                        <div className="py-5">
                          <textarea
                            id="chat"
                            rows={10}
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            className="block p-2.5 w-full text-sm text-gray700 bg-white rounded-lg border border-gray300 focus:ring-primary focus:border-primary"
                            placeholder="Message..."
                          />

                          <button
                            type="submit"
                            className="inline-flex mt-2 justify-center p-2 text-primary rounded-full cursor-pointer hover:bg-gray bg-blue-100"
                            onClick={() => handleComment()}
                          >
                            <SendIcon size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
