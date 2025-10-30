
import React from 'react';
import { PetrolIcon, EvChargerIcon, RestaurantIcon, RepairIcon, HotelIcon } from './icons/ServiceIcons';

const features = [
    {
        icon: <PetrolIcon className="w-8 h-8 text-sky-400" />,
        title: 'Fuel Stops',
        description: 'Never worry about running low. Find petrol and diesel stations easily.'
    },
    {
        icon: <EvChargerIcon className="w-8 h-8 text-green-400" />,
        title: 'EV Charging',
        description: 'Locate compatible charging points for your electric vehicle.'
    },
    {
        icon: <RestaurantIcon className="w-8 h-8 text-amber-400" />,
        title: 'Rest & Eat',
        description: 'Discover restaurants, dhabas, and rest areas for a perfect break.'
    },
    {
        icon: <RepairIcon className="w-8 h-8 text-rose-400" />,
        title: 'Roadside Assistance',
        description: 'Get help when you need it with nearby repair shops and mechanics.'
    },
    {
        icon: <HotelIcon className="w-8 h-8 text-indigo-400" />,
        title: 'Stayovers',
        description: 'Find hotels and motels for a comfortable night\'s rest on long journeys.'
    }
]

export const WelcomeScreen: React.FC = () => {
    return (
        <div className="text-center p-8 bg-slate-900/50 rounded-lg border border-slate-800 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-white mb-2">Welcome to Highway Hub India</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Your AI-powered companion for navigating India's highways. Describe your trip above to get started.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="bg-slate-800/70 p-6 rounded-lg text-left flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                        <div>
                            <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
