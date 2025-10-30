
import React from 'react';

const messages = [
  "Consulting our AI trip planner...",
  "Charting the best route for you...",
  "Finding hidden gems along the highway...",
  "Calculating distances and stops...",
  "Almost there, your journey awaits..."
];

export const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);


  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center my-10">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-slate-300">{message}</p>
    </div>
  );
};
