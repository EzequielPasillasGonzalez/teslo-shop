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

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  //  Getters

  //  Actions
  login: (email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  //  Implementacion del store
  user: null,
  token: null,

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);

      set({ user: data.user, token: data.token });

      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });

      return false;
    }
  },
}));
