import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTAContact() {
  return (
    <section className="bg-[#00384a] py-20 relative overflow-hidden text-center md:text-left">
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Headline Section */}
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              To get insured contact our experts now
            </h2>
            <p className="text-[#3a9dc4] font-bold text-lg">
              Reach us anytime — we're here to help protect what matters most.
            </p>
          </div>

          {/* Contact Actions */}
          <div className="flex flex-col sm:flex-row items-stretch gap-6 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <a
                href="tel:+919820419276"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white px-8 py-5 rounded-2xl border border-white/10 transition-all font-bold text-sm tracking-widest uppercase group"
              >
                <div className="w-10 h-10 bg-[#3a9dc4] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} fill="white" />
                </div>
                +91 98204 19276
              </a>
              <a
                href="tel:+919820419256"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white px-8 py-5 rounded-2xl border border-white/10 transition-all font-bold text-sm tracking-widest uppercase"
              >
                <div className="w-10 h-10 bg-[#3a9dc4] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} fill="white" />
                </div>
                +91 98204 19256
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@pibinsurance.in"
                className="flex items-center gap-4 bg-[#3a9dc4] hover:bg-[#2d8ab3] text-white px-8 py-5 rounded-2xl transition-all font-bold text-sm tracking-widest uppercase shadow-xl"
              >
                <div className="w-10 h-10 bg-[#00384a] rounded-full flex items-center justify-center shrink-0 text-white">
                  <Mail size={18} />
                </div>
                info@pibinsurance.in
              </a>
              
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#00384a] px-8 py-5 rounded-2xl transition-all font-bold text-sm tracking-widest uppercase"
              >
                Request Callback <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
