import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "services/firebaseConfig";

export default function Cta() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-brand-500 text-white">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Give Your Employees a Voice
              </h2>
              <p className="md:text-xl">
                Empower your team with a dedicated platform to share feedback on company policies and workplace decisions.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4 lg:justify-center">
            <div className="flex w-full max-w-sm flex-col gap-2">
              <button
                className="linear w-full rounded-xl bg-white py-[12px] text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-100 active:bg-gray-200"
                onClick={() => {
                  if (user) {
                    navigate("/dashboard");
                  } else {
                    navigate("/auth/signup");
                  }
                }}
              >
                Get Started
              </button>
            </div>
            <p className="text-sm">
              Create a more engaged workplace. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
