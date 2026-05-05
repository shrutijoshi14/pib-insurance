import { FileCheck, Users, Wallet, Handshake } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Policy Selection Made Easy',
    icon: <FileCheck size={32} />,
    desc: 'Choose from a wide range of insurance options, carefully matched to your needs, so you can secure the right coverage.',
    active: false,
  },
  {
    num: '02',
    title: 'Effortless Claims Processing',
    icon: <Users size={32} />,
    desc: 'Experience a smooth and transparent claims process with quick support, fair settlements, and guidance every step of the way.',
    active: true,
  },
  {
    num: '03',
    title: 'Simple Premium Payment',
    icon: <Wallet size={32} />,
    desc: 'Enjoy flexible payment options, seamless renewals, and uninterrupted coverage designed to keep your protection stress-free.',
    active: false,
  },
  {
    num: '04',
    title: 'Get Insurance',
    icon: <Handshake size={32} />,
    desc: 'Access comprehensive insurance solutions delivered with expert advice and ongoing support, ensuring long-term peace of mind.',
    active: false,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8fbfe] py-20 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-[#3a9dc4] text-xs font-black tracking-[0.3em] uppercase mb-3">
             {">>>"} Work Process {"<<<"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#00384a]">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-8">
                {/* Connector Line (Desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-[2px] bg-dashed border-t-2 border-dashed border-[#3a9dc4]/20 -translate-y-1/2 z-0"></div>
                )}
                
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                  step.active 
                    ? 'bg-[#3a9dc4] text-white shadow-2xl shadow-[#3a9dc4]/40 scale-110' 
                    : 'bg-white text-[#3a9dc4] border border-gray-100 shadow-xl'
                }`}>
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#00384a] text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white shadow-md">
                    {step.num}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#00384a] mb-4">{step.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
