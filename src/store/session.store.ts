import { create } from "zustand";

// 1. Defina o formato dos dados da sessão
interface Session {
  id: string;
  name: string;
  email: string;
  image: string | undefined;
}

// 2. Defina o formato do seu Store completo (estado + ações)
interface SessionState {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

// 3. Implementação do Store
const useSessionStore = create<SessionState>((set) => ({
  session: null, // Estado inicial

  setSession: (newSession) => set({ session: newSession }),

}));

export default useSessionStore;