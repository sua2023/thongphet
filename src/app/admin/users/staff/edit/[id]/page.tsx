"use client";
import FormCreateEditStaff from "@/components/staff/formCreateEdit";
import { IRoleObjType, IUsersCreateTypes, IUsersTypes } from "@/interfaces";
import useApi from "@/lib/useApi";
import useFilter from "@/lib/useFiltter";
import { useFetchRoles } from "@/lib/users/useFetchRole";
import { useToast } from "@/lib/useToast";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

const validate = (values: IUsersCreateTypes) => {
  const errors: { [key: string]: string } = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  return errors;
};
export default function EditPage() {
  const api = useApi();
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.user.data);
  const [dataRole, setDataRole] = React.useState<IRoleObjType[]>([]);
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total } = useFetchRoles(filter);
  const { successPromiseMessage, errorMessage, warningMessage } = useToast();
  const [initialValues, setInitialValues] =
    React.useState<IUsersCreateTypes | null>(null);

  React.useEffect(() => {
    if (userData) {
      setInitialValues(userData);
    }
    if (!userData) {
      router.push("/admin/users/staff");
    }
  }, [userData]);

  const handleSubmit = async (
    values: IUsersCreateTypes,
    { setSubmitting }: { setSubmitting: (action: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      const newValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        ...(userData?.phone !== values.phone && { phone: values.phone }),
        ...(userData?.email !== values.email && { email: values.email }),
        address: values.address,
        roleId: values.roleId
      };
      const result = await api({
        url: `users/${userData?.id}`,
        method: "PUT",
        params: newValues,
      });

      if (result.status === 200) {
        successPromiseMessage("Edit user success", 1000);
      } else if (result?.status === 400) {
        errorMessage("Edit user failed", 1000);
      } else {
        errorMessage(result.message, 1000);
      }
      setSubmitting(false);
    } catch (error) {
      errorMessage("Something wrong", 1000);
      setSubmitting(false);
    }
  };

  const options: { value: string; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "deleted", label: "Deleted" },
    { value: "locked", label: "Locked" },
    { value: "blocked", label: "Blocked" },
  ];
  return (
    <>
      <Layout>
        {initialValues && (
          <FormCreateEditStaff
            initialValues={initialValues!}
            validate={validate}
            handleSubmit={handleSubmit}
            options={options}
            role={data}
          />
        )}
      </Layout>
    </>
  );
}
