
import React, { useState } from 'react';

interface RoutePlannerProps {
  onPlanRoute: (prompt: string) => void;
  isLoading: boolean;
}

const samplePrompts = [
    "Plan a trip from Delhi to Jaipur. I need 2 restaurants and an EV charger for my Tata Nexon.",
    "I'm driving from Mumbai to Pune. Find me a good hotel for a night stay and a petrol pump.",
    "Show me repair shops and dhabas on the highway from Bangalore to Chennai."
]

export const RoutePlanner: React.FC<RoutePlannerProps> = ({ onPlanRoute, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onPlanRoute(prompt);
    }
  };
  
  const handleSamplePromptClick = (sample: string) => {
    setPrompt(sample);
    onPlanRoute(sample);
  }

  return (
    <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700 shadow-2xl shadow-slate-950/50">
      <form onSubmit={handleSubmit}>
        <label htmlFor="trip-prompt" className="block text-lg font-medium text-slate-300 mb-2">
          Describe Your Journey
        </label>
        <div className="relative">
          <textarea
            id="trip-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Driving from Delhi to Agra, find me 2 kid-friendly restaurants and an EV charger...'"
            className="w-full h-24 p-4 pr-32 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-slate-500 text-slate-100 resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-orange-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
          >
            {isLoading ? 'Planning...' : 'Plan'}
          </button>
        </div>
      </form>
       <div className="mt-4 text-sm text-slate-400">
        <span className="font-semibold">Or try an example:</span>
        <div className="flex flex-wrap gap-2 mt-2">
            {samplePrompts.map((p, i) => (
                 <button key={i} onClick={() => handleSamplePromptClick(p)} disabled={isLoading} className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs hover:bg-slate-700 transition-colors disabled:opacity-50">
                    {p}
                 </button>
            ))}
        </div>
      </div>
    </div>
  );
};
