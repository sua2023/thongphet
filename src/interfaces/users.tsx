export interface IUsersTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  createdAt: Date;
  createdBy: string;
  phone: string;
  isTwoFactorEnabled: boolean;
  twoFactorSecret: string;
  profile: string;
  roleId?: string;
  status: string;
  updatedAt: Date;
}

export interface IUsersCreateTypes {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: string;
  createdBy?: string;
  phone?: string;
  profile?: string;
  roleId?: string;
  role?: {
    id: string;
    name: string;
  };
  status?: string;
}

export interface IRoleDataType {
  groupName: any;
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  name: string;
  status: string;
}

export interface IRoleObjType {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  name: string;
  status: string;
}

export interface IRoleHasPermissionType {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  permission: IRoleDataType;
  role: IRoleObjType;
}
