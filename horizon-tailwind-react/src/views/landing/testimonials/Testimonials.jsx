import { Star } from "lucide-react"

export default function Testimonials() {
  return <section id="testimonials" className="py-16 !bg-white dark:!bg-navy-900">
  <div className="container px-4 md:px-6 max-w-6xl mx-auto">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white dark:bg-brand-400">
          Testimonials
        </div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">What Our Customers Say</h2>
        <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
          Don't just take our word for it. Here's what our customers have to say about our platform.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col justify-between rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
        <div className="space-y-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brand-500 text-brand-500 dark:fill-brand-400 dark:text-brand-400" />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            "This platform has completely transformed how we operate. The analytics tools are powerful yet easy
            to use."
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          <div>
            <p className="font-medium text-navy-700 dark:text-white">Sarah Johnson</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">CEO, TechStart</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
        <div className="space-y-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brand-500 text-brand-500 dark:fill-brand-400 dark:text-brand-400" />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            "The collaboration features have made our team more productive than ever. We couldn't be happier
            with the results."
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          <div>
            <p className="font-medium text-navy-700 dark:text-white">Michael Chen</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">CTO, GrowthLabs</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
        <div className="space-y-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brand-500 text-brand-500 dark:fill-brand-400 dark:text-brand-400" />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            "The security features give us peace of mind, and the customer support is exceptional. Highly
            recommended!"
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          <div>
            <p className="font-medium text-navy-700 dark:text-white">Emily Rodriguez</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">COO, SecureNet</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
}