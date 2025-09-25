import useAuth from "@/utils/useAuth";
import { Hotel, LogOut } from "lucide-react";

function MainComponent() {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F8BFF] to-[#1E40AF] flex items-center justify-center p-4 font-['Nanum_Gothic']">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 shadow-2xl border border-[#EDF0F4] dark:border-[#333333]">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-xl flex items-center justify-center">
                <Hotel size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-2xl">
                  Urbane Hospitium
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm">Hotel Management System</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#FFEDED] dark:bg-[#331111] rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={32} className="text-[#E12929] dark:text-[#FF6B6B]" />
            </div>
            <h2 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-bold text-xl mb-2">
              Sign Out
            </h2>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm">
              Are you sure you want to sign out of your account?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 bg-[#E12929] dark:bg-[#DC2626] text-white rounded-lg font-medium hover:bg-[#C71414] dark:hover:bg-[#B91C1C] active:bg-[#B01212] dark:active:bg-[#991B1B] focus:outline-none focus:ring-2 focus:ring-[#E12929] dark:focus:ring-[#DC2626] focus:ring-offset-2 transition-colors"
            >
              Sign Out
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg font-medium hover:bg-[#F5F7FB] dark:hover:bg-[#333333] active:bg-[#E8F0FF] dark:active:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;