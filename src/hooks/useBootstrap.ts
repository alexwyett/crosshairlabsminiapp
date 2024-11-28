import { UserAction } from "@/lib/types";
import useUser from "./useUser";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { usePost } from "./useFetch";

export default function useBootstrap() {
  const { updater } = useUser();
  const { initDataRaw } = retrieveLaunchParams();
  
  const options = {
    headers: {
      authorization: initDataRaw ? `tma ${initDataRaw}` : '',
      'Content-Type': 'application/json'
    }
  };

  const startFetch = typeof initDataRaw === 'string' && initDataRaw.length > 0;

  const { loading } = usePost({
    url: `/api/bootstrap`,
    params: {},
    options,
    startFetch,
    callback: (data) => {
      if (data.status === 200) {
        updater({ type: UserAction.BOOTSTRAP, payload: data.data });
      }
    }
  })

  return loading;
}