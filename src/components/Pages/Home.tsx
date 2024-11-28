import LocaleSwitcher from "../LocaleSwitcher";
import PageContainer from "../PageContainer";

export default function Home() {
  return (
    <PageContainer className="!p-0 h-full">
      <LocaleSwitcher />
    </PageContainer>
  )
}