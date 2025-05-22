import ResetPasswordForm from "@/components/profile-settings/reset-password/reset-password-form";
import React from "react";

const ResetPasswordPage = () => {
  return (
    //mx-auto max-sm:px-5 max-xl:px-16 my-36 lg:max-w-[1200px]
    <main className="flex justify-center items-center min-h-[calc(100%-6rem)]">
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPasswordPage;
