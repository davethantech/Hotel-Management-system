import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Building2, Hotel } from "lucide-react";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-in. Please try again or use a different method.",
        OAuthCallback: "Sign-in failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-in method. Try another option.",
        EmailCreateAccount:
          "This email can't be used to create an account. It may already exist.",
        Callback: "Something went wrong during sign-in. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Incorrect email or password. Try again or reset your password.",
        AccessDenied: "You don't have permission to sign in.",
        Configuration:
          "Sign-in isn't working right now. Please try again later.",
        Verification: "Your sign-in link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F8BFF] to-[#1E40AF] flex items-center justify-center p-4 font-['Nanum_Gothic']">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md relative z-10"
      >
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

          <h2 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-bold text-xl text-center mb-8">
            Welcome Back
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#536081] dark:text-[#B0B0B0]">
                Email Address
              </label>
              <div className="relative">
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#536081] dark:text-[#B0B0B0]">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF] transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-[#FFEDED] dark:bg-[#331111] border border-[#E12929] dark:border-[#DC2626] p-3 text-sm text-[#E12929] dark:text-[#FF6B6B]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg font-medium hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] active:bg-[#2A5CC7] dark:active:bg-[#3D6FE5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              Don't have an account?{" "}
              <a
                href={`/account/signup${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#4F8BFF] dark:text-[#5B94FF] hover:text-[#3D6FE5] dark:hover:text-[#4F8BFF] font-medium transition-colors"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;