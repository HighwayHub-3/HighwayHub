
import React from 'react';
import { RouteData, Service, ServiceType } from '../types';
import { ServiceCard } from './ServiceCard';
import { PetrolIcon, EvChargerIcon, RestaurantIcon, RepairIcon, HotelIcon } from './icons/ServiceIcons';

interface MapViewProps {
  route: RouteData;
  services: Service[];
}

const getIconForService = (type: ServiceType) => {
  switch (type) {
    case ServiceType.PETROL: return <PetrolIcon className="w-full h-full" />;
    case ServiceType.EV_CHARGING: return <EvChargerIcon className="w-full h-full" />;
    case ServiceType.RESTAURANT: return <RestaurantIcon className="w-full h-full" />;
    case ServiceType.REPAIR: return <RepairIcon className="w-full h-full" />;
    case ServiceType.HOTEL: return <HotelIcon className="w-full h-full" />;
    default: return null;
  }
};

const getColorForService = (type: ServiceType) => {
  switch (type) {
    case ServiceType.PETROL: return 'bg-sky-500';
    case ServiceType.EV_CHARGING: return 'bg-green-500';
    case ServiceType.RESTAURANT: return 'bg-amber-500';
    case ServiceType.REPAIR: return 'bg-rose-500';
    case ServiceType.HOTEL: return 'bg-indigo-500';
    default: return 'bg-slate-500';
  }
};

export const MapView: React.FC<MapViewProps> = ({ route, services }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Highway visualization */}
      <div className="lg:col-span-2 bg-slate-900/70 p-6 rounded-xl border border-slate-700 relative overflow-hidden min-h-[400px] lg:min-h-[600px]">
        <h2 className="text-xl font-bold text-center mb-6 text-white">
          Route: <span className="text-orange-400">{route.from}</span> to <span className="text-orange-400">{route.to}</span> ({route.totalDistanceKm} km)
        </h2>
        
        {/* Highway Line */}
        <div className="absolute top-24 bottom-16 left-1/2 -translate-x-1/2 w-2 bg-slate-700 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-500/30"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-500/30"></div>
            {/* Dashed lines */}
            <div className="h-full w-full" style={{backgroundImage: `linear-gradient(to bottom, #475569 50%, transparent 50%)`, backgroundSize: '2px 20px'}}></div>
        </div>
        
        {/* Services on map */}
        <div className="relative h-full pt-16 pb-16">
           {services.map((service, index) => {
                const topPercentage = (service.distanceFromStartKm / route.totalDistanceKm) * 100;
                const side = index % 2 === 0 ? 'left' : 'right';
                const positionClasses = side === 'left' ? 'left-1/2 -translate-x-[200%] xl:-translate-x-[300%]' : 'left-1/2 translate-x-[100%] xl:translate-x-[200%]';

                return (
                    <div
                        key={service.id}
                        className={`absolute group transition-transform duration-300 hover:scale-110 hover:z-20 ${positionClasses}`}
                        style={{ top: `${topPercentage}%` }}
                    >
                        <div className={`relative w-12 h-12 p-2 rounded-full text-white cursor-pointer ring-4 ring-slate-800 ${getColorForService(service.type)}`}>
                            {getIconForService(service.type)}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 w-max max-w-xs p-3 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30
                            ${side === 'left' ? 'right-0' : 'left-0'}"
                        >
                            <p className="font-bold">{service.name}</p>
                            <p className="text-xs text-slate-400">{service.distanceFromStartKm} km from {route.from}</p>
                        </div>
                    </div>
                )
           })}
        </div>
      </div>

      {/* Services List */}
      <div className="lg:col-span-1 bg-slate-900/70 p-4 rounded-xl border border-slate-700 max-h-[600px] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 text-slate-300">Services on Your Route</h3>
        <div className="space-y-3">
          {services.length > 0 ? (
            services.map(service => <ServiceCard key={service.id} service={service} />)
          ) : (
            <p className="text-slate-400 text-center py-8">No services match the active filters. Try selecting more service types.</p>
          )}
        </div>
      </div>
    </div>
  );
};
