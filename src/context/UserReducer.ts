import { UserAction, UserPayload, UserState } from "../lib/types";

export default function UserReducer(state: UserState, action: UserPayload) {
  if (action.type === UserAction.BOOTSTRAP) {
    return {
      ...state,
      ...action.payload
    }
  }

  if (action.type === UserAction.UPDATE_WALLET) {
    return {
      ...state,
      wallet: action.payload
    }
  }

  return {
    ...state
  };
}