
import React from 'react';

const RoadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c.267 0 .529.026.786.075M16 12a4 4 0 11-8 0 4 4 0 018 0z" transform="rotate(20 12 12)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-3.07a3.5 3.5 0 012.08-3.238l.19-.063a3.5 3.5 0 002.46 0l.19.063A3.5 3.5 0 0115 17.93V21M3 9V5.5A2.5 2.5 0 015.5 3h13A2.5 2.5 0 0121 5.5V9" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-orange-500"
          >
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V17.625c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V6.375c0-1.036-.84-1.875-1.875-1.875H3.375zM9 6.75V12h1.5V6.75H9zm3.75 0V12h1.5V6.75h-1.5zM9 13.5v3.75h6v-3.75H9z" />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Highway Hub <span className="text-orange-400">India</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
