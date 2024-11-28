import { FormEvent } from "react";

export type Table = 'User';

export enum UserAction {
  BOOTSTRAP = 'BOOTSTRAP',
  UPDATE_WALLET = 'UPDATE_WALLET',
}
  
export type UserPayload = {
  type: UserAction;
  payload?: any;
}

export type UserState = {
  id: number;
  username: number;
  langcode: string;
  wallet?: string;
}

export type onSubmitParams = Parameters<(e: FormEvent<HTMLFormElement>, data: FormData) => void | Promise<void>>;

export type PromiseFormProps = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: (...args: onSubmitParams) => void | Promise<any>
};