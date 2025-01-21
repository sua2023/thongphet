"use client";
import { CircleIcon } from "@/components/icons/icons";
import Select from "@/components/select";
import { RoleOptions } from "@/helps/generalOption";
import { IRoleDataType, IRoleHasPermissionType } from "@/interfaces";
import { useCreate, useEdit } from "@/lib/useCreate";
import { useDeleteBodyForever } from "@/lib/useDeleteForever";
import useIsMobile from "@/lib/useMobile";
import {
  useFetchPermission,
  useFetchPermissions,
} from "@/lib/users/useFetchPermission";
import { useToast } from "@/lib/useToast";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React from "react";
const Layout = dynamic(() => import("@/components/Layout"), { ssr: false });

interface IPermissionGroup {
  groupName: string;
  permissions: string[];
  roleHasPermission: string[];
  groupDeletedName: string;
  isDeleted: string[];
}
export default function EditRole() {
  const params = useParams();
  const { id } = params;
  const roleId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { data: rolePermissions } = useFetchPermission(roleId);
  const { data } = useFetchPermissions();
  const [role, setRole] = React.useState<string>("");
  const [selected, setSelected] = React.useState<string>("");
  const { deletedForever } = useDeleteBodyForever();
  const { createForever } = useCreate();
  const { editForever } = useEdit();
  const [isValidator, setIsValidator] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { errorMessage, successPromiseMessage } = useToast();
  const isMobile = useIsMobile();
  const [isPermission, setIsPermission] = React.useState<IPermissionGroup[]>(
    []
  );
  const [olderPermission, setOlderPermission] = React.useState<
    IPermissionGroup[]
  >([]);
  React.useEffect(() => {
    if (rolePermissions) {
      setRole(rolePermissions[0]?.role?.name);
      setSelected(rolePermissions[0]?.role.status);
    }
  }, [rolePermissions]);

  React.useEffect(() => {
    const newGroupedObject = rolePermissions.reduce(
      (
        acc: {
          [key: string]: {
            groupName: string;
            permissions: string[];
            roleHasPermission: string[];
          };
        },
        item: IRoleHasPermissionType
      ) => {
        const groupName = item.permission.groupName;
        if (!acc[groupName]) {
          acc[groupName] = {
            groupName,
            permissions: [],
            roleHasPermission: [],
          };
        }
        acc[groupName].permissions.push(item.permission.id);
        acc[groupName].roleHasPermission.push(item.id);
        return acc;
      },
      {}
    );

    const groupedArray = Object.values(newGroupedObject) as IPermissionGroup[];
    setIsPermission(groupedArray);
    setOlderPermission(groupedArray);
  }, [rolePermissions]);

  const groupedObject = data.reduce(
    (acc: { [key: string]: IRoleDataType[] }, item) => {
      if (!acc[item.groupName]) {
        acc[item.groupName] = [];
      }
      acc[item.groupName].push(item);
      return acc;
    },
    {}
  );

  const groupedData = Object.keys(groupedObject).map((groupName) => ({
    groupName,
    permisions: groupedObject[groupName],
  }));

  const comparePermissions = (
    olderPermission: IPermissionGroup[],
    isPermission: IPermissionGroup[]
  ) => {
    const addedPermissionIds: string[] = [];

    isPermission?.forEach((newPerm) => {
      const newIds = newPerm.permissions.filter(
        (newPermId) =>
          !olderPermission.some(
            (oldPerm) =>
              oldPerm.groupName === newPerm.groupName &&
              oldPerm.permissions.includes(newPermId)
          )
      );

      addedPermissionIds.push(...newIds);
    });

    return Array.from(new Set(addedPermissionIds));
  };
  // check new data add to api
  const differences = comparePermissions(olderPermission, isPermission);

  const handleChange = (groupName: string, permission: IRoleDataType) => {
    setIsPermission((prev) => {
      const groupIndex = prev.findIndex(
        (group) =>
          group?.groupName === groupName || group.groupDeletedName === groupName
      );

      if (groupIndex !== -1) {
        const group = prev[groupIndex];

        if (group.permissions.includes(permission.id)) {
          const updatedPermissions = group.permissions.filter(
            (id) => id !== permission.id
          );
          const updatedIsDeleted = Array.from(
            new Set([...(group.isDeleted || []), permission.id])
          );

          if (updatedPermissions.length === 0) {
            return prev.map((group, index) => {
              if (index === groupIndex) {
                return {
                  ...group,
                  permissions: [],
                  groupName: "",
                  groupDeletedName: groupName,
                  isDeleted: [...(group.isDeleted || []), permission.id],
                };
              }
              return group;
            });
          }

          return [
            ...prev.slice(0, groupIndex),
            {
              ...group,
              permissions: updatedPermissions,
              isDeleted: updatedIsDeleted,
              groupDeletedName: groupName,
            },
            ...prev.slice(groupIndex + 1),
          ];
        } else {
          const updatedIsDeleted = (group.isDeleted || []).filter(
            (id) => id !== permission.id
          );

          return [
            ...prev.slice(0, groupIndex),
            {
              ...group,
              groupName: groupName,
              permissions: [...group.permissions, permission.id],
              isDeleted: updatedIsDeleted,
              groupDeletedName: updatedIsDeleted.length == 0 ? "" : groupName,
            },
            ...prev.slice(groupIndex + 1),
          ];
        }
      } else {
        return [
          ...prev,
          {
            groupName: groupName,
            permissions: [permission.id],
          } as IPermissionGroup,
        ];
      }
    });
  };
  const handleItemChange = (permissions: IRoleDataType[]) => {
    setIsPermission((prev) => {
      const groupName = permissions[0].groupName;
      const currentGroup = prev.find((group) => group.groupName === groupName);
      const currentPermissions = currentGroup ? currentGroup.permissions : [];

      const allSelected = permissions.every((perm) =>
        currentPermissions.includes(perm.id)
      );

      if (allSelected) {
        return prev.map((group) => {
          if (group.groupName === groupName) {
            const uniquePermissions = new Set([
              ...currentPermissions,
              ...permissions.map((perm) => perm.id),
            ]);
            return {
              groupName: "",
              permissions: [],
              isDeleted: Array.from(uniquePermissions),
              groupDeletedName: groupName,
            };
          }
          return group;
        });
      } else {
        const updatedGroups = prev
          .map((group) => {
            if (group.groupName === groupName) {
              const uniquePermissions = new Set([
                ...currentPermissions,
                ...permissions.map((perm) => perm.id),
              ]);
              return {
                groupName: groupName,
                permissions: Array.from(uniquePermissions),
                groupDeletedName: "",
              };
            }
            return group;
          })
          .filter((group) => group.groupDeletedName !== groupName);

        if (!currentGroup) {
          return [
            ...updatedGroups,
            {
              groupName,
              permissions: permissions.map((perm) => perm.id),
              isDeleted: [],
              groupDeletedName: "",
            } as any,
          ];
        }
        return updatedGroups;
      }
    });
  };

  const isDeletedPermissionGroup =
    isPermission &&
    isPermission.filter(
      (permission) =>
        permission?.groupDeletedName &&
        permission.groupDeletedName.trim() !== ""
    );

  const deletedPermissionIds = isDeletedPermissionGroup
    ? isDeletedPermissionGroup.flatMap((group) =>
        group.isDeleted.flatMap((id) => {
          return rolePermissions
            .filter((rolePermission) => rolePermission.permission.id === id)
            .map((rolePermission) => rolePermission.id);
        })
      )
    : [];

  const handleDeleteAsigned = async () => {
    if (deletedPermissionIds?.length < 1) {
      return;
    }
    const newValueDeted = { ids: deletedPermissionIds };
    try {
      const deleted = await deletedForever(
        "deleteRolePermission",
        newValueDeted
      );

      return deleted;
    } catch (error) {
      errorMessage("Unsigned permission failed", 2000);
    }
  };
  const handleAsignPermission = async (
    role: IRoleDataType,
    permissions: string[]
  ) => {
    try {
      if (!role?.id || permissions?.length < 1) {
        return;
      }
      const newValues = {
        roleId: role.id,
        permissionId: permissions,
      };

      const created = await createForever("assignedRolePermission", newValues);
      return created;
    } catch (error) {
      errorMessage("Asign role permission failed", 2000);
    }
  };

  const handleSubmit = async () => {
    if (!role) {
      setIsValidator("Role is required");
      return;
    }
    const isPermissionGroup =
      isPermission &&
      isPermission.filter(
        (permission) =>
          permission?.groupName && permission.groupName.trim() !== ""
      );
    if (isPermissionGroup?.length < 1) {
      setIsValidator("Ensure permissions are assigned correctly.");
      return;
    }
    try {
      setIsSubmitting(true);
      setIsValidator("");
      const newValue = { name: role, status: selected };
      const edited = await editForever(
        `roles/${rolePermissions[0]?.role?.id}`,
        newValue
      );
      if (edited?.status == 200) {
        await handleAsignPermission(edited.data, differences);
        await handleDeleteAsigned();
        setIsSubmitting(false);
        successPromiseMessage("Add new role permission success", 2000);
      } else if (edited?.status == 409) {
        errorMessage("Role already created", 2000);
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      errorMessage("Something wrong", 2000);
    }
  };

  return (
    <Layout>
      <div className="lg:m-5 m-2">
        <p className="mt-2 text-lg text-gray700 font-bold">
          Edit roles permission
        </p>
        <div className="lg:mb-2 mb-2 mt-5">
          <label
            htmlFor="error"
            className="block text-sm font-medium text-gray700"
          >
            User roll
          </label>
          <input
            type="text"
            placeholder="role"
            id="error"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white border-[1.5px] border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-primary focus:border-primary block w-full p-2.5"
          />
          {isValidator && (
            <p className="ml-2 mt-1 text-sm text-red">{isValidator}</p>
          )}
          <label
            htmlFor="error"
            className="mt-3 block text-sm font-medium text-gray700"
          >
            Status
          </label>
          <Select
            options={RoleOptions}
            value={selected || ""}
            onChange={(selectedOption) => {
              setSelected(selectedOption);
            }}
          />
        </div>
        {!isMobile ? (
          <div className="my-5 p-5 border border-gray rounded-lg gap-5 grid grid-cols-1">
            {groupedData?.map((items, index) => {
              return (
                <div key={index} className="grid grid-cols-2 mx-5">
                  <div className="flex items-center gap-2 mt-5">
                    <CircleIcon size={10} color="gray" />
                    <p className="text-base text-gray700 capitalize">
                      {items.groupName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-10 flex items-center">
                      <input
                        id="red-checkbox"
                        type="checkbox"
                        checked={isPermission.some(
                          (group) => group?.groupName === items.groupName
                        )}
                        onChange={(e) => {
                          handleItemChange(items.permisions);
                        }}
                        className="size-4  text-red-600 bg-red border-gray300 rounded focus:ring-red focus:ring-offset-0 accent-[#009b91]"
                      />

                      <label
                        htmlFor="red-checkbox"
                        className="ms-2 text-sm font-medium text-gray700"
                      >
                        All
                      </label>
                    </div>
                    {items?.permisions?.map(
                      (perm: IRoleDataType, index: number) => {
                        const isGroupChecked = isPermission.find(
                          (group) => group.groupName === items.groupName
                        );
                        const isPermissionChecked = isGroupChecked
                          ? isGroupChecked.permissions.includes(perm.id)
                          : false;

                        return (
                          <div
                            key={index}
                            className="flex items-center me-4 pl-4"
                          >
                            <input
                              checked={isPermissionChecked}
                              id="red-checkbox"
                              type="checkbox"
                              value={perm.id}
                              onChange={() =>
                                handleChange(items.groupName, perm)
                              }
                              className="w-4 h-4 text-red bg-red cursor-pointer border-gray300 rounded focus:ring-red focus:ring-offset-0 accent-[#009b91]"
                            />

                            <label
                              htmlFor="red-checkbox"
                              className="ms-2 text-sm font-medium text-gray700"
                            >
                              {perm?.name}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 p-5 border border-gray rounded-lg gap-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {groupedData?.map((items, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <CircleIcon size={10} color="gray" />
                    <p className="text-base text-gray700 capitalize">
                      {items.groupName}
                    </p>
                  </div>
                  <div className="flex items-center me-4 m-5 mb-2">
                    <input
                      id="red-checkbox"
                      type="checkbox"
                      checked={isPermission.some(
                        (group) => group?.groupName === items.groupName
                      )}
                      onChange={(e) => {
                        handleItemChange(items.permisions);
                      }}
                      className="size-4 text-red-600 bg-red border-gray300 rounded focus:ring-red focus:ring-offset-0 accent-[#009b91]"
                    />

                    <label
                      htmlFor="red-checkbox"
                      className="ms-2 text-sm font-medium text-gray700"
                    >
                      All
                    </label>
                  </div>
                  {items?.permisions?.map(
                    (perm: IRoleDataType, index: number) => {
                      const isGroupChecked = isPermission.find(
                        (group) => group.groupName === items.groupName
                      );
                      const isPermissionChecked = isGroupChecked
                        ? isGroupChecked.permissions.includes(perm.id)
                        : false;

                      return (
                        <div
                          key={index}
                          className="flex items-center me-4 mt-5 m-10 pl-5 mb-2"
                        >
                          <input
                            checked={isPermissionChecked}
                            id="red-checkbox"
                            type="checkbox"
                            value={perm.id}
                            onChange={() => handleChange(items.groupName, perm)}
                            className="w-4 h-4 text-red bg-red cursor-pointer border-gray300 rounded focus:ring-red focus:ring-offset-0 accent-[#009b91]"
                          />

                          <label
                            htmlFor="red-checkbox"
                            className="ms-2 text-sm font-medium text-gray700"
                          >
                            {perm?.name}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="py-2 px-10 bg-red text-white text-sm rounded-lg"
            onClick={() => router.push("/admin/users/roles")}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="button"
            className="py-2 lg:px-10 px-4 bg-primary text-white text-sm rounded-lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <p>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline size-4 me-3 text-white animate-spin"
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
                Loading...
              </p>
            ) : (
              "Save change"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
