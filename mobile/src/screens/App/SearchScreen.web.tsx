import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Search, SlidersHorizontal, MapPin, Star } from 'lucide-react-native';

const MARKERS = [
  {
    id: '1',
    name: 'João Santos',
    rating: 4.9,
    price: 'R$ 250+',
  },
  {
    id: '2',
    name: 'Estúdio Fênix',
    rating: 4.8,
    price: 'R$ 150+',
  },
];

export function SearchScreen() {
  const [selectedPlace, setSelectedPlace] = React.useState<any>(null);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header Search */}
      <View style={{ paddingTop: 56, paddingHorizontal: 24 }}>
        <View className="flex-row items-center bg-white rounded-3xl px-4 py-4 shadow-xl">
          <View className="mr-3">
            <Search size={24} color="#000" />
          </View>
          <TextInput
            placeholder="Onde você quer agendar?"
            placeholderTextColor="#666"
            className="flex-1 text-black text-lg"
          />
          <TouchableOpacity className="bg-primary-100 p-2 rounded-xl">
            <SlidersHorizontal size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder for Web */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' }}>
        <MapPin size={48} color="#9ca3af" />
        <Text style={{ color: '#6b7280', fontSize: 16, marginTop: 12 }}>
          Mapa não disponível na versão web
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>
          Use o aplicativo nativo para acessar o mapa
        </Text>
      </View>

      {/* Results list */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        {MARKERS.map((marker) => (
          <TouchableOpacity
            key={marker.id}
            style={{
              backgroundColor: '#000',
              padding: 20,
              borderRadius: 24,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
            activeOpacity={0.9}
            onPress={() => setSelectedPlace(marker)}
          >
            <View style={{
              backgroundColor: '#f2e8e5',
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <MapPin size={24} color="#000" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{marker.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Star size={14} color="#fff" fill="#fff" />
                <Text style={{ color: 'rgba(255,255,255,0.8)', marginLeft: 4 }}>
                  {marker.rating} • Tatuador • {marker.price}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Ver</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
