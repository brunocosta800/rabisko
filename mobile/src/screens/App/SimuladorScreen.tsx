import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ImagePlus, Sparkles, Camera, Wand2 } from 'lucide-react-native';

import { Header } from '../../components/common/Header';

/**
 * Simulador (DESIGN.md §10 #07 — BiskoAI.jsx). Pre-visualiza a tatuagem no corpo do cliente
 * usando uma foto + uma referência do desenho. Contraparte mobile do `boofcv-all` no backend
 * (Spring) — ainda não wired.
 *
 * Por enquanto é só uma tela-placeholder ligada à aba do BottomNav: hero com Bebas + copy +
 * dois CTAs ("Tirar foto" / "Carregar do rolo"). Quando o `expo-image-picker` for plugado,
 * cada CTA dispara a câmera/galeria, depois um segundo passo pede a referência da tatuagem,
 * e aí o pipeline (BoofCV no backend) compõe a simulação.
 */

export function SimuladorScreen() {
  return (
    <View className="flex-1 bg-background">
      <Header title="Simulador" />

      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — copy + selo "novidade" */}
        <View className="flex-row items-center mt-1 mb-3" style={{ gap: 8 }}>
          <View
            className="bg-plum items-center justify-center"
            style={{ width: 28, height: 28, borderRadius: 14 }}
          >
            <Sparkles size={14} color="#FFFFFF" />
          </View>
          <Text className="font-body-bold text-[10px] tracking-widest text-plum">
            BISKO AI · NOVIDADE
          </Text>
        </View>

        <Text className="font-display text-[44px] leading-[44px] text-ink mb-3">
          VEJA NO SEU{'\n'}CORPO ANTES{'\n'}DE TATUAR
        </Text>

        <Text className="font-body text-[14px] leading-[20px] text-fg-2 mb-6">
          Tire uma foto do braço, perna ou onde quiser, escolha uma referência de tatuagem e a
          gente compõe a simulação pra você ver como vai ficar.
        </Text>

        {/* Hero ilustrativo (placeholder até o fluxo real) */}
        <View
          className="bg-surface items-center justify-center rounded-r-xl mb-6"
          style={{ aspectRatio: 4 / 3 }}
        >
          <View
            className="bg-plum-tint items-center justify-center mb-3"
            style={{ width: 64, height: 64, borderRadius: 32 }}
          >
            <Wand2 size={28} color="#602C66" />
          </View>
          <Text className="font-body-semibold text-[14px] text-ink">Nenhuma simulação ainda</Text>
          <Text className="font-body text-[12px] text-fg-3 mt-1 text-center px-6">
            Toque em &quot;Tirar foto&quot; pra começar.
          </Text>
        </View>

        {/* CTAs — dois caminhos pra alimentar a foto-base */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-ink flex-row items-center justify-center py-4 rounded-r-md mb-3"
          style={{ gap: 10 }}
          // TODO: plugar `expo-image-picker` (launchCameraAsync) — passar a imagem pro pipeline.
        >
          <Camera size={18} color="#FFFFFF" />
          <Text className="font-body-bold text-[16px] text-surface">Tirar foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-surface flex-row items-center justify-center py-4 rounded-r-md"
          style={{ gap: 10 }}
          // TODO: plugar `expo-image-picker` (launchImageLibraryAsync).
        >
          <ImagePlus size={18} color="#000000" />
          <Text className="font-body-bold text-[16px] text-ink">Carregar do rolo</Text>
        </TouchableOpacity>

        <Text className="font-body text-[11px] text-fg-3 text-center mt-6">
          Suas simulações ficam salvas aqui e podem ser enviadas direto no chat com o artista.
        </Text>
      </ScrollView>
    </View>
  );
}
