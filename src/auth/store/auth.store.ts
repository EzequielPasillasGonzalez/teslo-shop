import { checkAuthAction } from "@/auth/actions/check-auth.action.ts";
import { loginAction } from "@/auth/actions/login.action.ts";
import type { User } from "@/interfaces/user.interface.ts";
import { create } from "zustand";

// note: Ejemplo de uso de zustand
// type Store = {
//   count: number;
//   inc: () => void;
//   dec: () => void;
// };

// export const useCounterStore = create<Store>()((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
//   dec: () => set((state) => ({ count: state.count - 1 })),
// }));

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  //  Getters

  //  Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  //  Implementacion del store
  user: null,
  token: null,
  authStatus: "checking",
  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      localStorage.setItem("token", data.token);

      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();

      set({ user: user, token: token, authStatus: "authenticated" });

      return true;
    } catch {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
}));
