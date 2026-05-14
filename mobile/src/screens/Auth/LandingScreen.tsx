import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthRoutesParamList } from '../../routes/auth.routes';
import { Button } from '../../components/common/Button';

/**
 * Landing (#01 in design/screenshots/01-landing.png) — initial route of `AuthRoutes`.
 * Vertically + horizontally centered: ink logo block 132×132 (`r-2xl`), "RABISKO" in Bebas 64,
 * tagline 14/Inter centered (max 280), primary CTA "Entrar", then text link "Novo por aqui?
 * Criar conta".
 *
 * Logo asset: the design references `assets/logo-bisko-mark.png` (white octopus silhouette on
 * ink) — that file is not yet in the repo. We render a stylized "R" placeholder in white Bebas
 * for now; when the asset is dropped under `assets/images/`, swap the `<Text>` below for an
 * `<Image source={require(...)} />` at the same 132×132 sizing.
 */
export function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-background items-center justify-center px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
    >
      {/* Logo block — ink square r-2xl. TODO: replace placeholder with the octopus mark image. */}
      <View
        className="bg-ink rounded-r-2xl items-center justify-center mb-7"
        style={{ width: 132, height: 132 }}
      >
        <Text className="font-display text-[80px] leading-[80px] text-on-ink">R</Text>
      </View>

      <Text className="font-display text-[64px] leading-[62px] text-ink" style={{ letterSpacing: 1.3 }}>
        RABISKO
      </Text>

      <Text
        className="font-body text-[14px] text-fg-2 text-center mt-3.5 mb-12"
        style={{ maxWidth: 280 }}
      >
        Transforme sua vida com um Rabisko.
      </Text>

      <View className="w-full">
        <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
      </View>

      <View className="flex-row mt-5">
        <Text className="font-body text-[14px] text-fg-2">Novo por aqui? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} hitSlop={8}>
          <Text className="font-body-bold text-[14px] text-ink">Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
