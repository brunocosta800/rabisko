import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

/**
 * Screen header (DESIGN.md §12 — Header.jsx): optional back chevron on the left, Bebas Neue
 * title centered, optional `right` slot. Three fixed-width zones so the title stays centered
 * regardless of the back button. Pulls top padding from the safe-area inset.
 */
interface HeaderProps {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function Header({ title, onBack, right }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row items-center px-8 pb-2"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="w-8 items-start">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            hitSlop={8}
          >
            <ChevronLeft size={28} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
      <Text className="flex-1 text-center font-display text-[32px] text-ink tracking-wide" numberOfLines={1}>
        {title}
      </Text>
      <View className="w-8 items-end">{right}</View>
    </View>
  );
}
