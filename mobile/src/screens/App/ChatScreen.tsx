import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageSquarePlus } from 'lucide-react-native';

/**
 * Conversations list (DESIGN.md screen 08 — Chat). Static for now; the full message thread
 * with image attachments (the design's ChatV2) is still pending — see IMPLEMENTATION-CHECKLIST.md P2.
 */
const CONVERSATIONS = [
  { id: '1', name: 'João Santos', initials: 'JS', preview: 'Combinado! Te vejo na terça-feira...', time: 'Ontem' },
  { id: '2', name: 'Ana Costa', initials: 'AC', preview: 'Te mando a referência amanhã.', time: 'Ontem' },
  { id: '3', name: 'Lia Prata', initials: 'LP', preview: 'Pago via Pix mais tarde, ok?', time: 'Sex' },
];

export function ChatScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-8"
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-display text-[32px] text-ink tracking-wide">Mensagens</Text>
        <Text className="font-body text-[14px] text-fg-2 mt-2">
          Converse direto com os tatuadores que você reservou.
        </Text>

        <View className="mt-6">
          {CONVERSATIONS.map((c) => (
            <TouchableOpacity key={c.id} activeOpacity={0.8} className="flex-row items-center py-3">
              <View
                className="bg-ink items-center justify-center rounded-r-pill mr-3"
                style={{ width: 46, height: 46 }}
              >
                <Text className="font-body-semibold text-[14px] text-white">{c.initials}</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="font-body-semibold text-[14px] text-ink">{c.name}</Text>
                  <Text className="font-body text-[11px] text-fg-3">{c.time}</Text>
                </View>
                <Text className="font-body text-[12px] text-fg-2 mt-1" numberOfLines={1}>
                  {c.preview}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="font-body text-[11px] text-fg-3 text-center mt-6">
          Inicie novas conversas visitando o perfil de um artista e tocando em &quot;Iniciar Conversa&quot;.
        </Text>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Nova conversa"
        className="absolute self-center bg-surface items-center justify-center rounded-r-pill"
        style={{ bottom: 24, width: 48, height: 48 }}
      >
        <MessageSquarePlus size={22} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}
