import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const SovereignMap: React.FC = () => {
  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 h-[600px] bg-[#151822]">
      {/* Google Maps iFrame */}
      <iframe 
        src="https://maps.google.com/maps?q=Kolte-Patil%20Life%20Republic%2C%20Marunji%2C%20Pune&t=m&z=15&output=embed&iwloc=near" 
        className="w-full h-full border-0 filter contrast-125 saturate-150"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      {/* Premium Overlay UI */}
      <div className="absolute top-6 left-6 bg-[#151822]/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center rainbow-text-clip font-bold">
            <MapPin size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-tight font-medium text-[#5F6368] uppercase">Official Coordinates</div>
            <h2 className="font-sans font-bold text-white text-sm m-0">Properties Near Me: Hinjewadi</h2>
          </div>
        </div>
      </div>
      
      {/* Interactive CTA */}
      <div className="absolute bottom-6 left-6 pointer-events-auto">
        <a 
          href="https://www.google.com/maps/dir//Life+Republic+Sales+Office+Or+Main+Office,+Survey+No.+74+Hinjawadi+-+Marunji,+Hinjawadi+-+Kasarsai+Rd,+Taluka,+Mulshi,+Maharashtra+411033/@18.6459725,73.7360171,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2ba5053b55b4b:0x14d3205e23f3f5f7!2m2!1d73.7093735!2d18.6182576?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-accent transition-colors flex items-center gap-2 shadow-xl"
        >
          <Navigation size={14} /> Get Directions to Properties Near Me
        </a>
      </div>
    </div>
  );
};
