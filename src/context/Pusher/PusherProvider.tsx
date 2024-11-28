import { Options } from "pusher-js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { dequal } from "dequal";
import { PusherContextValues, PusherProviderProps } from "./types";
import { ChannelsProvider } from "./ChannelsProvider";

// context setup
const PusherContext = React.createContext<PusherContextValues>({});
export const __PusherContext = PusherContext;

/**
 * Provider that creates your pusher instance and provides it to child hooks throughout your app.
 * Note, you can pass in value={{}} as a prop if you'd like to override the pusher client passed.
 * This is handy when simulating pusher locally, or for testing.
 * @param props Config for Pusher client
 */

export const CorePusherProvider: React.FC<PusherProviderProps> = ({
  clientKey,
  cluster,
  triggerEndpoint,
  defer = false,
  children,
  _PusherRuntime,
  ...props
}) => {
  // errors when required props are not passed.
  useEffect(() => {
    if (!clientKey) console.error("A client key is required for pusher");
    if (!cluster) console.error("A cluster is required for pusher");
  }, [clientKey, cluster]);

  const config: Options = useMemo(
    () => ({ cluster, ...props }),
    [cluster, props]
  );

  // track config for comparison
  const previousConfig = useRef<Options | undefined>(props);
  useEffect(() => {
    previousConfig.current = props;
  });
  const [client, setClient] = useState<any | undefined>();

  useEffect(() => {
    // Skip creation of client if deferring, a value prop is passed, or config props are the same.
    if (
      !_PusherRuntime ||
      defer ||
      !clientKey ||
      props.value ||
      (dequal(previousConfig.current, props) && client !== undefined)
    ) {
      return;
    }

    setClient(new _PusherRuntime(clientKey, config));
  }, [client, clientKey, props, defer, _PusherRuntime, config]);

  return (
    <PusherContext.Provider
      value={{
        client,
        triggerEndpoint,
      }}
      {...props}
    >
      <ChannelsProvider>{children}</ChannelsProvider>
    </PusherContext.Provider>
  );
};