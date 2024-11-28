import { Channel, PresenceChannel } from "pusher-js";
import { useEffect } from "react";

/**
 * Subscribes to a channel event and registers a callback.
 * @param channel Pusher channel to bind to
 * @param eventName Name of event to bind to
 * @param callback Callback to call on a new event
 */
export function useEvent<D>(
  channel: Channel | PresenceChannel | undefined,
  eventName: string,
  callback: (data?: D, metadata?: { user_id: string }) => void
) {
  // bind and unbind events whenever the channel, eventName or callback changes.
  useEffect(() => {
    if (channel === undefined) {
      return;
    } else channel.bind(eventName, callback);
    return () => {
      channel.unbind(eventName, callback);
    };
  }, [channel, eventName, callback]);
}

/**
 * Subscribes to a channel event and registers a callback.
 * @param channel Pusher channel to bind to
 * @param eventName Name of event to bind to
 * @param callback Callback to call on a new event
 */
export function useAllEvent<D>(
  channel: Channel | PresenceChannel | undefined,
  callback: (data?: D, metadata?: { user_id: string }) => void
) {
  // bind and unbind events whenever the channel, eventName or callback changes.
  useEffect(() => {
    if (channel === undefined) {
      return;
    } else channel.bind_global(callback);
    return () => {
      channel.unbind_global(callback);
    };
  }, [channel, callback]);
}