import LocaleSwitcher from "../LocaleSwitcher";
import PageContainer from "../PageContainer";

export default function Home() {
  return (
    <PageContainer className="h-full">
      <LocaleSwitcher />
    </PageContainer>
  )
}