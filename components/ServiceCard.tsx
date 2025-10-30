
import React from 'react';
import { Service, ServiceType } from '../types';
import { PetrolIcon, EvChargerIcon, RestaurantIcon, RepairIcon, HotelIcon } from './icons/ServiceIcons';

interface ServiceCardProps {
  service: Service;
}

const getIconAndColor = (type: ServiceType) => {
  switch (type) {
    case ServiceType.PETROL:
      return { icon: <PetrolIcon className="w-5 h-5" />, color: 'text-sky-400', bgColor: 'bg-sky-500/20' };
    case ServiceType.EV_CHARGING:
      return { icon: <EvChargerIcon className="w-5 h-5" />, color: 'text-green-400', bgColor: 'bg-green-500/20' };
    case ServiceType.RESTAURANT:
      return { icon: <RestaurantIcon className="w-5 h-5" />, color: 'text-amber-400', bgColor: 'bg-amber-500/20' };
    case ServiceType.REPAIR:
      return { icon: <RepairIcon className="w-5 h-5" />, color: 'text-rose-400', bgColor: 'bg-rose-500/20' };
    case ServiceType.HOTEL:
      return { icon: <HotelIcon className="w-5 h-5" />, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' };
    default:
      return { icon: null, color: 'text-slate-400', bgColor: 'bg-slate-500/20' };
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { icon, color, bgColor } = getIconAndColor(service.type);
  
  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-orange-500/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ${color}`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-white">{service.name}</h4>
          <p className="text-xs font-medium text-orange-400 mb-1">{service.distanceFromStartKm} km mark</p>
          <p className="text-sm text-slate-300 mb-2">{service.description}</p>
          {service.amenities && service.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {service.amenities.map((amenity, index) => (
                <span key={index} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
