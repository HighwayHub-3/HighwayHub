
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { RoutePlanner } from './components/RoutePlanner';
import { ServiceFilters } from './components/ServiceFilters';
import { MapView } from './components/MapView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { planRouteWithAI } from './services/geminiService';
import { Service, ServiceType, RouteData } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [activeFilters, setActiveFilters] = useState<ServiceType[]>(Object.values(ServiceType));

  const handlePlanRoute = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setRouteData(null);
    setServices([]);
    try {
      const result = await planRouteWithAI(prompt);
      if (result) {
        setRouteData(result.route);
        // Sort services by distance to render them in order on the highway
        const sortedServices = result.services.sort((a, b) => a.distanceFromStartKm - b.distanceFromStartKm);
        setServices(sortedServices);
      }
    } catch (err) {
      setError('Failed to plan route. The AI model might be busy. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredServices = useMemo(() => {
    return services.filter(service => activeFilters.includes(service.type));
  }, [services, activeFilters]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col gap-6">
        <RoutePlanner onPlanRoute={handlePlanRoute} isLoading={isLoading} />
        {error && <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
        
        {isLoading && <LoadingSpinner />}

        {!isLoading && !routeData && !error && <WelcomeScreen />}

        {routeData && services.length > 0 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <ServiceFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            <MapView route={routeData} services={filteredServices} />
          </div>
        )}

        {!isLoading && routeData && services.length === 0 && !error && (
            <div className="text-center text-amber-400 bg-amber-900/50 p-4 rounded-lg mt-8">
                The AI planned a route from {routeData.from} to {routeData.to}, but no specific services were found for your request. Try a different query.
            </div>
        )}
      </main>
      <footer className="text-center p-4 text-xs text-slate-500">
        <p>Highway Hub India | Digitally Transforming Your Journey</p>
      </footer>
    </div>
  );
};

export default App;
