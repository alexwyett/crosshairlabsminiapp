import { useCallback, useEffect, useRef } from 'react';

export function useAdsgram({ blockId, onReward, onError }: { blockId: string, onReward: Function, onError?: Function }) {
  const AdControllerRef = useRef<any>(undefined);

  useEffect(() => {
    try {
      AdControllerRef.current = (window as any)?.Adsgram?.init({ blockId });
    } catch (e: any) {
      console.log(e);
    }
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current.show().then(() => {
        // user watch ad till the end
        onReward();
      }).catch((result: any) => {
        // user get error during playing ad or skip ad
        onError?.(result);
      });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [onError, onReward]);
}