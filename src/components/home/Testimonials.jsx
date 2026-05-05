import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mr. Vinay Gawand',
    position: 'PRAJAKTA CONSTRUCTIONS',
    text: 'The PIB Insurance team has excellent knowledge of all their products. They have helped us with Group Health Insurance and Group Personal Accident Policy for my office employees and their dependents. Thank you, PIB Insurance, for the great work!'
  },
  {
    name: 'Mrs. Bhavna Patel',
    position: 'MEDICAL INSURANCE',
    text: 'The PIB team has been a great help to me and my family during my illness. They went the extra mile to settle my cashless claims with the hospital and took excellent care of my family throughout the claim settlement process. I wholeheartedly recommend PIB for their dedication and support.'
  },
  {
    name: 'Venugopal Reddy',
    position: 'SENIOR CITIZEN POLICY',
    text: 'I am 62 years old and have been a long-time customer with PIB. About five years ago, Mr. Virendra suggested a senior citizen policy to us. He explained its benefits with great patience and followed up with us every year for renewal. Today, during my sudden hospitalization...'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-[#00384a] text-center mb-20">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="relative bg-[#f2f7fb] rounded-3xl p-10 pt-16 shadow-sm border border-gray-100 flex flex-col">
               {/* Quote Icon */}
               <div className="absolute top-[-25px] left-10 w-14 h-14 bg-[#3a9dc4] rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Quote size={24} fill="currentColor" />
               </div>

               <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1 italic">
                 "{t.text}"
               </p>

               <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-bold text-[#00384a] text-lg uppercase tracking-tight">{t.name}</h4>
                  <p className="text-[#3a9dc4] text-[11px] font-bold uppercase tracking-[0.2em] mt-1">{t.position}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
           <button className="bg-[#3a9dc4] hover:bg-[#00384a] text-white font-bold px-10 py-4 rounded-full transition-all text-sm uppercase tracking-widest shadow-lg">
              Read More
           </button>
        </div>
      </div>
    </section>
  );
}
