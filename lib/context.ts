import { createContext } from "react";
import { useUserData } from "./hooks"
interface UserInformation {
  user: any,
  username: any

}
// const { user, username } = useUserData();
export const UserContext = createContext<UserInformation>({ user: null, username: null })

