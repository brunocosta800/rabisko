import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors, radius } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  secure?: boolean;
}

export function Input({ label, icon: Icon, error, secure, onFocus, onBlur, style, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const focused = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(focused.value === 1 ? colors.plum : colors.hairline, { duration: 150 }),
  }));

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.field, animStyle, error ? styles.errorBorder : null]}>
        {Icon && <Icon size={18} color={colors.fg3} strokeWidth={2} style={styles.icon} />}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.fg3}
          secureTextEntry={secure && !showPassword}
          onFocus={(e) => { focused.value = 1; onFocus?.(e); }}
          onBlur={(e) => { focused.value = 0; onBlur?.(e); }}
          {...rest}
        />
        {secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            {showPassword
              ? <EyeOff size={18} color={colors.fg3} strokeWidth={2} />
              : <Eye size={18} color={colors.fg3} strokeWidth={2} />}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    color: colors.fg2,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginLeft: 2,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairline,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: colors.fg1,
  },
  errorBorder: { borderColor: colors.error },
  error: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
});
