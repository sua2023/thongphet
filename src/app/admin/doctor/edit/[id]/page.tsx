"use client";
import FormEditDoctor from "@/components/doctor/formEdit";
import { Doctoroptions } from "@/helps/doctorOption";
import {
  IDoctorCeritificate,
  IDoctorEditTypes,
  IEducationTypes,
} from "@/interfaces";
import { useCreateDoctor } from "@/lib/doctor/useDoctorCreate";
import { useFetchDoctor } from "@/lib/doctor/useFetchDoctor";
import { useCreate, useEdit } from "@/lib/useCreate";
import { useDeleteForever } from "@/lib/useDeleteForever";
import {
  useUploadCertificate,
  useUploadProfile,
} from "@/lib/users/useUploadProfile";
import { useToast } from "@/lib/useToast";
import { addCombobox, clearCombobox } from "@/redux/features/combobox";
import { RootState } from "@/redux/store";
import { duration } from "moment";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: false,
});
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
});

export default function DoctorPage() {
  const params = useParams();
  const { id } = params;
  const userId = Array.isArray(id) ? id[0] : id;
  const dispatch = useDispatch();
  const { errorMessage, successPromiseMessage } = useToast();
  const { data, error, loading, refresh } = useFetchDoctor(userId);
  const { editForever } = useEdit();
  const { createForever } = useCreate();
  const { deletedForever } = useDeleteForever();
  const { comboboxValue } = useSelector((state: RootState) => state.combobox);
  const [initialValues, setInitialValues] =
    React.useState<IDoctorEditTypes | null>(null);
  const upload = useUploadProfile();
  const uploadDoc = useUploadCertificate();
  React.useEffect(() => {
    if (!data) {
      dispatch(clearCombobox());
    }

    return () => {
      dispatch(clearCombobox());
    };
  }, [data, dispatch]);

  React.useEffect(() => {
    if (data) {
      setInitialValues({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        address1: data.address1,
        dob: data.dob,
        profile: data.profile,
        gender: data.gender,
        status: data.status,
        balance: data.balance,
        bio: data.bio,
        documentType: data?.documentType,
        cardNumber: data.cardNumber,
        issueDate: data.issueDate,
        expiryDate: data.expiryDate,
        experience: data?.experience,
        identifyFront: data?.cardFront,
        identifyBack: data?.cardBack,
        doctorCategories: Array.isArray(data.doctorCategories)
          ? data.doctorCategories.map((category) => ({
              id: category.id,
              name: category.name,
            }))
          : [],
        hospital: data.hospital,
        educations:
          Array.isArray(data.educations) && data?.educations?.length > 0
            ? data.educations
            : [
                {
                  from: null,
                  to: null,
                  university: "",
                  degree: "",
                  certificates: null,
                },
              ],

        doctorSpecialists: Array.isArray(data.doctorSpecialists)
          ? data.doctorSpecialists.map((specialist: any) => ({
              id: specialist.id,
              name: specialist.name,
            }))
          : [],
      });
      if (
        Array.isArray(data?.doctorSpecialists) &&
        data.doctorSpecialists.length > 0
      ) {
        data.doctorSpecialists.forEach((item) => {
          dispatch(addCombobox(item));
        });
      }
    }
  }, [data, id]);

  const handleUploadProfile = async (file: File) => {
    if ((!file || file == null) && !userId) {
      return;
    }

    const url = `doctors/${userId}/upload-profile`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload profile failed", 2000);
    }
  };

  const handleUploadCardFront = async (file: File) => {
    if ((!file || file == null) && !userId) {
      return;
    }

    const url = `doctors/${userId}/upload-card-front`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload card front failed", 2000);
    }
  };
  const handleUploadCardBack = async (file: File) => {
    if ((!file || file == null) && !userId) {
      return;
    }

    const url = `doctors/${userId}/upload-card-back`;
    const result = await upload.uploadProfile(url, file);

    if (result?.status !== 200) {
      errorMessage("Upload card back failed", 2000);
    }
  };

  const handleUploadCertificate = async (certificate: any[] | undefined) => {
    if (!certificate || certificate == null) {
      return;
    }

    for (const education of certificate) {
      if (education?.id) {
        await uploadCertificates(education.id, education.certificates);
      } else {
        const createdEdu = await handleCreatedEducation(education);
        if (createdEdu?.status === 201) {
          await uploadCertificates(
            createdEdu?.data?.id,
            education.certificates
          );
        }
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
        
        if (!cert?.id) {
          const result = await uploadDoc.uploadCertificate(
            educationId,
            url,
            cert.photo
          );
          if (result?.status !== 200) {
            errorMessage("Upload certificate failed", 2000);
          }
        }
      }
    }
  };

  const handleCreatedSpecialist = async () => {
    const newSpecialist =
      data?.doctorSpecialists?.length === 0
        ? comboboxValue.map((doctorSpecialist: any) => doctorSpecialist?.id)
        : comboboxValue
            .filter((doctorSpecialist: any) => {
              return !data?.doctorSpecialists?.some(
                (ids: any) => ids?.id === doctorSpecialist?.id
              );
            })
            .map((doctorSpecialist: any) => doctorSpecialist?.id);

    if (newSpecialist.length > 0) {
      const newValues = {
        specialists: newSpecialist,
        doctorId: id,
      };

      const addSpecialist = await createForever("doc-specialists", newValues);
      return addSpecialist;
    }
  };

  const handleCreatedCategory = async (id: string) => {
    if (!id) {
      return;
    }

    const isDifferentId = data?.doctorCategories?.find(
      (category) => category.id == id
    );
    if (!isDifferentId) {
      const newValues = {
        categories: [id],
        doctorId: userId,
      };
      const addCategory = await createForever("doc-categories", newValues);
      if (addCategory?.status == 201) {
        await deletedDoctorCateory();
      }
      return addCategory;
    }
  };

  const deletedDoctorCateory = async () => {
    const ids = data?.doctorCategories;
    if (!ids || ids.length === 0) {
      return;
    }
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]?.id;
      if (id) {
        const url = `doc-categories/${id}`;
        const deleted = await deletedForever(url);
        return deleted;
      }
    }
  };
  const handleCreatedEducation = async (
    values: IEducationTypes | undefined
  ) => {
    if (!values) return;
    const newValues = {
      from: values.from,
      to: values.to,
      degree: values.degree,
      university: values.university,
      doctorId: userId,
    };

    const addEducation = await createForever("educations", newValues);
    return addEducation;
  };

  const handleSubmit = async (
    values: IDoctorEditTypes,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);

    if (values.email === data?.email) {
      delete values.email;
    }
    if (values.phone === data?.phone) {
      delete values.phone;
    }
    values.identifyFront;
    values.identifyBack;
    const newValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      address1: values.address1,
      dob: values.dob,
      gender: values.gender,
      status: values.status,
      bio: values.bio,
      ...(values.cardNumber && {
        cardNumber: values.cardNumber,
      }),
      documentType: values.documentType,
      issueDate: values.issueDate,
      expiryDate: values.expiryDate,
      experience: values?.experience,
      hospital: values.hospital,
    };

    try {
      const url = `doctors/${id}/account`;
      const editDotor = await editForever(url, newValues);
      if (editDotor?.status == 200) {
        await handleUploadCertificate(values?.educations);
        await handleCreatedSpecialist();
        if (values?.doctorCategories) {
          await handleCreatedCategory(values.doctorCategories[0]?.id);
        }
        if (values?.profile && values?.profile instanceof File) {
          await handleUploadProfile(values?.profile);
        }
        if (values.identifyFront && values?.identifyFront instanceof File) {
          await handleUploadCardFront(values.identifyFront);
        }
        if (values.identifyBack && values?.identifyBack instanceof File) {
          await handleUploadCardBack(values.identifyBack);
        }
        successPromiseMessage("Edit doctor success", 2000);
        setSubmitting(false);
      } else if (editDotor?.status == 400) {
        errorMessage("Doctor something wrong", 2000);
      } else {
        errorMessage("Edit doctor failed", 2000);
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      errorMessage("Edit doctor wrong", 2000);
    }
  };

  return (
    <Layout>
      {initialValues && (
        <FormEditDoctor
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          options={Doctoroptions}
        />
      )}
    </Layout>
  );
}
