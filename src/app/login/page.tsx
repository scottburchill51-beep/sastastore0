
import { AuthForm } from "@/components/auth/AuthForm";
import WelcomePopup from "@/components/WelcomePopup";

export const metadata = {
  title: "Log In | SastaStore",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <>
      <WelcomePopup />
      <AuthForm mode="login" />
    </>
  );
}
