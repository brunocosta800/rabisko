import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { QrCode, CheckCircle2, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Header } from '../../components/common/Header';
import { CalendarMini } from '../../components/common/CalendarMini';

/**
 * "Sessões" (DESIGN.md §10 #09 — Calendar / Screens.jsx#CalendarScreen). Overline + Bebas title,
 * `CalendarMini` for visual context, a cream pill-segmented toggle (Próximas/Concluídas), and
 * a list of `SessionRow`s. The "today" row is inverted (ink fill) with a plum CHECK-IN pill;
 * done rows show a plum check; future rows show a chevron. No green/yellow status anywhere.
 *
 * Session Detail (#09b) doesn't exist yet — `onOpen` is a no-op placeholder until that screen lands.
 */

type SessionStatus = 'hoje' | 'confirmada' | 'concluida';

interface Session {
  id: string;
  artistName: string;
  photo: string;
  date: string;       // already pre-formatted (the design's example copy)
  duration: string;   // "3h"
  style: string;      // "Blackwork · antebraço"
  status: SessionStatus;
  code: string;
}

// Mock data mirrored from design/src/ui_kits/mobile-app/components/Screens.jsx#CalendarScreen.
const UPCOMING: Session[] = [
  {
    id: '1',
    artistName: 'João Santos',
    photo: 'https://images.unsplash.com/photo-1682406593404-99578759c260?q=80&w=200&h=200&auto=format&fit=crop',
    date: 'Hoje · 14:00',
    duration: '3h',
    style: 'Blackwork · antebraço',
    status: 'hoje',
    code: 'RBK-4729',
  },
  {
    id: '2',
    artistName: 'Ana Costa',
    photo: 'https://images.unsplash.com/photo-1745953707460-959b97dfa42d?q=80&w=200&h=200&auto=format&fit=crop',
    date: 'Sex · 19 Out · 18:30',
    duration: '2h',
    style: 'Aquarela · panturrilha',
    status: 'confirmada',
    code: 'RBK-5102',
  },
  {
    id: '3',
    artistName: 'Lia Prata',
    photo: 'https://images.unsplash.com/photo-1702700382679-26890ebe71c5?q=80&w=200&h=200&auto=format&fit=crop',
    date: 'Sáb · 27 Out · 11:00',
    duration: '4h',
    style: 'Realismo · braço',
    status: 'confirmada',
    code: 'RBK-5188',
  },
];

const PAST: Session[] = [
  {
    id: '9',
    artistName: 'João Santos',
    photo: 'https://images.unsplash.com/photo-1682406593404-99578759c260?q=80&w=200&h=200&auto=format&fit=crop',
    date: '22 Set · 15:00',
    duration: '2h',
    style: 'Blackwork · pulso',
    status: 'concluida',
    code: 'RBK-4621',
  },
];

const PLUM = '#602C66';

type Tab = 'upcoming' | 'past';

export function BookingsScreen() {
  const [view, setView] = React.useState<Tab>('upcoming');
  // Today (the "Hoje" row) used as the default selected day on the mini calendar.
  const [selectedDate, setSelectedDate] = React.useState<Date>(() => new Date());

  const list = view === 'upcoming' ? UPCOMING : PAST;

  return (
    <View className="flex-1 bg-background">
      <Header title="Sessões" />

      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-aux-bold text-[10px] tracking-widest text-fg-3 mt-1 mb-1.5">
          MINHA AGENDA
        </Text>

        <View className="mb-4">
          <CalendarMini
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            // Let the user browse past months when reviewing concluídas.
            minDate={view === 'past' ? new Date(2000, 0, 1) : undefined}
          />
        </View>

        {/* Pill-segmented toggle — Próximas / Concluídas */}
        <View className="flex-row gap-1 p-1 bg-surface rounded-r-pill mb-4">
          {([['upcoming', 'Próximas'], ['past', 'Concluídas']] as const).map(([key, label]) => {
            const active = view === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => setView(key)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={`flex-1 py-2.5 rounded-r-pill items-center ${active ? 'bg-ink' : 'bg-transparent'}`}
              >
                <Text className={`font-body-semibold text-[12px] ${active ? 'text-surface' : 'text-ink'}`}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {list.length === 0 ? (
          <View className="items-center py-8">
            <Text className="font-body text-[13px] text-fg-3">
              Nenhuma sessão por aqui ainda.
            </Text>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {list.map((s, i) => (
              <Animated.View key={s.id} entering={FadeInDown.delay(40 * i).duration(220)}>
                <SessionRow session={s} onOpen={() => { /* TODO: navegar pra Session Detail (P2 #9b) */ }} />
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function SessionRow({ session, onOpen }: { session: Session; onOpen: () => void }) {
  const isToday = session.status === 'hoje';
  const isDone = session.status === 'concluida';

  return (
    <TouchableOpacity
      onPress={onOpen}
      activeOpacity={0.85}
      className={`flex-row items-center gap-3.5 p-3.5 rounded-r-lg ${isToday ? 'bg-ink' : 'bg-surface'}`}
      accessibilityRole="button"
      accessibilityLabel={`Abrir sessão com ${session.artistName}`}
    >
      <Image
        source={{ uri: session.photo }}
        style={{ width: 52, height: 52, borderRadius: 12 }}
        contentFit="cover"
      />

      <View className="flex-1 min-w-0">
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Text
            className={`font-body-semibold text-[14px] ${isToday ? 'text-surface' : 'text-ink'}`}
            numberOfLines={1}
          >
            {session.artistName}
          </Text>
          {isToday && (
            <View className="rounded-r-pill bg-plum px-[7px] py-[3px]">
              <Text className="font-body-bold text-[10px] tracking-widest text-white">HOJE</Text>
            </View>
          )}
        </View>
        <Text
          className={`font-body text-[11px] mt-1 ${isToday ? 'text-surface' : 'text-fg-2'}`}
          style={{ opacity: isToday ? 0.85 : 0.85 }}
          numberOfLines={1}
        >
          {session.style}
        </Text>
        <Text
          className={`font-body text-[11px] mt-0.5 ${isToday ? 'text-surface' : 'text-fg-2'}`}
          style={{ opacity: isToday ? 0.85 : 0.7 }}
          numberOfLines={1}
        >
          {session.date} · {session.duration}
        </Text>
      </View>

      {isToday ? (
        <View className="flex-row items-center rounded-r-pill bg-plum px-2.5 py-2" style={{ gap: 4 }}>
          <QrCode size={14} color="#FFFFFF" />
          <Text className="font-body-bold text-[11px] text-white tracking-wider">CHECK-IN</Text>
        </View>
      ) : isDone ? (
        <CheckCircle2 size={22} color={PLUM} />
      ) : (
        <ChevronRight size={22} color="#6B6B6B" />
      )}
    </TouchableOpacity>
  );
}
