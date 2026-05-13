import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { Search, SlidersHorizontal, Bell, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeStackParamList } from '../../routes/home.stack';
import { useAuthStore } from '../../store/authStore';
import { colors, spacing, radius } from '../../theme';

const ARTISTS = [
  { id: '1', name: 'João Santos', rating: '4,9', tags: ['Realismo', 'Minimalista'], style: 'Blackwork' },
  { id: '2', name: 'Ana Costa',   rating: '4,8', tags: ['Aquarela', 'Minimalista'], style: 'Aquarela' },
  { id: '3', name: 'Lia Prata',   rating: '4,9', tags: ['Animais', 'Realismo'],    style: 'Realismo' },
  { id: '4', name: 'Miguel R.',   rating: '4,7', tags: ['Flores', 'Minimalista'],  style: 'Fineline' },
];

const FILTERS = [
  { key: 'Prox',     label: 'Perto' },
  { key: 'Estilo',   label: 'Estilo' },
  { key: 'Preco',    label: 'Preço' },
  { key: 'Agenda',   label: 'Disponível' },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('Prox');
  const [favs, setFavs] = React.useState<Set<string>>(new Set());

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>OLÁ, {(user?.name ?? 'MARIA').split(' ')[0].toUpperCase()}</Text>
            <Text style={styles.location}>Pinheiros, São Paulo</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Bell size={20} color={colors.ink} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Hero headline */}
        <View style={styles.heroBlock}>
          <Text style={styles.heroText}>
            {'ARTISTAS\n'}
            <Text style={styles.heroAccent}>perto de{'\n'}</Text>
            {'VOCÊ'}
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchField}>
            <Search size={18} color={colors.fg3} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Artistas, estúdios, estilos..."
              placeholderTextColor={colors.fg3}
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity>
              <SlidersHorizontal size={18} color={colors.fg3} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.chip, filter === f.key && styles.chipActive]}
            >
              <Text style={[styles.chipText, filter === f.key && styles.chipTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Flash do dia */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash do dia</Text>
            <View style={styles.sectionPill}>
              <Text style={styles.sectionPillText}>Hoje</Text>
            </View>
          </View>
          <Text style={styles.sectionCaption}>Desenhos prontos · agenda da semana</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing[6], gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.flashCard} onPress={() => navigation.navigate('Artist', { id: '1' })}>
                <View style={styles.flashImg} />
                <View style={styles.flashInfo}>
                  <Text style={styles.flashTitle}>{['Cobra fineline', 'Dália aquarela', 'Lobo minimal'][i - 1]}</Text>
                  <Text style={styles.flashArtist}>{ARTISTS[i - 1].name}</Text>
                  <View style={styles.flashBottom}>
                    <Text style={styles.flashPrice}>{['R$ 280', 'R$ 320', 'R$ 240'][i - 1]}</Text>
                    <Text style={styles.flashBadge}>FLASH</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Perto de você */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Perto de você</Text>
          </View>
          <Text style={styles.sectionCaption}>{ARTISTS.length} artistas em até 5 km</Text>
          <View style={styles.grid}>
            {ARTISTS.map((artist, index) => (
              <Animated.View
                key={artist.id}
                entering={FadeInDown.delay(index * 80).duration(400).springify()}
                style={styles.cardWrapper}
              >
                <TouchableOpacity
                  style={styles.artistCard}
                  onPress={() => navigation.navigate('Artist', { id: artist.id })}
                  activeOpacity={0.9}
                >
                  <View style={styles.artistImg} />
                  <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFav(artist.id)}>
                    <Heart
                      size={16}
                      color={favs.has(artist.id) ? colors.plum : '#fff'}
                      fill={favs.has(artist.id) ? colors.plum : 'transparent'}
                    />
                  </TouchableOpacity>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ {artist.rating}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.artistFooter}>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  <Text style={styles.artistStyle}>{artist.style}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
  },
  greeting: { fontFamily: 'Inter', fontSize: 11, color: colors.fg3, letterSpacing: 0.9, textTransform: 'uppercase' },
  location: { fontFamily: 'Inter', fontSize: 12, color: colors.fg2, marginTop: 4 },
  bellBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute', top: 8, right: 9,
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.plum,
  },
  heroBlock: { paddingHorizontal: spacing[6], paddingTop: spacing[4] },
  heroText: {
    fontFamily: 'BebasNeue',
    fontSize: 64,
    color: colors.ink,
    letterSpacing: 0.5,
    lineHeight: 60,
  },
  heroAccent: {
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: 28,
    color: colors.plum,
    textTransform: 'none',
    letterSpacing: 0,
  },
  searchRow: { paddingHorizontal: spacing[6], marginTop: spacing[4] },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: { flex: 1, fontFamily: 'Inter', fontSize: 14, color: colors.ink },
  filterScroll: { paddingHorizontal: spacing[6], paddingTop: spacing[3], gap: 8 },
  chip: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.ink },
  chipText: { fontFamily: 'Inter', fontSize: 12, fontWeight: '600', color: colors.ink },
  chipTextActive: { color: colors.onInk },
  section: { marginTop: spacing[6] },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: spacing[6], marginBottom: 2,
  },
  sectionTitle: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: colors.ink },
  sectionPill: {
    backgroundColor: colors.plumTint, borderRadius: radius.pill,
    paddingVertical: 3, paddingHorizontal: 8,
  },
  sectionPillText: { fontFamily: 'Inter', fontSize: 10, fontWeight: '700', color: colors.plum },
  sectionCaption: {
    fontFamily: 'Inter', fontSize: 11, color: colors.fg3,
    paddingHorizontal: spacing[6], marginBottom: spacing[3],
  },
  flashCard: {
    width: 168, borderRadius: radius.lg,
    backgroundColor: colors.surface, overflow: 'hidden',
  },
  flashImg: { height: 168, backgroundColor: colors.hairline },
  flashInfo: { padding: 12 },
  flashTitle: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: colors.ink },
  flashArtist: { fontFamily: 'Inter', fontSize: 11, color: colors.fg3, marginTop: 2 },
  flashBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  flashPrice: { fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.ink },
  flashBadge: { fontFamily: 'Inter', fontSize: 10, fontWeight: '700', color: colors.plum, letterSpacing: 0.9 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing[6], gap: 14,
  },
  cardWrapper: { width: '47%' },
  artistCard: {
    aspectRatio: 1, borderRadius: radius.lg,
    backgroundColor: colors.surface, overflow: 'hidden',
  },
  artistImg: { flex: 1, backgroundColor: colors.hairline },
  heartBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute', bottom: 8, left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8,
  },
  ratingText: { fontFamily: 'Inter', fontSize: 11, fontWeight: '700', color: '#fff' },
  artistFooter: { paddingTop: 8, paddingBottom: 4 },
  artistName: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: colors.ink },
  artistStyle: { fontFamily: 'Inter', fontSize: 11, color: colors.fg3, marginTop: 2 },
});
