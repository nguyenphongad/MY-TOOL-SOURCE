import React from 'react';

const MyToolLogo = ({ className }) => {
  return (
    <div className={`${className} logo-wrapper`}>
      <svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        {/* Nền vuông bo tròn */}
        <rect x="0" y="0" width="200" height="200" rx="30" fill="#0B76A0" />
        
        {/* Gradient nền */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1289b8" />
            <stop offset="100%" stopColor="#0B76A0" />
          </linearGradient>
        </defs>
        
        {/* Vuông bo tròn gradient */}
        <rect x="10" y="10" width="180" height="180" rx="25" fill="url(#blueGradient)" />
        
        {/* Biểu tượng chong chóng tre */}
        <g>
          {/* Trục giữa */}
          <circle cx="100" cy="100" r="15" fill="#FFD700" /> {/* Màu vàng */}
          
          {/* Cánh chong chóng 1 - cam */}
          <path d="M100,100 L140,40 L160,60 L120,110 Z" fill="#FF6B35" />
          
          {/* Cánh chong chóng 2 - xanh da trời */}
          <path d="M100,100 L160,140 L140,160 L90,120 Z" fill="#4ECDC4" />
          
          {/* Cánh chong chóng 3 - vàng */}
          <path d="M100,100 L60,160 L40,140 L80,90 Z" fill="#FFD700" />
          
          {/* Cánh chong chóng 4 - cam */}
          <path d="M100,100 L40,60 L60,40 L110,80 Z" fill="#FF6B35" />
          
          {/* Điểm trang trí */}
          <circle cx="150" cy="50" r="5" fill="#FFFFFF" />
          <circle cx="150" cy="150" r="5" fill="#FFFFFF" />
          <circle cx="50" cy="150" r="5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
          
          {/* Vòng giữa */}
          <circle cx="100" cy="100" r="10" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export default MyToolLogo;
