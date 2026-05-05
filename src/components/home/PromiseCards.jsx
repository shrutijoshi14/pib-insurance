import { Umbrella, HandHelping, Home } from 'lucide-react';

const promises = [
  {
    num: '01',
    title: 'We Promise',
    desc: 'We promise long-term support by implementing plans smoothly and staying with you through claims & renewals.',
    icon: <Umbrella size={42} className="text-white" />,
    dark: false
  },
  {
    num: '02',
    title: 'We Provide',
    desc: 'We provide the right coverage by comparing insurers and tailoring policies that give you the best value and security.',
    icon: <HandHelping size={42} className="text-white" />,
    dark: true
  },
  {
    num: '03',
    title: 'We Protect',
    desc: 'We protect your business by identifying risks early and making insurance a top priority for safeguarding your assets.',
    icon: <Home size={42} className="text-white" />,
    dark: false
  },
];

export default function PromiseCards() {
  return (
    <section className="bg-white py-24 relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {promises.map((item, i) => (
            <div 
              key={i} 
              className={`relative rounded-[3rem] p-10 pt-32 shadow-[0_30px_60px_rgba(0,56,74,0.08)] transition-all duration-500 overflow-hidden group hover:shadow-2xl hover:-translate-y-3 ${
                item.dark ? 'bg-[#00384a] text-white' : 'bg-white text-[#00384a] border border-gray-100'
              }`}
            >
              {/* Background Number Outline - Large & Subtle */}
              <div 
                className={`absolute top-10 right-10 text-[110px] font-black leading-none select-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 ${
                  item.dark ? 'text-white' : 'text-[#00384a]'
                }`}
                style={{ 
                  WebkitTextStroke: '2.5px currentColor', 
                  color: 'transparent',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {item.num}
              </div>

              {/* Icon Container - Blue Gradient Corner Blob */}
              <div className="absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-[#00c6ff] to-[#0072ff] rounded-br-[5rem] flex items-center justify-center -translate-x-4 -translate-y-4 shadow-lg group-hover:scale-105 transition-transform duration-500">
                 <div className="translate-x-2 translate-y-2">
                   {item.icon}
                 </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-4">
                <h3 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight">
                  {item.title}
                </h3>
                <p className={`text-[15px] sm:text-base leading-relaxed font-medium ${item.dark ? 'text-white/70' : 'text-gray-500'}`}>
                  {item.desc}
                </p>
              </div>
              
              {/* Subtle Bottom Border Accent */}
              <div className={`absolute bottom-0 left-10 right-10 h-1 rounded-t-full transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${
                item.dark ? 'bg-white/20' : 'bg-[#00c6ff]'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
