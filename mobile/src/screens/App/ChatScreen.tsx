import React from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors, spacing, radius } from '../../theme';

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
}

const INITIAL: Message[] = [
  { id: '1', text: 'Olá! Vi seu portfólio e adorei seu trabalho em realismo.', fromMe: false, time: '14:32' },
  { id: '2', text: 'Obrigado! Que tipo de tatuagem você quer fazer?', fromMe: true, time: '14:33' },
  { id: '3', text: 'Quero um lobo no antebraço, algo minimalista mas com textura realista.', fromMe: false, time: '14:35' },
  { id: '4', text: 'Ótima escolha! Tenho disponibilidade na próxima semana. Quer agendar?', fromMe: true, time: '14:36' },
];

export function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = React.useState<Message[]>(INITIAL);
  const [input, setInput] = React.useState('');
  const scrollRef = React.useRef<ScrollView>(null);

  const send = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: String(Date.now()),
      text: input.trim(),
      fromMe: false,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, msg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      {/* Topbar */}
      <View style={[styles.topbar, { paddingTop: insets.top + 8 }]}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.contactName}>João Santos</Text>
          <Text style={styles.contactStatus}>Online agora</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesList}
        contentContainerStyle={{ paddingHorizontal: spacing[6], paddingTop: spacing[4], paddingBottom: spacing[4], gap: 8 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((msg, i) => (
          <Animated.View
            key={msg.id}
            entering={FadeInDown.delay(i < 4 ? 0 : 50).duration(200).springify()}
            style={[styles.bubbleWrapper, msg.fromMe ? styles.bubbleRight : styles.bubbleLeft]}
          >
            <View style={[styles.bubble, msg.fromMe ? styles.bubbleFromMe : styles.bubbleFromThem]}>
              <Text style={[styles.bubbleText, msg.fromMe && styles.bubbleTextMe]}>{msg.text}</Text>
            </View>
            <Text style={[styles.time, msg.fromMe ? styles.timeRight : styles.timeLeft]}>{msg.time}</Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Composer */}
      <View style={[styles.composer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={styles.attachBtn}>
          <Paperclip size={20} color={colors.fg3} />
        </TouchableOpacity>
        <TextInput
          style={styles.composerInput}
          placeholder="Mensagem..."
          placeholderTextColor={colors.fg3}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={send}
        />
        <TouchableOpacity
          style={[styles.sendBtn, input.trim() && styles.sendBtnActive]}
          onPress={send}
          disabled={!input.trim()}
        >
          <Send size={18} color={input.trim() ? colors.onInk : colors.fg3} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  topbar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[6], paddingBottom: spacing[4],
  },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.hairline },
  contactName: { fontFamily: 'Inter', fontSize: 15, fontWeight: '700', color: colors.ink },
  contactStatus: { fontFamily: 'Inter', fontSize: 11, color: colors.plum },
  messagesList: { flex: 1 },
  bubbleWrapper: { maxWidth: '80%' },
  bubbleLeft: { alignSelf: 'flex-start' },
  bubbleRight: { alignSelf: 'flex-end' },
  bubble: {
    borderRadius: radius.lg,
    paddingVertical: 10, paddingHorizontal: 14,
  },
  bubbleFromThem: { backgroundColor: colors.surface },
  bubbleFromMe: { backgroundColor: colors.ink },
  bubbleText: { fontFamily: 'Inter', fontSize: 14, color: colors.ink, lineHeight: 20 },
  bubbleTextMe: { color: colors.onInk },
  time: { fontFamily: 'Inter', fontSize: 10, color: colors.fg3, marginTop: 4 },
  timeLeft: { alignSelf: 'flex-start' },
  timeRight: { alignSelf: 'flex-end' },
  composer: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: spacing[4], paddingTop: spacing[3],
    borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.paper,
  },
  attachBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  composerInput: {
    flex: 1,
    fontFamily: 'Inter', fontSize: 14, color: colors.ink,
    backgroundColor: colors.surface,
    borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 10,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.hairline,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnActive: { backgroundColor: colors.ink },
});
