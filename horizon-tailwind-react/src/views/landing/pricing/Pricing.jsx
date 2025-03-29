import { CheckCircle2 } from "lucide-react"

export default function Pricing() {
    return <section id="pricing" className="py-16 bg-gray-50 dark:bg-navy-800">
    <div className="container px-4 md:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">Simple, Transparent Pricing</h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
        <div className="flex flex-col rounded-xl border border-gray-200 dark:!border-white/10 bg-white dark:bg-navy-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Starter</h3>
            <p className="text-gray-600 dark:text-gray-400">Perfect for small teams and startups</p>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-navy-700 dark:text-white">$29</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
          </div>
          <ul className="mt-6 space-y-3">
            {["5 team members", "10GB storage", "Basic analytics", "24/7 support"].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Get Started
          </button>
        </div>
        <div className="flex flex-col rounded-xl border border-gray-200 dark:!border-white/10 bg-white dark:bg-navy-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
          <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">
            Most Popular
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Professional</h3>
            <p className="text-gray-600 dark:text-gray-400">Ideal for growing businesses</p>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-navy-700 dark:text-white">$79</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "20 team members",
              "50GB storage",
              "Advanced analytics",
              "Priority support",
              "Custom integrations",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Get Started
          </button>
        </div>
        <div className="flex flex-col rounded-xl border border-gray-200 dark:!border-white/10 bg-white dark:bg-navy-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-400">For large organizations</p>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-navy-700 dark:text-white">$199</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">/month</span>
          </div>
          <ul className="mt-6 space-y-3">
            {[
              "Unlimited team members",
              "500GB storage",
              "Enterprise analytics",
              "Dedicated support",
              "Custom development",
              "SLA guarantees",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button className="linear mt-8 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </section>
}