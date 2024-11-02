import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const {user, setUser} = useContext(AuthContext);

  return {user, setUser};
}