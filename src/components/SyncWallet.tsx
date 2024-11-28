import { useContext } from "react";
import { Button, FormSpinner, PromiseForm } from "@cagen/ezsite-components";
import { TonConnectUIContext, useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import { UserAction } from "@/lib/types";
import useUser from "@/hooks/useUser";

export default function SyncWalletAddress() {
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
      window?.localStorage?.setItem('wallet', walletAddress);
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
        className="flex flex-col gap-4 items-start"
      >
        <Button>
          {!walletAddress && <>Connect Wallet</>}
          {walletAddress && (!user.wallet || user.wallet !== walletAddress) && <>Save Wallet</>}
          {walletAddress && user.wallet && user.wallet === walletAddress && <>Change Wallet</>}
          <FormSpinner />
        </Button>
      </PromiseForm>
    </>
  )
}