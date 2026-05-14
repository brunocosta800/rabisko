import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';

export function SimulationScreen() {
  return (
    <View className="flex-1 bg-background">
      <Header title="SIMULADOR" />
      
      <View className="flex-1 px-6 pb-8 pt-4">
        <View className="flex-1 rounded-r-2xl border-2 border-dashed border-hairline bg-surface justify-center px-6">
          <Text className="font-body-bold text-[22px] text-ink text-center mb-2">
            Envie uma foto
          </Text>
          <Text className="font-body text-[14px] text-fg-2 text-center mb-8 px-2 leading-relaxed">
            Foto da região onde quer tatuar. Quanto mais nítida, melhor a simulação.
          </Text>

          <Button 
            title="Tirar Foto" 
            className="w-full mb-4" 
          />

          <TouchableOpacity className="py-2" activeOpacity={0.7}>
            <Text className="font-body-bold text-[14px] text-ink text-center">
              Ou escolher da{'\n'}galeria
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
