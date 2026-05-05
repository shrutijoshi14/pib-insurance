import { useState } from 'react';
import { ShieldCheck, HeartPulse, Home, Car, Plane, Activity, Users, Briefcase, Anchor, Building2 } from 'lucide-react';

const tabs = ['Individual Insurance', 'Group Insurance', 'Commercial Insurance'];

const services = {
  'Individual Insurance': [
    { name: 'Term Insurance', icon: <ShieldCheck size={24} />, img: 'https://images.unsplash.com/photo-1454165833767-027ffb45d58c?auto=format&fit=crop&q=80&w=600' },
    { name: 'Health Insurance', icon: <HeartPulse size={24} />, img: 'https://images.unsplash.com/photo-1576091160550-2173bdd9962a?auto=format&fit=crop&q=80&w=600' },
    { name: 'Home Insurance', icon: <Home size={24} />, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600' },
    { name: 'Motor Insurance', icon: <Car size={24} />, img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600' },
    { name: 'Travel Insurance', icon: <Plane size={24} />, img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c05e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Accidental Insurance', icon: <Activity size={24} />, img: 'https://images.unsplash.com/photo-1584441484083-f9a8ba492bbe?auto=format&fit=crop&q=80&w=600' },
  ],
  'Group Insurance': [
    { name: 'Group Health Insurance', icon: <Users size={24} />, img: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?auto=format&fit=crop&q=80&w=600' },
    { name: 'Group Personal Accident', icon: <ShieldCheck size={24} />, img: 'https://images.unsplash.com/photo-1517245318773-8951e73e979a?auto=format&fit=crop&q=80&w=600' },
    { name: 'Group Term Insurance', icon: <Activity size={24} />, img: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Group Travel Insurance', icon: <Plane size={24} />, img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c05e?auto=format&fit=crop&q=80&w=600' },
  ],
  'Commercial Insurance': [
    { name: 'Liability Insurance', icon: <Briefcase size={24} />, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
    { name: 'Marine Insurance', icon: <Anchor size={24} />, img: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=600' },
    { name: 'Property Insurance', icon: <Building2 size={24} />, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' },
  ],
};

export default function Services() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-[#3a9dc4] text-xs font-black tracking-[0.3em] uppercase mb-3">
             {">>>"} Our Services {"<<<"}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-[#00384a]">
             We're covering all the insurance fields
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm md:text-base font-bold transition-all rounded-full ${
                activeTab === tab
                  ? 'bg-[#3a9dc4] text-white shadow-lg'
                  : 'text-gray-500 hover:text-[#3a9dc4] bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services[activeTab].map((service, i) => (
            <div key={i} className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col h-[320px]">
               {/* Image Section */}
               <div className="relative h-[200px] overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
               </div>
               
               {/* Bottom Info Bar Section */}
               <div className="flex-1 bg-[#f2f7fb] flex items-center justify-center p-6 border-t-4 border-[#3a9dc4] relative">
                  <h3 className="font-bold text-[#00384a] text-lg text-center leading-tight">
                    {service.name}
                  </h3>
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-0 right-6 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#3a9dc4] group-hover:bg-[#3a9dc4] group-hover:text-white transition-all duration-300">
                     {service.icon}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
