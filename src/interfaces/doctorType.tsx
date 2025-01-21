import { IDoctorSpecialists } from "./expertiseType";
import { IDoctorCategories, IEducationTypes } from "./type";

export interface IDoctorTypes {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date;
  phone: string;
  email: string;
  isApproved: string;
  password: string | null;
  address1: string;
  address: string;
  profile: string;
  mimetype: string | null;
  path: string | null;
  size: string | null;
  destination: string | null;
  balance: string | null;
  bio: string | null;
  experience: string | null;
  hospital: string | null;
  resetToken: string | null;
  resetTokenExpires: string | null;
  role: string;
  latitude: string | null;
  longitude: string | null;
  documentType: string | null;
  cardNumber: string | null;
  issueDate: Date | null;
  expiryDate: Date | null;
  cardFront: string | null;
  cardBack: string | null;
  educations: IEducationTypes[];
  doctorCategories?: IDoctorCategories[];
  doctorSpecialists?: IDoctorSpecialists[];
}

export interface IDoctorCreateTypes {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | null;
  phone: string;
  email: string;
  password?: string | null;
  address1?: string;
  status?: string;
  profile?: null;
  destination?: string | null;
  balance?: string | null;
  bio: string | null;
  experience: string | null;
  documentType: string | null;
  cardNumber?: string | null;
  issueDate?: Date | null;
  expiryDate?: Date | null;
  hospital: string | null;
  specialists?: string[];
  categories?: IDoctorBySpecialists[];
  educations?: any[];
  identifyFront?: any;
  identifyBack?: any;
  certificates?: IDoctorCreateCeritificate | null;
}

export interface IDoctorEditTypes {
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | null;
  phone?: string;
  email?: string;
  password?: string | null;
  address1?: string;
  status?: string;
  profile?: File | null | string;
  balance?: string | null;
  bio: string | null;
  experience?: string | null;
  documentType: string | null;
  cardNumber?: string | null;
  issueDate?: Date | null;
  expiryDate?: Date | null;
  hospital: string | null;
  specialists?: string[];
  doctorCategories?: IDoctorBySpecialists[];
  educations?: IEducationTypes[];
  doctorSpecialists?: IDoctorBySpecialists[];
  identifyFront?: any;
  identifyBack?: any;
  cardBack?: File;
  cardFront?: File;
}

export interface IDoctorBySpecialists {
  id: string;
  name: string;
}
export interface IDoctorCategoryTypes {
  id: string;
  date: Date;
  doctorId: string;
  categoryId: string;
}

export interface IChangeDoctorPassword {
  newPassword: string;
  confirmPassword: string;
}

export interface IDoctorCeritificate {
  id: string;
  name?: string;
  photo?: File | null;
  status?: string;
}

export interface IDoctorCreateCeritificate {
  educationId: string;
  images: File | null;
}
