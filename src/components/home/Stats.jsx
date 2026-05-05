import { FileText, Users, Smile, ShieldCheck } from 'lucide-react';

const stats = [
  { value: '90,000', label: 'Insurance Solutions Provided', icon: <FileText size={40} /> },
  { value: '89+', label: 'Insurance Experts', icon: <Users size={40} /> },
  { value: '95%', label: 'Happy Clients', icon: <Smile size={40} /> },
  { value: '97%', label: 'Client Retention Rate', icon: <ShieldCheck size={40} /> },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-[#3a9dc4] to-[#0072ff] py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-6 text-white group">
              <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-all">
                 {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold leading-none mb-1">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
