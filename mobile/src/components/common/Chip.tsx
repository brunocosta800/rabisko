import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

/**
 * The three chip variants from the design system (DESIGN.md §8.5 — Chip.jsx).
 *  - FilterChip: pill, cream → ink fill when active; optional leading icon. (Home filters.)
 *  - PrefChip:   pill, ink → plum when selected; always white uppercase label. (Inside cards.)
 *  - StatusPill: pill; tone `ink` = cream + ink border, tone `plum` = plum fill. ("Pago", …)
 */

interface FilterChipProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onPress?: () => void;
}

export function FilterChip({ label, icon: Icon, active, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      className={`flex-row items-center rounded-r-pill px-4 py-2 ${active ? 'bg-ink' : 'bg-surface'}`}
    >
      {Icon && <Icon size={14} color={active ? '#FFFFFF' : '#000000'} style={{ marginRight: 8 }} />}
      <Text className={`font-body text-[14px] ${active ? 'text-white' : 'text-ink'}`}>{label}</Text>
    </TouchableOpacity>
  );
}

interface PrefChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function PrefChip({ label, selected, onPress }: PrefChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      className={`rounded-r-pill px-[18px] py-2.5 ${selected ? 'bg-plum' : 'bg-ink'}`}
    >
      <Text className="font-body-bold text-[13px] uppercase text-white" style={{ letterSpacing: 0.4 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

type StatusTone = 'ink' | 'plum';

interface StatusPillProps {
  label: string;
  tone?: StatusTone;
}

export function StatusPill({ label, tone = 'ink' }: StatusPillProps) {
  const isPlum = tone === 'plum';
  return (
    <View
      className={`rounded-r-pill px-3.5 py-1.5 ${isPlum ? 'bg-plum' : 'bg-surface border border-ink'}`}
    >
      <Text className={`font-body-bold text-[12px] ${isPlum ? 'text-white' : 'text-ink'}`}>{label}</Text>
    </View>
  );
}
