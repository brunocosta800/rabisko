import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

export type Role = 'cliente' | 'artista' | 'estudio';

const ROLES: { id: Role; label: string }[] = [
  { id: 'cliente',  label: 'Cliente' },
  { id: 'artista',  label: 'Artista' },
  { id: 'estudio',  label: 'Estúdio' },
];

interface RoleSwitchProps {
  value: Role;
  onChange: (role: Role) => void;
}

export function RoleSwitch({ value, onChange }: RoleSwitchProps) {
  return (
    <View style={styles.container}>
      {ROLES.map((r) => (
        <TouchableOpacity
          key={r.id}
          onPress={() => onChange(r.id)}
          style={[styles.option, value === r.id && styles.optionActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, value === r.id && styles.labelActive]}>
            {r.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 4,
    gap: 6,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: radius.xs,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: colors.ink,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: colors.ink,
  },
  labelActive: {
    color: colors.onInk,
  },
});
