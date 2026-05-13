import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Clock, ChevronRight, QrCode } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors, spacing, radius } from '../../theme';

type BookingStatus = 'confirmado' | 'aguardando' | 'concluido';

interface Booking {
  id: string;
  artist: string;
  style: string;
  date: string;
  time: string;
  status: BookingStatus;
}

const BOOKINGS: Booking[] = [
  { id: '1', artist: 'João Santos',   style: 'Realismo',   date: '15 Mai 2025', time: '14:00', status: 'confirmado' },
  { id: '2', artist: 'Ana Costa',     style: 'Aquarela',   date: '22 Mai 2025', time: '10:00', status: 'aguardando' },
  { id: '3', artist: 'Lia Prata',     style: 'Minimalista',date: '03 Abr 2025', time: '11:00', status: 'concluido'  },
];

const STATUS_META: Record<BookingStatus, { label: string; bg: string; text: string }> = {
  confirmado: { label: 'Confirmado',  bg: colors.plumTint,   text: colors.plum   },
  aguardando: { label: 'Aguardando', bg: '#FFF5E6',          text: colors.warning },
  concluido:  { label: 'Concluído',  bg: '#E9F5EE',          text: colors.success },
};

export function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = React.useState<'ativas' | 'historico'>('ativas');

  const filtered = tab === 'ativas'
    ? BOOKINGS.filter((b) => b.status !== 'concluido')
    : BOOKINGS.filter((b) => b.status === 'concluido');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Agendamentos</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['ativas', 'historico'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'ativas' ? 'Ativas' : 'Histórico'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 100, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 && (
          <Text style={styles.empty}>Nenhum agendamento encontrado.</Text>
        )}
        {filtered.map((b, i) => {
          const meta = STATUS_META[b.status];
          return (
            <Animated.View key={b.id} entering={FadeInDown.delay(i * 80).duration(350).springify()}>
              <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                {/* Left: avatar placeholder */}
                <View style={styles.cardAvatar} />

                <View style={styles.cardBody}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.cardArtist}>{b.artist}</Text>
                    <View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
                      <Text style={[styles.statusText, { color: meta.text }]}>{meta.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardStyle}>{b.style}</Text>
                  <View style={styles.cardMeta}>
                    <View style={styles.metaItem}>
                      <Calendar size={11} color={colors.fg3} />
                      <Text style={styles.metaText}>{b.date}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={11} color={colors.fg3} />
                      <Text style={styles.metaText}>{b.time}</Text>
                    </View>
                  </View>
                </View>

                <ChevronRight size={18} color={colors.fg3} />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing[6], paddingTop: spacing[4], paddingBottom: spacing[2] },
  title: { fontFamily: 'BebasNeue', fontSize: 32, color: colors.ink, letterSpacing: 0.5 },
  tabs: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: spacing[6], marginBottom: spacing[4],
  },
  tab: {
    paddingVertical: 8, paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  tabActive: { backgroundColor: colors.ink },
  tabText: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: colors.fg2 },
  tabTextActive: { color: colors.onInk },
  scroll: { flex: 1, paddingHorizontal: spacing[6] },
  empty: { fontFamily: 'Inter', fontSize: 14, color: colors.fg3, textAlign: 'center', paddingTop: spacing[10] },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.paper,
    borderRadius: radius.lg, padding: spacing[4],
    borderWidth: 1, borderColor: colors.hairline,
    gap: 12,
  },
  cardAvatar: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.surface },
  cardBody: { flex: 1, gap: 3 },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardArtist: { fontFamily: 'Inter', fontSize: 15, fontWeight: '700', color: colors.ink },
  cardStyle: { fontFamily: 'Inter', fontSize: 12, color: colors.fg2 },
  cardMeta: { flexDirection: 'row', gap: 12, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: 'Inter', fontSize: 11, color: colors.fg3 },
  statusPill: { borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8 },
  statusText: { fontFamily: 'Inter', fontSize: 10, fontWeight: '700' },
});
