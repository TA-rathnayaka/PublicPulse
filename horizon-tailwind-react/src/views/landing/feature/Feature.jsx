import { ArrowRight, Zap, BarChart3, Shield, Users, Star } from "lucide-react"

export default function Feature() {
    return <section id="features" className="py-16 bg-gray-50 dark:bg-navy-800">
              <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white dark:bg-brand-400">
                      Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">Everything You Need to Succeed</h2>
                    <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                      Our platform provides all the tools and features you need to take your business to the next level.
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <BarChart3 className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Advanced Analytics</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Gain valuable insights with our powerful analytics tools and make data-driven decisions.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <Shield className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Enterprise Security</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Keep your data safe with our enterprise-grade security features and compliance standards.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <Users className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Team Collaboration</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Work together seamlessly with your team using our collaborative tools and features.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <Zap className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Automation</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Save time and reduce errors with our powerful automation capabilities.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <Star className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Premium Support</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Get help when you need it with our dedicated support team and extensive documentation.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                    <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                      <ArrowRight className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-700 dark:text-white">Seamless Integration</h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Connect with your favorite tools and services using our extensive integration options.
                    </p>
                  </div>
                </div>
              </div>
            </section>
}