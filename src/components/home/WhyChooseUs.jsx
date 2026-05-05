import { Check } from 'lucide-react';

const reasons = [
  {
    title: 'Tailored Coverage & Value',
    desc: 'We ensure your insurance coverage is designed to match your needs, budget, and backed by trusted insurers with proven service quality.',
  },
  {
    title: 'Transparency & Reliability',
    desc: 'We simplify exclusions, evaluate insurer stability, and ensure you choose policies with efficient claims support you can depend on.',
  },
  {
    title: 'Smart Comparisons, Better Choices',
    desc: 'We analyze and compare plans across insurers so you can confidently pick the one that delivers the best protection and benefits for you.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#00384a] mb-6">
              Why Choose Us
            </h2>
            <p className="text-gray-500 mb-10 max-w-lg leading-relaxed">
              We offer comprehensive coverage, competitive pricing, and seamless claims – backed by reliability, flexibility, and personalized service.
            </p>
            
            <div className="space-y-6">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 bg-[#3a9dc4] rounded-full flex-shrink-0 flex items-center justify-center text-white mt-1 shadow-lg shadow-[#3a9dc4]/20 transition-transform group-hover:scale-110">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm group-hover:shadow-md transition-all flex-1">
                    <h4 className="font-bold text-[#00384a] text-lg mb-2">{r.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2 h-[500px] md:h-[600px]">
             <div className="absolute inset-0 rounded-l-[100px] md:rounded-l-[150px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" 
                  alt="PIB Team" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00384a]/40 to-transparent"></div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
