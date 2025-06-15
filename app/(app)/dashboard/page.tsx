import { getCurrentSession } from "@/actions/cookies";
import Dashboard from "@/components/profile-settings/dashboard";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100%-6rem)]">
      <Dashboard />
    </main>
  );
};

export default SettingsPage;
