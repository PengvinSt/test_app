import { LoginFormValues } from "../components";
import { api } from "../config";

export const login = async (
  body: LoginFormValues
): Promise<{ message: string }> => {
  //   const res = await api.post<{ message: string }>("/login", body);
  //   return res.data;
  console.log({ body });
  await api.get<any>("/");
  return { message: "success" };
};
