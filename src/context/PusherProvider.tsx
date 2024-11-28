import React from "react";
import { default as Pusher } from "pusher-js";
import { CorePusherProvider } from "./Pusher/PusherProvider";
import { PusherProviderProps } from "./Pusher/types";

export const PusherProvider: React.FC<PusherProviderProps> = (props) => (
  <CorePusherProvider _PusherRuntime={Pusher} {...props} />
);