"use client";
import FormCreateDoctor from "@/components/doctor/formCreate";
import { formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { Doctoroptions } from "@/helps/doctorOption";
import { IDoctorCreateTypes, IEducationTypes } from "@/interfaces";
import { useCreateDoctor } from "@/lib/doctor/useDoctorCreate";
import { useCreateExpertise } from "@/lib/expertise/useCreateExpertise";
import useApi from "@/lib/useApi";
import { useCreate } from "@/lib/useCreate";
import {
  useUploadProfile,
  useUploadCertificate,
} from "@/lib/users/useUploadProfile";
import { useToast } from "@/lib/useToast";
import { clearCombobox } from "@/redux/features/combobox";
import { clearEducation, clearExpertise } from "@/redux/features/eventSlice";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: false,
});

const currentYear = new Date().getFullYear();
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Email address is invalid")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .min(8, "Phone must be exactly 8 characters"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid gender selection"),
  dob: Yup.string().required("Birthday is required"),
  password: Yup.string().min(8, "Password must be 8 characters"),
  categories: Yup.array()
    .of(Yup.string())
    .required("Categories are required")
    .min(1, "At least one category is required"),
});

const initialValues: IDoctorCreateTypes = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  address1: "",
  dob: null,
  profile: null,
  gender: "",
  balance: "",
  bio: "",
  experience: "",
  documentType: "",
  cardNumber: "",
  issueDate: null,
  expiryDate: null,
  hospital: "",
  identifyFront: null,
  identifyBack: null,
  categories: [],
  educations: [
    {
      from: null,
      to: null,
      university: "",
      degree: "",
    },
  ],
};

export default function CreateDoctorPage() {
  const { errorMessage, successPromiseMessage } = useToast();
  const api = useApi();
  const dispatch = useDispatch();
  const { createDoctor } = useCreateDoctor();
  const { createExpertise } = useCreateExpertise();
  const upload = useUploadProfile();
  const uploadDoc = useUploadCertificate();
  const { createForever } = useCreate();

  const { comboboxValue } = useSelector((state: RootState) => state.combobox);
  const { isOpen, dataEvents, status } = useSelector(
    (state: RootState) => state.dialog
  );

  const handleUploadCertificate = async (
    doctorId: string,
    certificate: any[] | undefined
  ) => {
    if (!certificate || certificate == null) {
      return;
    }

    for (const education of certificate) {
      const createdEdu = await handleCreatedEducation(doctorId, education);
      if (createdEdu?.status === 201) {
        await uploadCertificates(
          createdEdu?.data?.id,
          education.certificates?.images
        );
      }
    }
  };

  const uploadCertificates = async (
    educationId: string,
    certificates: any[]
  ) => {
    if (Array.isArray(certificates)) {
      for (const cert of certificates) {
        const url = "certificates";

        const result = await uploadDoc.uploadCertificate(
          educationId,
          url,
          cert
        );

        if (result?.status !== 200) {
          errorMessage("Upload certificate failed", 2000);
        }
      }
    }
  };

  const handleCreatedEducation = async (
    doctorId: string,
    values: IEducationTypes | undefined
  ) => {
    if (!values) return;
    const newValues = {
      from: values.from,
      to: values.to,
      degree: values.degree,
      university: values.university,
      doctorId: doctorId,
    };

    const addEducation = await createForever("educations", newValues);
    return addEducation;
  };

  const handleUploadProfile = async (doctorId: string, file: File) => {
    if ((!file || file == null) && !doctorId) {
      return;
    }

    const url = `doctors/${doctorId}/upload-profile`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload profile failed", 2000);
    }
  };

  const handleUploadCardFront = async (doctorId: string, file: File) => {
    if ((!file || file == null) && !doctorId) {
      return;
    }

    const url = `doctors/${doctorId}/upload-card-front`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload card front failed", 2000);
    }
  };
  const handleUploadCardBack = async (doctorId: string, file: File) => {
    if ((!file || file == null) && !doctorId) {
      return;
    }

    const url = `doctors/${doctorId}/upload-card-back`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload card back failed", 2000);
    }
  };

  const handleSubmit = async (
    values: IDoctorCreateTypes,
    {
      resetForm,
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    values.specialists = values.specialists || [];
    const uniqueSpecialistIds = Array.from(
      new Set(
        comboboxValue
          ? comboboxValue
              .map((item: any) => item.id)
              .filter(
                (id: string | undefined): id is string => id !== undefined
              )
          : []
      )
    ) as string[];
    values.specialists = uniqueSpecialistIds;
    try {
      const newValues: IDoctorCreateTypes = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        address1: values.address1,
        password: values.password,
        dob: values.dob,
        gender: values.gender,
        bio: values.bio,
        experience: values.experience,
        documentType: values.documentType,
        cardNumber: values.cardNumber,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate,
        hospital: values.hospital,
        categories: values.categories || [],
        specialists: values.specialists || [],
      };
      

      const createdDoctor = await createDoctor("doctors", newValues);

      if (createdDoctor.status == 201) {
        await handleUploadCertificate(
          createdDoctor?.data?.id,
          values?.educations
        );

        if (values.profile && createdDoctor?.data?.id) {
          await handleUploadProfile(createdDoctor?.data?.id, values.profile);
        }
        if (values.identifyFront && createdDoctor?.data?.id) {
          await handleUploadCardFront(
            createdDoctor?.data?.id,
            values.identifyFront
          );
        }
        if (values.identifyBack && createdDoctor?.data?.id) {
          await handleUploadCardBack(
            createdDoctor?.data?.id,
            values.identifyBack
          );
        }
        resetForm();
        dispatch(clearCombobox());
        successPromiseMessage("Create doctor success", 2000);
      } else if (createdDoctor.status == 400) {
        errorMessage("Doctor is already created", 2000);
      } else {
        errorMessage("Create doctor failed", 2000);
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      errorMessage("Create doctor wrong", 2000);
    }
  };

  return (
    <Layout>
      <FormCreateDoctor
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        options={Doctoroptions}
      />
    </Layout>
  );
}
