import { initUtils } from "@telegram-apps/sdk-react";
import { Button } from "@cagen/ezsite-components";
import useUser from "@/hooks/useUser";
import PageContainer from "../PageContainer";

export default function Share() {
  const utils = initUtils();
  const { user } = useUser();

  return (
    <PageContainer className="p-4 text-white flex flex-col gap-4 items-start">
      <h2>Share this app!</h2>
      <Button
        onClick={() => {
          utils.shareURL(`https://t.me/crosshairlabsbasicminiappbot?startapp=${user.id}`, `Join me playing this demo mini app!`);
        }}
      >
        Share
      </Button>
    </PageContainer>
  )
}