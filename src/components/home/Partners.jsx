const partners = [
  { name: 'SBI General', logo: '/images/partners/sbi-general.png' },
  { name: 'Magma HDI', logo: '/images/partners/magma-hdi.png' },
  { name: 'Shriram', logo: '/images/partners/shriram.png' },
  { name: 'Axis Max', logo: '/images/partners/axis-max.png' },
  { name: 'Care Health', logo: '/images/partners/care-health.png' },
];

export default function Partners() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="section-container">
        <h2 className="text-3xl md:text-5xl font-bold text-[#00384a] text-center mb-16">Our Trusted Partners</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((p, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 flex items-center justify-center shadow-sm hover:shadow-md transition-all h-32 md:h-40">
               <img 
                 src={p.logo} 
                 alt={p.name} 
                 className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100" 
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
