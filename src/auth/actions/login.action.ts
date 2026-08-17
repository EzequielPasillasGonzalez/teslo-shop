import type { AuthResponse } from "@/auth/interfaces/auth.response.ts";
import { tesloApi } from "../../api/tesloApi.ts";

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
