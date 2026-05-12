import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Icons from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const DATA = [
  { id: '1', name: 'João Santos', style: 'Realismo', rating: 4.9, address: 'Rua Augusta, 100 - SP', dist: '1.2km', image: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=400&auto=format&fit=crop', coordinate: { latitude: -23.5594, longitude: -46.6624 } },
  { id: '2', name: 'Ana Ink', style: 'Fine Line', rating: 5.0, address: 'Av. Paulista, 1500 - SP', dist: '0.8km', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop', coordinate: { latitude: -23.5614, longitude: -46.6554 } },
  { id: '3', name: 'Estúdio Fênix', style: 'Tradicional', rating: 4.8, address: 'Rua Oscar Freire, 500 - SP', dist: '2.5km', image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=400&auto=format&fit=crop', coordinate: { latitude: -23.5654, longitude: -46.6664 } },
];

const mapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] }
];

export function SearchScreen() {
  const navigation = useNavigation<any>();
  const [viewMode, setViewMode] = React.useState<'map' | 'list'>('map');
  const [selectedArtist, setSelectedArtist] = React.useState(DATA[0]);

  // Icons com proteção contra undefined
  const { Search: SearchIcon, Star, List, Map: MapIcon } = Icons;

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {viewMode === 'map' ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: -23.5614,
            longitude: -46.6604,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          customMapStyle={mapStyle}
        >
          {DATA.map((item) => (
            <Marker
              key={item.id}
              coordinate={item.coordinate}
              onPress={() => setSelectedArtist(item)}
            >
              <View className="items-center">
                <View className="bg-[#eaddd7] p-1 rounded-full border-2 border-black shadow-lg">
                  <Image source={{ uri: item.image }} className="w-10 h-10 rounded-full" />
                </View>
                <View className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <ScrollView className="flex-1 pt-40 px-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          {DATA.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <TouchableOpacity 
                onPress={() => navigation.navigate('Home', { 
                  screen: 'EstablishmentProfile', 
                  params: { id: item.id } 
                })}
                className="bg-white rounded-[40px] mb-6 overflow-hidden shadow-sm border border-black/5"
              >
                <Image source={{ uri: item.image }} className="w-full h-56" />
                <View className="p-6">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-black font-black text-xl uppercase tracking-tight">{item.name}</Text>
                      <Text className="text-black/40 text-[10px] font-bold uppercase tracking-widest mt-1">{item.style}</Text>
                    </View>
                    <View className="bg-[#eaddd7] px-3 py-1.5 rounded-full flex-row items-center">
                      {Star && <Star size={12} color="#000" fill="#000" />}
                      <Text className="text-black font-black text-[10px] ml-1">{item.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      )}

      {/* TOP HEADER OVERLAY */}
      <View className="absolute top-16 left-8 right-8">
        <View className="flex-row items-center">
          <View className="flex-1 bg-[#eaddd7] flex-row items-center px-6 h-16 rounded-[24px] shadow-lg">
            {SearchIcon && <SearchIcon size={20} color="#000" strokeWidth={3} />}
            <TextInput 
              placeholder="Onde você quer tatuar?"
              className="flex-1 ml-3 font-bold text-black"
              placeholderTextColor="rgba(0,0,0,0.3)"
            />
          </View>
          
          <TouchableOpacity 
            onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="bg-black w-16 h-16 rounded-[24px] ml-3 items-center justify-center shadow-lg"
          >
            {viewMode === 'map' ? (
              List && <List size={24} color="#fff" strokeWidth={2.5} />
            ) : (
              MapIcon && <MapIcon size={24} color="#fff" strokeWidth={2.5} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* QUICK FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
          {['Proximidade', 'Preço', 'Estilo', 'Melhores Notas'].map((filter) => (
            <TouchableOpacity key={filter} className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full mr-2 border border-black/5 shadow-sm">
              <Text className="text-black font-black text-[10px] uppercase tracking-widest">{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* BOTTOM ARTIST CARD (Only in Map View) */}
      {viewMode === 'map' && selectedArtist && (
        <Animated.View 
          entering={FadeInUp.duration(600)}
          className="absolute bottom-32 left-8 right-8"
        >
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home', { 
              screen: 'EstablishmentProfile', 
              params: { id: selectedArtist.id } 
            })}
            className="bg-[#eaddd7] p-6 rounded-[40px] flex-row items-center shadow-2xl"
          >
            <Image 
              source={{ uri: selectedArtist.image }}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <View className="flex-1 ml-5">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-black font-black text-xl tracking-tighter">{selectedArtist.name}</Text>
                <View className="bg-black px-2 py-1 rounded-lg flex-row items-center">
                  <Text className="text-white font-black text-[10px]">{selectedArtist.rating}</Text>
                  {Star && <Star size={8} color="#fff" fill="#fff" className="ml-1" />}
                </View>
              </View>
              <Text className="text-black/60 text-[10px] font-bold mb-3 uppercase tracking-widest">{selectedArtist.style} • {selectedArtist.dist}</Text>
              <View className="bg-black py-2.5 rounded-full items-center justify-center">
                <Text className="text-white font-black text-[10px] uppercase tracking-widest">Ver detalhes</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
