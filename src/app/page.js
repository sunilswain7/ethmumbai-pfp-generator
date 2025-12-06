import PfpTwister from "@/components/PfpTweaker";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/assets/city.png" 
          alt="Mumbai Skyline"
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      {/* HEADER */}
      <header className="p-6 flex justify-between items-center z-10">
        <div className="bg-white text-eth-red px-6 py-2 rounded-full font-black tracking-tighter shadow-lg text-xl border-2 border-transparent hover:border-eth-yellow transition-all cursor-default">
          ETHMUMBAI
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 mt-[-40px]">
        <div className="text-center mb-8 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
             ETHMUMBAI PFP TWEAKER
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg mx-auto">
            Get on the bus to the future of Web3
          </p>
        </div>

        <PfpTwister />
      </div>

      {/* FOOTER ROAD */}
      <div className="h-32 bg-eth-road w-full border-t-[10px] border-eth-yellow relative mt-auto flex items-center justify-center z-10">
        <div className="absolute w-full h-0 border-t-4 border-dashed border-white/40"></div>
        <div className="absolute bottom-4 text-white/30 text-xs font-mono tracking-widest">
          ETMUMBAI • HACKATHON • CONFERENCE * 2026
        </div>
      </div>
    </main>
  );
}