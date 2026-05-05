import { useParams, Link } from 'react-router-dom';
import { HeartPulse, Car, Plane, Briefcase, Shield, ArrowRight, Home, Activity } from 'lucide-react';

const serviceData = {
  individual: [
    { id: 'term', name: 'Term Insurance', icon: Activity, desc: 'Financial security for your loved ones with high term life cover.' },
    { id: 'health', name: 'Health Insurance', icon: HeartPulse, desc: 'Coverage for you and your family\'s medical expenses and emergencies.' },
    { id: 'home', name: 'Home Insurance', icon: Home, desc: 'Protect your valuable assets and property from unforeseen damages.' },
    { id: 'motor', name: 'Motor Insurance', icon: Car, desc: 'Mandatory and comprehensive covers for your vehicles.' },
    { id: 'travel', name: 'Travel Insurance', icon: Plane, desc: 'Covering domestic and international trips for peace of mind.' },
    { id: 'accidental', name: 'Accidental Insurance', icon: Shield, desc: 'Financial protection against accidental death or disability.' }
  ],
  group: [
    { id: 'group-health', name: 'Group Health Insurance', icon: HeartPulse, desc: 'Comprehensive health coverage for your employees and their dependents.' },
    { id: 'group-accident', name: 'Group Personal Accident', icon: Shield, desc: 'Provide financial support to employees in case of workplace accidents.' },
    { id: 'group-term', name: 'Group Term Insurance', icon: Activity, desc: 'Life cover offering high sums assured at low premiums for workforce.' },
    { id: 'group-travel', name: 'Group Travel Insurance', icon: Plane, desc: 'Coverage for employee corporate travel against risks.' }
  ],
  commercial: [
    { id: 'liability', name: 'Liability Insurance', icon: Briefcase, desc: 'Protect your enterprise from legal liabilities and third-party damages.' },
    { id: 'marine', name: 'Marine Insurance', icon: Briefcase, desc: 'Cover for goods during transit via sea, air, rail, or road.' },
    { id: 'property', name: 'Property Insurance', icon: Home, desc: 'Safeguard commercial property configurations against damage.' },
    { id: 'fire', name: 'Fire Insurance', icon: Shield, desc: 'Essential coverage against fire and special perils for businesses.' }
  ]
};

export default function ServicesPage() {
  const { type } = useParams();
  
  // Default to individual if no type is matched
  const activeCategory = type && serviceData[type] ? type : 'individual';
  const displayServices = serviceData[activeCategory];
  const title = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) + ' Insurance';

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse portfolio of {activeCategory} insurance products designed to mitigate risks and protect your assets.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-center mb-16">
           {['individual', 'group', 'commercial'].map(cat => (
             <Link 
               key={cat}
               to={`/services/${cat}`} 
               className={`px-6 py-2 rounded-full font-bold transition-colors ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:text-primary'} capitalize`}
             >
               {cat} Insurance
             </Link>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-200">
          {displayServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-primary transition-colors flex flex-col items-center group">
                <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={40} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">{service.name}</h2>
                <p className="text-gray-600 mb-6 text-sm flex-grow">{service.desc}</p>
                
                <Link 
                  to={`/quote?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors border border-gray-100"
                >
                  Get Quote <ArrowRight size={18} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
