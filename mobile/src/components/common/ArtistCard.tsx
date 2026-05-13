import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star } from 'lucide-react-native';

/**
 * The black hero card (DESIGN.md §8.6 — ArtistCard.jsx): ink top block with a 96px round photo,
 * centered name, outlined style-tag pills, a heart (top-left) and rating (top-right) overlay,
 * and a cream "ver mais..." footer strip. Whole card is a button → ArtistScreen.
 */
interface ArtistCardProps {
  name: string;
  rating: string | number;
  tags?: string[];
  photo?: string;
  favorited?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;
}

export function ArtistCard({
  name,
  rating,
  tags = [],
  photo,
  favorited,
  onToggleFavorite,
  onPress,
}: ArtistCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="overflow-hidden rounded-r-lg"
      accessibilityRole="button"
    >
      <View className="bg-ink px-[22px] pb-[22px] pt-[18px]">
        {onToggleFavorite && (
          <TouchableOpacity
            onPress={onToggleFavorite}
            hitSlop={8}
            className="absolute left-3 top-3 z-10"
            accessibilityRole="button"
            accessibilityLabel={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={20} color="#FFFFFF" fill={favorited ? '#FFFFFF' : 'transparent'} />
          </TouchableOpacity>
        )}

        <View className="absolute right-4 top-4 flex-row items-center">
          <Text className="font-body text-[14px] text-white mr-1.5">{rating}</Text>
          <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
        </View>

        <View
          className="mx-auto mb-3 mt-2 bg-surface rounded-r-lg overflow-hidden"
          style={{ width: 96, height: 96 }}
        >
          {photo ? <Image source={{ uri: photo }} className="w-full h-full" /> : null}
        </View>

        <Text className="text-center font-body-semibold text-[18px] text-white">{name}</Text>

        {tags.length > 0 && (
          <View className="flex-row flex-wrap justify-center mt-3.5" style={{ gap: 8 }}>
            {tags.map((t) => (
              <View key={t} className="rounded-r-pill border border-white px-3 py-1">
                <Text className="font-body-medium text-[11px] text-white">{t}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View className="bg-surface items-center py-2.5">
        <Text className="font-body text-[14px] text-ink">ver mais...</Text>
      </View>
    </TouchableOpacity>
  );
}
