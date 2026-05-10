export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role?: 'client' | 'establishment' | 'professional';
}

export interface Establishment {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  banner: string;
  tags: string[];
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
  openingHours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];
}

export interface Booking {
  id: string;
  establishmentId: string;
  establishmentName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  serviceName: string;
}
