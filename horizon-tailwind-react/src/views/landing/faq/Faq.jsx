import { useState } from "react"
import { ChevronDown } from "lucide-react"


export default function Faq() {
     const [activeAccordion, setActiveAccordion] = useState(null)

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index)
      }
    return <section id="faq" className="py-16 !bg-white dark:!bg-navy-900">
    <div className="container px-4 md:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-brand-500 px-3 py-1 text-sm text-white">FAQ</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-navy-700 dark:text-white">Frequently Asked Questions</h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
            Find answers to common questions about our platform and services.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-4 py-12">
        {[
          {
            question: "How does the 14-day free trial work?",
            answer:
              "You can sign up for any plan and use all features for 14 days without being charged. No credit card required. At the end of the trial, you can choose to subscribe or your account will be automatically downgraded to the free plan.",
          },
          {
            question: "Can I change my plan later?",
            answer:
              "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change will take effect at the end of your current billing cycle.",
          },
          {
            question: "Is there a discount for annual billing?",
            answer:
              "Yes, we offer a 20% discount when you choose annual billing instead of monthly billing. This discount is applied automatically when you select the annual option during signup or when changing your billing cycle.",
          },
          {
            question: "What kind of support do you offer?",
            answer:
              "All plans include access to our help center and community forum. The Professional plan includes priority email support, while the Enterprise plan includes dedicated support with a named account manager and phone support.",
          },
          {
            question: "How secure is your platform?",
            answer:
              "We take security seriously. Our platform is built with enterprise-grade security features, including end-to-end encryption, regular security audits, and compliance with industry standards like SOC 2, GDPR, and HIPAA.",
          },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border border-gray-200 dark:!border-white/10 p-6 hover:shadow-sm transition-shadow duration-300 bg-white dark:bg-navy-900">
            <button 
              className="flex w-full items-center justify-between" 
              onClick={() => toggleAccordion(i)}
            >
              <h3 className="text-lg font-medium text-navy-700 dark:text-white">{item.question}</h3>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 text-gray-600 dark:text-gray-400 ${activeAccordion === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mt-2 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 ${activeAccordion === i ? 'max-h-40' : 'max-h-0'}`}>
              <p className={activeAccordion === i ? 'py-2' : 'py-0'}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
}