export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role?: 'cliente' | 'artista' | 'estudio';
}

export interface Estudio {
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
