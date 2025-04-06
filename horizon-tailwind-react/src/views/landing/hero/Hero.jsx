import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "services/firebaseConfig";

export default function Hero() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-navy-900">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-navy-700 dark:text-white">
                Empower Your Organization with Real-Time Insights
              </h1>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl mx-auto lg:mx-0">
                Gather feedback, track opinions, and make informed decisions with the most advanced public opinion platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="linear rounded-xl bg-brand-500 py-3 px-4 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center gap-2 justify-center"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button className="linear rounded-xl border border-gray-200 dark:!border-white/10 py-3 px-4 text-base font-medium text-navy-700 dark:text-white transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/20">
                Learn More
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm justify-center lg:justify-start text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-500" />
              <span>No setup required – start collecting feedback instantly</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-500/5 p-1 dark:from-brand-400/20 dark:to-brand-400/5">
              <img
                src="/api/placeholder/1280/720"
                alt="PublicPulse Dashboard Preview"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
