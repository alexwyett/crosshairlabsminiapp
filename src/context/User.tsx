import { Dispatch, PropsWithChildren, Reducer, createContext, useReducer } from "react";
import { UserPayload, UserState } from "../lib/types";
import UserReducer from "./UserReducer";

export const InitialState = {
  wallet: window?.localStorage?.getItem('wallet') || ''
} as UserState;

export const UserContext = createContext<UserState>(InitialState);
export const UpdateUserContext = createContext<Dispatch<UserPayload>>(() => {});

export default function UserProvider(props: PropsWithChildren) {
  const { children } = props;

  const [state, update] = useReducer<Reducer<UserState, any>>(
    UserReducer,
    InitialState
  );

  return (
    <UserContext.Provider value={state}>
      <UpdateUserContext.Provider value={update}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}