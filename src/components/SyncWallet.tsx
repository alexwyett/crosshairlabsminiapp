import { useContext } from "react";
import { Button, FormSpinner, PromiseForm } from "@cagen/ezsite-components";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import clsx from "clsx";
import { TonConnectUIContext, useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import { UserAction } from "@/lib/types";
import useUser from "@/hooks/useUser";
import { fetchUrl } from "@/hooks/useFetch";

export default function SyncWalletAddress() {
  const { initDataRaw } = retrieveLaunchParams();
  const { user, updater } = useUser();
  const walletAddress = useTonAddress(false);
  const { state, open } = useTonConnectModal();
  const ctx = useContext(TonConnectUIContext);

  const HandleSubmit = async () => {
    if (ctx?.connected && user.wallet) {
      await ctx.disconnect();
      return;
    }

    if (state?.status === 'closed') {
      open();

      return;
    }

    const prevWallet = user.wallet;
    const undo = () => {
      updater({ type: UserAction.UPDATE_WALLET, payload: prevWallet })
    }

    updater({ type: UserAction.UPDATE_WALLET, payload: walletAddress || '' })

    try {
      await fetchUrl(
        `/api/wallet`,
        {
          method: 'POST',
          body: JSON.stringify({ wallet: walletAddress }),
          headers: {
            Authorization: initDataRaw ? `tma ${initDataRaw}` : '',
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (e) {
      undo();
    }
  }

  return (
    <>
      <p>Connect your wallet to be eligible for raffle prizes!</p>
      {user.wallet && <div className="p-2 text-wrap rounded bg-gray-500 break-words">{user.wallet}</div>}
      <PromiseForm 
        onSubmit={HandleSubmit} 
        className={
          clsx(
            "group gap-4 h-16 w-full flex relative"
          )
        }
      >
        <Button
          className={
            clsx(
              "h-full",
              {
                'bg-blue-400': !walletAddress
              }
            )
          }
        >
          {!walletAddress && <>Connect Wallet</>}
          {walletAddress && (!user.wallet || user.wallet !== walletAddress) && <>Save Wallet</>}
          {walletAddress && user.wallet && user.wallet === walletAddress && <>Change Wallet</>}
          <FormSpinner />
        </Button>
      </PromiseForm>
    </>
  )
}