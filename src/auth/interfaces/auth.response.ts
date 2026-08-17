import type { User } from "@/interfaces/user.interface.ts";


export interface AuthResponse {
  user: User;
  token: string;
}
