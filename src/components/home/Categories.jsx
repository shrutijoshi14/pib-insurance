import { useState } from 'react';
import { Activity, Stethoscope, ShieldPlus, Briefcase, Car, Plane, Home, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Term Insurance', group: 'Individual', icon: Activity, desc: 'Secure your family\'s financial future.' },
  { name: 'Health Insurance', group: 'Individual', icon: Stethoscope, desc: 'Quality medical care for you and yours.' },
  { name: 'Home Insurance', group: 'Individual', icon: Home, desc: 'Protect your most valuable asset.' },
  { name: 'Motor Insurance', group: 'Individual', icon: Car, desc: 'Coverage for your life on the road.' },
  { name: 'Travel Insurance', group: 'Individual', icon: Plane, desc: 'Explore the world with peace of mind.' },
  { name: 'Accidental Insurance', group: 'Individual', icon: ShieldAlert, desc: 'Financial shield against un-notified events.' },
  { name: 'Group Health', group: 'Group', icon: Stethoscope, desc: 'Comprehensive medical plans for employees.' },
  { name: 'Group Accident', group: 'Group', icon: ShieldPlus, desc: 'Protect your workforce from injuries.' },
  { name: 'Liability Insurance', group: 'Commercial', icon: Briefcase, desc: 'Defend your business against legal claims.' },
  { name: 'Fire Insurance', group: 'Commercial', icon: ShieldPlus, desc: 'Safeguard your inventory and property.' },
];

const filters = ['Individual Insurance', 'Group Insurance', 'Commercial Insurance'];

const Categories = () => {
  const [activeFilter, setActiveFilter] = useState('Individual Insurance');

  const filteredCategories = categories.filter(cat => 
    activeFilter.startsWith(cat.group)
  );

  return (
    <section className="section-space bg-vignette">
      <div className="section-container">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
             <div className="w-10 h-0.5 bg-blue-nav rounded-full"></div>
             <span className="text-blue-nav font-black text-xs uppercase tracking-[0.4em]">Our Services</span>
             <div className="w-10 h-0.5 bg-blue-nav rounded-full"></div>
          </div>
          <h2 className="fluid-h2 text-navy mb-8">We're covering all the insurance fields</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
             {filters.map(filter => (
               <button
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`px-8 py-4 rounded-full text-[13px] font-black uppercase tracking-widest transition-premium border shadow-sm ${
                   activeFilter === filter 
                   ? 'bg-blue-nav text-white border-blue-nav shadow-lg scale-105' 
                   : 'bg-white text-gray-400 border-gray-100 hover:border-blue-nav/30'
                 }`}
               >
                 {filter}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((cat, i) => {
             const Icon = cat.icon;
             return (
               <Link 
                 to={`/services/${cat.group.toLowerCase()}`} 
                 key={i} 
                 className="group bg-white rounded-3xl p-10 border border-gray-100 hover:border-blue-nav/10 shadow-sm hover:shadow-premium transition-premium flex flex-col items-center text-center h-full active:scale-[0.98]"
               >
                  <div className="w-20 h-20 bg-[#f4f8fd] text-blue-nav rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-blue-nav group-hover:text-white transition-premium group-hover:rotate-6">
                    <Icon size={32} strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xl font-black text-navy mb-4 group-hover:text-blue-nav transition-colors">
                    {cat.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-1">
                    {cat.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-blue-nav font-black text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all">
                     Learn more <ArrowRight size={14} strokeWidth={3} />
                  </div>
               </Link>
             )
          })}
        </div>

      </div>
    </section>
  );
};

export default Categories;
