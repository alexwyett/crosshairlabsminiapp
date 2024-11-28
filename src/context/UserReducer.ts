import { UserAction, UserPayload, UserState } from "../lib/types";

export default function UserReducer(state: UserState, action: UserPayload) {
  if (action.type === UserAction.BOOTSTRAP) {
    return {
      ...state,
      ...action.payload
    }
  }

  return {
    ...state
  };
}