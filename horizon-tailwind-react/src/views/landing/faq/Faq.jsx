import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Faq() {
    const [activeAccordion, setActiveAccordion] = useState(null)

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index)
    }

    return (
        <section id="faq" className="py-16 bg-gray-50 dark:bg-navy-800">
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white">
                            FAQ
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                            Find answers to common questions about how PublicPulse can help your company improve policy engagement.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl space-y-4 py-12">
                    {[
                        {
                            question: "How does PublicPulse work?",
                            answer:
                                "PublicPulse allows companies to create a private space where employees can share feedback on company policies through polls and discussions. Admins can monitor engagement and gather insights in real time.",
                        },
                        {
                            question: "Can I customize PublicPulse for my company?",
                            answer:
                                "Yes! You can brand the platform with your company logo, customize policy polls, and set permissions based on roles within your organization.",
                        },
                        {
                            question: "Is employee feedback anonymous?",
                            answer:
                                "You can choose whether to make polls anonymous or require employees to identify themselves when voting. This setting can be adjusted for each poll individually.",
                        },
                        {
                            question: "How can I get insights from employee feedback?",
                            answer:
                                "PublicPulse provides real-time analytics, visual reports, and sentiment analysis tools to help you understand employee opinions and make informed decisions.",
                        },
                        {
                            question: "Is my company's data secure?",
                            answer:
                                "Absolutely. We use industry-leading security measures, including encryption, secure authentication, and compliance with data protection standards, to keep your company’s data safe.",
                        },
                        {
                            question: "Can PublicPulse be integrated with other tools?",
                            answer:
                                "Yes, PublicPulse supports integrations with HR platforms, Slack, and other workplace tools to make employee engagement seamless and efficient.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-gray-200 dark:!border-white/10 p-6 hover:shadow-sm transition-shadow duration-300 bg-white dark:bg-navy-900"
                        >
                            <button
                                className="flex w-full items-center justify-between"
                                onClick={() => toggleAccordion(i)}
                            >
                                <h3 className="text-lg font-medium text-navy-700 dark:text-white">
                                    {item.question}
                                </h3>
                                <ChevronDown
                                    className={`h-5 w-5 transition-transform duration-200 text-gray-600 dark:text-gray-400 ${
                                        activeAccordion === i ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <div
                                className={`mt-2 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 ${
                                    activeAccordion === i ? "max-h-40" : "max-h-0"
                                }`}
                            >
                                <p className={activeAccordion === i ? "py-2" : "py-0"}>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
