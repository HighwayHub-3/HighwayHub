
export enum ServiceType {
  PETROL = 'PETROL',
  EV_CHARGING = 'EV_CHARGING',
  RESTAURANT = 'RESTAURANT',
  REPAIR = 'REPAIR',
  HOTEL = 'HOTEL'
}

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  distanceFromStartKm: number;
  description: string;
  amenities: string[];
}

export interface RouteData {
  from: string;
  to: string;
  totalDistanceKm: number;
}

export interface AIResponse {
    route: RouteData;
    services: Service[];
}
