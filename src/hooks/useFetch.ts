import { useEffect, useRef, useState } from "react";

export type UseFetchData = {
  url: string|Request;
  data: any;
  status: number;
}

export type UseFetchConfig = {
  url: string|Request|null,
  asImg?: boolean,
  startFetch?: boolean,
  supressToast?: boolean,
  options?: RequestInit,
  callback?: (data: UseFetchData, reset?: Function) => void
}

export type UseGetConfig = UseFetchConfig;

export type UsePostConfig = UseFetchConfig & {
  params: object
}

export function fetchUrl(requestUrl: Request|string, options?: RequestInit, asImg?: boolean): any {
  return fetch(requestUrl, options).then(async (res) => {
    if (res.status === 500) {
      throw new Error(res.statusText);
    }

    let data;
    if (asImg) {
      const imageBlob = await res.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob);

      data = document.createElement('img')
      data.src = imageObjectURL;
    } else {
      data = await res.json();
    }

    return {
      url: requestUrl,
      data,
      status: res?.status
    };
  }).catch((e) => {
    console.error(e);
  })
}

function useFetch(
  config: UseFetchConfig
) {
  const { url, startFetch, asImg, options, callback, supressToast } = config;
  const [json, setJson] = useState<UseFetchData|null>(null);
  const [error, setError] = useState<Error|null|undefined>(null);
  const loaded = useRef<string>('');
  
  const resetFetch = () => {
    setError(undefined);
    setJson(null);
    loaded.current = '';
  };

  useEffect(() => {    
    if (!error
      && (startFetch === undefined || startFetch === true)
      && (typeof url === 'string' && url !== loaded.current)
    ) {
      loaded.current = url;
      fetchUrl(url, options, asImg).then((data: UseFetchData) => {
        setJson(data);
        if (callback) {
          callback(data, resetFetch)
        }
      })
    }
  }, [json, url, error, loaded, asImg, startFetch, callback, options]);

  useEffect(() => {
    if (error || typeof url !== 'string') {
      setJson(null);
    }
  }, [url, error, setJson]);

  return {
    json,
    loading: ((startFetch === undefined || startFetch === true) && (!json || url !== json.url) && !error),
    error,
    setError,
    setJson,
    reset: resetFetch
  }
}

export function useGet(props: UseGetConfig) {
  const { asImg, options, ...rest } = props;

  return useFetch({
    ...rest,
    asImg: asImg || false,
    options: options || {}
  });
}

export function usePost(props: UsePostConfig) {
  const { url, startFetch, params, callback, options, supressToast } = props;

  return useFetch({
    url,
    startFetch,
    supressToast,
    options: {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      body: JSON.stringify(params)
    },
    callback
  });
}

export default useGet;
