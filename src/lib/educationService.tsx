import { IEducationTypes } from "@/interfaces";
interface IAddEducationProps {
  values: IEducationTypes;
  education: IEducationTypes[];
  api: (config: {
    url: string;
    params: any;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  }) => Promise<any>;
}
export const isAddEducation = async ({
  values,
  education,
  api,
}: IAddEducationProps) => {
  try {
    let ids: string[] = [];
    if (education?.length < 1) {
      const addEducation = await api({
        url: "educations",
        params: values,
        method: "POST",
      });

      ids.push(addEducation?.data?.id);
    } else {
      const isDifferent = !education.some(
        (edu) =>
          edu.degree === values.degree &&
          edu.to === values.to &&
          edu.university === values.university
      );

      if (isDifferent) {
        const newEducation = [...education, values];
        const responses = await Promise.all(
          newEducation.map((edu) =>
            api({
              url: "educations",
              params: edu,
              method: "POST",
            })
          )
        );
        ids = responses
          .map((response) => response?.data?.id)
          .filter((id) => id);
      }
    }
    return ids;
  } catch (error) {
    console.log(error);
  }
};
