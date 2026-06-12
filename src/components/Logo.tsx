import React from 'react';

interface LogoProps {
  type?: 'icon' | 'badge' | 'full' | 'inline';
  className?: string;
  iconSize?: number;
}

export default function Logo({ type = 'full', className = '', iconSize = 72 }: LogoProps) {
  // SVG Icon representing the Ambiance Joy Nursing Care Home logo uploaded by the user:
  // - Deep Navy Roof with Chimney and 4-paned window
  // - Purple/Amethyst Heart profile surrounding the couple
  // - Female (bun) and male silhouettes facing each other in Deep Navy
  // - Teal leaf curving up from the bottom right
  const renderIcon = (size: number) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Navy Roof with Chimney and Windows */}
        <path
          d="M250 40 L415 160 L385 160 L250 63 L115 160 L85 160 Z"
          fill="#0a2540"
        />
        {/* Chimney */}
        <rect x="345" y="90" width="35" height="50" fill="#0a2540" />
        {/* 4-pane window */}
        <g fill="#0a2540">
          <rect x="236" y="102" width="11" height="11" />
          <rect x="253" y="102" width="11" height="11" />
          <rect x="236" y="118" width="11" height="11" />
          <rect x="253" y="118" width="11" height="11" />
        </g>

        {/* Purple Amethyst Heart Outline & Left Side */}
        <path
          d="M250 178 C250 178 200 130 156 142 C112 154 116 220 150 264 C184 308 250 361 250 361"
          stroke="#833b82"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M250 178 C250 178 300 130 344 142 C388 154 384 220 350 264 C330 290 294 322 274 340"
          stroke="#833b82"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />

        {/* Human Couple Silhouettes in Deep Navy */}
        {/* Women on Left (with a bun) */}
        <path
          d="M225 295 C225 240 175 225 175 190 C175 165 200 165 200 180 C200 185 202 188 198 195 C208 195 212 210 208 220 C220 226 225 242 225 255 Z"
          fill="#0a2540"
        />
        {/* Small hair bun for woman */}
        <circle cx="178" cy="195" r="10" fill="#0a2540" />

        {/* Man on Right */}
        <path
          d="M222 295 C222 245 264 235 264 200 C264 178 245 178 245 190 C245 195 242 198 244 205 C236 205 232 220 236 230 C226 236 222 250 222 265 Z"
          fill="#0a2540"
        />

        {/* Teal/Emerald Leaf curving up from bottom-right */}
        <path
          d="M250 361 C290 340 376 290 356 200 C320 230 286 280 250 361 Z"
          fill="#137a7f"
        />
        {/* Leaf inner branch details */}
        <path
          d="M254 353 C275 315 310 275 338 242"
          stroke="#fdfbf7"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  if (type === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderIcon(iconSize)}</div>;
  }

  if (type === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {renderIcon(36)}
        <div className="text-left">
          <span className="block font-serif text-base font-extrabold tracking-tight text-brand-navy leading-none">
            Ambiance <span className="text-brand-purple italic font-medium">Joy</span>
          </span>
          <span className="block font-mono text-[8px] uppercase tracking-widest text-brand-teal font-bold mt-0.5">
            Nursing Services
          </span>
        </div>
      </div>
    );
  }

  if (type === 'badge') {
    return (
      <div className={`flex flex-col items-center text-center p-3 bg-brand-cream/80 border border-slate-100 rounded-xl ${className}`}>
        {renderIcon(60)}
        <div className="mt-1">
          <span className="font-serif text-sm font-bold text-brand-navy block leading-none">
            Ambiance <span className="text-brand-purple">Joy</span>
          </span>
          <span className="text-[8px] font-mono font-bold text-brand-teal uppercase tracking-widest block mt-0.5">
            Nursing Care Home
          </span>
        </div>
      </div>
    );
  }

  // Full representation as uploaded with beautiful typographic pairings
  return (
    <div className={`flex flex-col items-center text-center max-w-sm mx-auto select-none ${className}`}>
      {/* Visual Logo Icon */}
      {renderIcon(150)}

      {/* Primary Brand Names */}
      <h2 className="font-serif text-4xl font-extrabold text-[#0a2540] tracking-tight mt-3 flex items-center justify-center gap-0.5 leading-none">
        Ambiance
        <span className="text-[#833b82] font-serif font-normal italic ml-1 flex items-center">
          Joy
        </span>
      </h2>

      {/* Decorative subtitle divider */}
      <div className="w-full flex items-center justify-center gap-2 mt-2">
        <div className="h-[1.5px] bg-[#137a7f]/40 flex-1 max-w-[60px]" />
        <span className="font-sans text-[11px] font-bold text-[#137a7f] uppercase tracking-[0.2em]">
          NURSING CARE HOME
        </span>
        <div className="h-[1.5px] bg-[#137a7f]/40 flex-1 max-w-[60px]" />
      </div>

      {/* Tiny heart bottom flourish */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <div className="h-[0.5px] bg-[#833b82]/30 w-12" />
        <span className="text-[#833b82] text-xs">♥</span>
        <div className="h-[0.5px] bg-[#833b82]/30 w-12" />
      </div>

      {/* Tagline */}
      <p className="font-serif italic text-xs text-[#0a2540]/90 mt-1 font-medium select-text">
        "Compassion, Comfort & Quality Care"
      </p>
    </div>
  );
}
