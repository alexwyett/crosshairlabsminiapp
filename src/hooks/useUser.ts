import { UpdateUserContext, UserContext } from "@/context/User";
import { useContext } from "react";

export function useUser() {
  const user = useContext(UserContext);
  const updater = useContext(UpdateUserContext);

  if (user === undefined) {
    throw new Error(
      'useUser must be used within a UserContext'
    );
  }

  return { user, updater };
}

export default useUser;