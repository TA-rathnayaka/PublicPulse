import { MessageCircle, BarChart3, Shield, Users, Eye, CheckCircle } from "lucide-react"

export default function Feature() {
    return (
        <section id="features" className="py-16 bg-gray-50 dark:bg-navy-800">
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white dark:bg-brand-400">
                            Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">
                            Empower Your Workforce with Insights
                        </h2>
                        <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                            PublicPulse gives your company the tools to gather employee opinions, analyze trends, and make informed policy decisions.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <MessageCircle className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Employee Feedback</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Collect real-time feedback from employees on company policies through surveys and discussions.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <BarChart3 className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Real-Time Analytics</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Visualize employee sentiment with intuitive charts and reports for better decision-making.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <Shield className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Anonymous Voting</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Allow employees to voice their opinions freely with secure and anonymous polling options.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <Users className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Customizable Groups</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Segment employees by department, role, or location for targeted feedback collection.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <Eye className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Sentiment Analysis</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Automatically detect trends and employee sentiment to identify key workplace concerns.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-xl border border-gray-200 dark:!border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-navy-900">
                        <div className="rounded-full bg-brand-500/10 p-3 dark:bg-brand-400/10">
                            <CheckCircle className="h-6 w-6 text-brand-500 dark:text-brand-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-700 dark:text-white">Actionable Insights</h3>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Get AI-driven recommendations on how to improve workplace policies based on employee feedback.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
