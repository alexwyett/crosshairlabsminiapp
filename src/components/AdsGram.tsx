import { useAdsgram } from "@/hooks/useAdsGram";
import { useEffect } from "react";

export default function AdsGram({ blockId, onComplete }: { blockId: string, onComplete: Function }) {
  const init = useAdsgram({ blockId, onReward: onComplete });

  useEffect(() => {
    init?.();
  }, [init]);

  return (
    <></>
  )
}