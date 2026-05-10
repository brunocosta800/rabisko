import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  secure?: boolean;
}

export function Input({ label, icon: Icon, error, secure, className, onFocus, onBlur, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const focused = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 1.5,
      borderColor: withTiming(focused.value === 1 ? '#000' : 'transparent'),
    };
  });

  const handleFocus = (e: any) => {
    focused.value = 1;
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    focused.value = 0;
    onBlur?.(e);
  };

  return (
    <View className={`mb-5 ${className}`}>
      {label && <Text className="text-sm font-bold text-black uppercase tracking-widest mb-2 ml-1 text-[11px]">{label}</Text>}
      
      <Animated.View 
        style={animatedStyle}
        className={`flex-row items-center bg-[#eaddd7] rounded-[24px] px-5 py-4 ${error ? 'border border-red-500' : ''}`}
      >
        {Icon && (
          <View className="mr-3">
            <Icon size={20} color="#000" strokeWidth={2.5} />
          </View>
        )}
        
        <TextInput
          className="flex-1 text-black text-base font-semibold"
          placeholderTextColor="rgba(0,0,0,0.3)"
          secureTextEntry={secure && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} color="#000" strokeWidth={2.5} /> : <Eye size={20} color="#000" strokeWidth={2.5} />}
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && <Text className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-4">{error}</Text>}
    </View>
  );
}
