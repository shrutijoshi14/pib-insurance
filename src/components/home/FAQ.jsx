import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How fast is the claim settlement process?",
    a: "We pride ourselves on our 98.5% claim settlement ratio. Typical claims with proper documentation are processed within 24 to 48 hours directly into your bank account."
  },
  {
    q: "Can I upgrade my coverage midway through the policy term?",
    a: "Yes! You can choose to upgrade your coverage limits or add additional riders to your existing policy at any time subject to pro-rata premium adjustments."
  },
  {
    q: "Are there any hidden fees or charges?",
    a: "Absolutely not. Transparency is our core value. The premium quoted to you during checkout is final and includes all applicable taxes."
  },
  {
    q: "How can I renew my expired policy?",
    a: "You can easily renew your policy through our online portal, via our app, or by contacting our 24/7 customer support team. Grace periods may apply."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-space bg-[#f2f5f9]">
      <div className="section-container">
        
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-3 mb-4">
             <div className="w-10 h-0.5 bg-blue-nav rounded-full"></div>
             <span className="text-blue-nav font-black text-xs uppercase tracking-[0.4em]">Support center</span>
             <div className="w-10 h-0.5 bg-blue-nav rounded-full"></div>
          </div>
          <h2 className="fluid-h2 text-navy mb-8">Frequently Asked Questions</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-medium opacity-80">
            Find answers to common questions about our insurance processes and policies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-500 border ${
                  isOpen ? 'border-blue-nav shadow-premium' : 'border-white hover:border-blue-nav/20'
                }`}
              >
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center group"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                >
                  <span className={`font-black text-base sm:text-lg tracking-tight transition-colors ${isOpen ? 'text-blue-nav' : 'text-navy group-hover:text-blue-nav'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-nav text-white rotate-180' : 'bg-sky-light text-blue-nav'}`}>
                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="border-t border-gray-50 pt-6">
                      <p className="text-gray-500 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
