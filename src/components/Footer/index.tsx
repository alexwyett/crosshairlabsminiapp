import { useTranslations } from "next-intl";
import Button from "./Button";

export default function Footer() {
  const t = useTranslations('i18n');

  return (
    <footer className="p-4">
      <nav
        className="w-full flex justify-center"
      >
        <div
          className="max-h-[4.5rem] h-[15dvh] mx-auto flex gap-2 justify-center relative p-2"
        >
          <Button to='/'>{t('home')}</Button>
          <Button to='/wallet'>{t('wallet')}</Button>
          <Button to='/share'>{t('share')}</Button>
        </div>
      </nav>
    </footer>
  )
}