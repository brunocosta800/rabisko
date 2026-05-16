import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { ImagePlus, Sparkles, Camera, Wand2, ArrowUpDown, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
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

type ImageInfo = { uri: string; width: number; height: number };

export function SimuladorScreen() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  
  // Reanimated values for pan, zoom, and rotation
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedOffset = useSharedValue({ x: 0, y: 0 });
  const savedScale = useSharedValue(1);
  const savedRotation = useSharedValue(0);

  const handleImageAdded = (uri: string, width: number, height: number) => {
    if (images.length < 2) {
      setImages((prev) => [...prev, { uri, width, height }]);
    }
  };

  const abrirCamera = async () => {
    if (images.length >= 2) return;
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permissão necessária',
        'É necessário permitir o acesso à câmera para tirar uma foto.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      handleImageAdded(asset.uri, asset.width, asset.height);
    }
  };

  const abrirGaleria = async () => {
    if (images.length >= 2) return;
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permissão necessária',
        'É necessário permitir o acesso à galeria para escolher uma foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      handleImageAdded(asset.uri, asset.width, asset.height);
    }
  };

  const inverterImagens = () => {
    if (images.length === 2) {
      setImages([images[1], images[0]]);
    }
  };

  const limparImagens = () => {
    setImages([]);
    offset.value = { x: 0, y: 0 };
    scale.value = 1;
    rotation.value = 0;
    savedOffset.value = { x: 0, y: 0 };
    savedScale.value = 1;
    savedRotation.value = 0;
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: savedOffset.value.x + e.translationX,
        y: savedOffset.value.y + e.translationY,
      };
    })
    .onEnd(() => {
      savedOffset.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + (e.rotation * 180) / Math.PI;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <View className="flex-1 bg-background">
      <Header title="Simulador" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
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

        {/* Hero ilustrativo (placeholder até o fluxo real). `width: '100%'` é obrigatório:
            quando uma View tem só `aspectRatio` (sem width), o Yoga sized-to-content em vez de
            esticar — ela encolhe pro tamanho dos filhos e sobra margem na direita. */}
        <GestureHandlerRootView>
          <View
            className="bg-surface items-center justify-center rounded-xl mb-6 overflow-hidden"
            style={{ width: '100%', aspectRatio: images.length > 0 ? images[0].width / images[0].height : 4 / 3, position: 'relative' }}
          >
            {images.length === 0 ? (
              <>
                <View
                  className="bg-plum-tint items-center justify-center mb-3"
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                >
                  <Wand2 size={28} color="#602C66" />
                </View>
                <Text className="font-body-semibold text-[14px] text-ink">Nenhuma simulação ainda</Text>
                <Text className="font-body text-[12px] text-fg-3 mt-1 text-center px-6">
                  Toque em &quot;Tirar foto&quot; ou carregue da galeria para começar.
                </Text>
              </>
            ) : (
              <>
                <Image
                  source={{ uri: images[0].uri }}
                  style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%', resizeMode: 'cover' }]}
                />
                
                {images.length > 1 && (
                  <GestureDetector gesture={composed}>
                    <Animated.Image
                      source={{ uri: images[1].uri }}
                      style={[
                        { width: '50%', height: '50%', resizeMode: 'contain', opacity: 0.9 },
                        animatedStyle,
                      ]}
                    />
                  </GestureDetector>
                )}
              </>
            )}
          </View>
        </GestureHandlerRootView>

        {images.length < 2 && (
          <>
            <TouchableOpacity // Botão tirar foto
              activeOpacity={0.65}
              className="bg-ink flex-row items-center justify-center py-4 rounded-md mb-3"
              style={{ gap: 10 }}
              onPress={abrirCamera}
            >
              <Camera size={18} color="#FFFFFF" />
              <Text className="font-body-bold text-[16px] text-surface">
                {images.length === 0 ? 'Tirar foto (Base)' : 'Tirar foto (Referência)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity // Botão importar foto
              activeOpacity={0.65}
              className="bg-surface flex-row items-center justify-center py-4 rounded-md mb-3"
              style={{ gap: 10 }}
              onPress={abrirGaleria}
            >
              <ImagePlus size={18} color="#000000" />
              <Text className="font-body-bold text-[16px] text-ink">
                {images.length === 0 ? 'Carregar da galeria (Base)' : 'Carregar da galeria (Ref)'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {images.length === 2 && (
          <View className="flex-row gap-3 mb-3">
            <TouchableOpacity
              activeOpacity={0.65}
              className="bg-surface flex-row flex-1 items-center justify-center py-4 rounded-md"
              style={{ gap: 8 }}
              onPress={inverterImagens}
            >
              <ArrowUpDown size={18} color="#000000" />
              <Text className="font-body-bold text-[14px] text-ink">Inverter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.65}
              className="bg-red-50 flex-row flex-1 items-center justify-center py-4 rounded-md"
              style={{ gap: 8, backgroundColor: '#FEE2E2' }}
              onPress={limparImagens}
            >
              <Trash2 size={18} color="#DC2626" />
              <Text className="font-body-bold text-[14px]" style={{ color: '#DC2626' }}>Limpar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text className="font-body text-[11px] text-fg-3 text-center mt-6">
          Suas simulações ficam salvas aqui e podem ser enviadas direto no chat com o artista.
        </Text>
      </ScrollView>
    </View>
  );
}
