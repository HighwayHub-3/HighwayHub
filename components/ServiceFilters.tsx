
import React from 'react';
import { ServiceType } from '../types';
import { PetrolIcon, EvChargerIcon, RestaurantIcon, RepairIcon, HotelIcon } from './icons/ServiceIcons';

interface ServiceFiltersProps {
    activeFilters: ServiceType[];
    setActiveFilters: (filters: ServiceType[]) => void;
}

const serviceOptions = [
  { type: ServiceType.PETROL, label: 'Fuel', icon: <PetrolIcon className="w-5 h-5" /> },
  { type: ServiceType.EV_CHARGING, label: 'EV Charge', icon: <EvChargerIcon className="w-5 h-5" /> },
  { type: ServiceType.RESTAURANT, label: 'Food', icon: <RestaurantIcon className="w-5 h-5" /> },
  { type: ServiceType.REPAIR, label: 'Repairs', icon: <RepairIcon className="w-5 h-5" /> },
  { type: ServiceType.HOTEL, label: 'Hotels', icon: <HotelIcon className="w-5 h-5" /> },
];

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({ activeFilters, setActiveFilters }) => {
  const toggleFilter = (filter: ServiceType) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(newFilters);
  };

  return (
    <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700">
      <div className="flex items-center justify-center flex-wrap gap-3">
        {serviceOptions.map(({ type, label, icon }) => {
          const isActive = activeFilters.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
                ${isActive
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
