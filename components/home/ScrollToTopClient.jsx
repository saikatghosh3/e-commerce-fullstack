'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [waterFill, setWaterFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      
      if (scrollY > 300) {
        setIsVisible(true);
        const fillPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
        setWaterFill(fillPercent);
      } else {
        setIsVisible(false);
        setWaterFill(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[9999] group w-14 h-14 rounded-full shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
          }}
          aria-label="Scroll to top"
        >
     
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-blue-500 animate-pulse opacity-60"></div>
          
      
          <div className="absolute inset-[2px] rounded-full bg-white/5 backdrop-blur-sm"></div>
          
    
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out overflow-hidden"
            style={{ height: `${waterFill}%` }}
          >
          
            <div 
              className="absolute bottom-0 left-0 right-0 h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(56,189,248,0.4) 0%, rgba(37,99,235,0.9) 100%)',
              }}
            ></div>
            
           
            <div 
              className="absolute bottom-full left-0 w-[200%] h-8 animate-[wave_3s_ease-in-out_infinite]"
              style={{
                background: 'rgba(103, 232, 249, 0.5)',
                borderRadius: '45%',
                transform: 'translateX(-25%)',
              }}
            ></div>
            
          
            <div 
              className="absolute bottom-full left-0 w-[200%] h-6 animate-[wave_4s_ease-in-out_infinite_reverse]"
              style={{
                background: 'rgba(56, 189, 248, 0.4)',
                borderRadius: '40%',
                transform: 'translateX(-15%)',
              }}
            ></div>
            
           
            <div 
              className="absolute bottom-full left-0 w-[200%] h-4 animate-[wave_2.5s_ease-in-out_infinite]"
              style={{
                background: 'rgba(167, 243, 208, 0.3)',
                borderRadius: '35%',
                transform: 'translateX(-30%)',
              }}
            ></div>
            
            
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-[bubble_2s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-4 right-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-[bubble_2.5s_ease-in-out_infinite_0.5s]"></div>
              <div className="absolute bottom-1 left-1/2 w-0.5 h-0.5 bg-white/50 rounded-full animate-[bubble_3s_ease-in-out_infinite_1s]"></div>
              <div className="absolute bottom-3 right-6 w-1 h-1 bg-white/30 rounded-full animate-[bubble_1.8s_ease-in-out_infinite_0.3s]"></div>
            </div>
          </div>
          
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute top-1 left-2 w-2 h-2 bg-white/40 rounded-full blur-[1px] animate-[shimmer_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-white/30 rounded-full blur-[0.5px] animate-[shimmer_4s_ease-in-out_infinite_1s]"></div>
          </div>
          
      
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ArrowUp 
              size={24} 
              className="text-white drop-shadow-lg group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </div>
          
       
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-500 whitespace-nowrap bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-md">
            {Math.round(waterFill)}%
          </div>
        </button>
      )}
      
  
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(-25%) translateY(0);
          }
          50% {
            transform: translateX(-15%) translateY(-3px);
          }
          100% {
            transform: translateX(-25%) translateY(0);
          }
        }
        
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
}