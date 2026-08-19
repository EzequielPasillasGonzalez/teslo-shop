import type { AuthResponse } from "@/auth/interfaces/auth.response.ts";
import { tesloApi } from "../../api/tesloApi.ts";

export const registerAction = async (
  email: string,
  password: string,
  fullName: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      email,
      password,
      fullName,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
