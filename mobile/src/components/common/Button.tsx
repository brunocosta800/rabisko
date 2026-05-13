import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, radius } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'plum' | 'ghost';
  full?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({ title, loading, variant = 'primary', full, style, ...rest }: ButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const onPressIn = () => { scale.value = withSpring(0.97, { damping: 15 }); };
  const onPressOut = () => { scale.value = withSpring(1, { damping: 15 }); };

  const bg = {
    primary:   colors.ink,
    secondary: 'transparent',
    plum:      colors.plum,
    ghost:     'transparent',
  }[variant];

  const textColor = {
    primary:   colors.onInk,
    secondary: colors.ink,
    plum:      '#FFFFFF',
    ghost:     colors.ink,
  }[variant];

  return (
    <AnimatedTouchable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
      disabled={loading}
      style={[
        styles.base,
        { backgroundColor: bg, width: full ? '100%' : undefined },
        variant === 'secondary' && styles.bordered,
        animStyle,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{title}</Text>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },
});
