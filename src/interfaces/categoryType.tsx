export interface ICategoriesTypes {
  categoryId: any;
  doctorId: any;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: string;
  createdBy: string;
  name: string;
}



export interface IDoctorCategories {
  name: any;
  id: string;
  date: Date;
  doctorId: string;
  categoryId: string;
}
