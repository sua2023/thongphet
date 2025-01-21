import { API_ENPOINT } from "@/constants/constants";

const useUploadProfile = () => {
  const uploadProfile = async (url: string, file: any) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      const headers = new Headers();

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: headers,
        body: formData,
        credentials: "include",
      };

      const response = await fetch(`${API_ENPOINT}/${url}`, requestOptions);
      if (response.ok) {
        return { status: response.status };
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return { uploadProfile };
};

const useUploadCertificate = () => {
  const uploadCertificate = async (
    educationId: string,
    url: string,
    file: any
  ) => {
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("educationId", educationId);
      const headers = new Headers();

      const requestOptions: RequestInit = {
        method: "POST",
        headers: headers,
        body: formData,
        credentials: "include",
      };

      const response = await fetch(`${API_ENPOINT}/${url}`, requestOptions);
      if (response.ok) {
        return { status: response.status };
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return { uploadCertificate };
};

export { useUploadProfile, useUploadCertificate };
