import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, Star, MapPin, Heart, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { HomeStackParamList } from '../../routes/home.stack';
import { colors, spacing, radius } from '../../theme';

const STYLES_TAGS = ['Realismo', 'Minimalista', 'Blackwork'];

export function ArtistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [fav, setFav] = React.useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroImg} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={22} color={colors.ink} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn} onPress={() => setFav(!fav)}>
            <Heart
              size={18}
              color={fav ? colors.plum : colors.ink}
              fill={fav ? colors.plum : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Name + rating */}
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>João Santos</Text>
              <View style={styles.locationRow}>
                <MapPin size={12} color={colors.fg3} />
                <Text style={styles.location}>Jardins, São Paulo · 1,2 km</Text>
              </View>
            </View>
            <View style={styles.ratingBlock}>
              <Star size={14} color={colors.ink} fill={colors.ink} />
              <Text style={styles.ratingNum}>4,9</Text>
              <Text style={styles.ratingCount}>128 av.</Text>
            </View>
          </View>

          {/* Style tags */}
          <View style={styles.tags}>
            {STYLES_TAGS.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* Sobre */}
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.bio}>
            Especialista em realismo e traços finos com mais de 8 anos de experiência.
            Premiado em convenções nacionais, busco transformar sua ideia em uma obra de arte única na pele.
          </Text>

          {/* Portfolio */}
          <Text style={styles.sectionTitle}>Portfólio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={styles.portfolioImg} />
            ))}
          </ScrollView>

          {/* Horários */}
          <Text style={styles.sectionTitle}>Horários</Text>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleDay}>Segunda – Sexta</Text>
              <Text style={styles.scheduleTime}>10:00 – 20:00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleDay}>Sábado</Text>
              <Text style={styles.scheduleTime}>09:00 – 15:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.priceLabel}>A partir de</Text>
          <Text style={styles.price}>R$ 250,00</Text>
        </View>
        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.chatBtn}>
            <MessageCircle size={20} color={colors.ink} />
          </TouchableOpacity>
          <Button
            title="Reservar"
            onPress={() => navigation.navigate('BookingFlow', { artistId: '1' })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { position: 'relative', height: 320 },
  heroImg: { flex: 1, backgroundColor: colors.surface },
  backBtn: {
    position: 'absolute', top: 12, left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.paper,
    alignItems: 'center', justifyContent: 'center',
  },
  favBtn: {
    position: 'absolute', top: 12, right: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.paper,
    alignItems: 'center', justifyContent: 'center',
  },
  content: { padding: spacing[6] },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing[3] },
  name: { fontFamily: 'Inter', fontSize: 24, fontWeight: '700', color: colors.ink },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  location: { fontFamily: 'Inter', fontSize: 12, color: colors.fg3 },
  ratingBlock: { alignItems: 'flex-end', gap: 2 },
  ratingNum: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: colors.ink },
  ratingCount: { fontFamily: 'Inter', fontSize: 10, color: colors.fg3 },
  tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: spacing[5] },
  tag: {
    paddingVertical: 6, paddingHorizontal: 12,
    backgroundColor: colors.surface, borderRadius: radius.pill,
  },
  tagText: { fontFamily: 'Inter', fontSize: 12, fontWeight: '600', color: colors.ink },
  sectionTitle: {
    fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: colors.ink,
    marginBottom: spacing[3], marginTop: spacing[5],
  },
  bio: { fontFamily: 'Inter', fontSize: 14, color: colors.fg2, lineHeight: 21 },
  portfolioImg: {
    width: 140, height: 140, borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },
  scheduleCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing[4],
  },
  scheduleRow: { flexDirection: 'row', justifyContent: 'space-between' },
  divider: { height: 1, backgroundColor: colors.hairline, marginVertical: spacing[3] },
  scheduleDay: { fontFamily: 'Inter', fontSize: 14, color: colors.fg2 },
  scheduleTime: { fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.ink },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.paper,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing[6], paddingTop: spacing[4],
    borderTopWidth: 1, borderTopColor: colors.hairline,
  },
  priceLabel: { fontFamily: 'Inter', fontSize: 12, color: colors.fg3 },
  price: { fontFamily: 'Inter', fontSize: 22, fontWeight: '700', color: colors.ink },
  actionBtns: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  chatBtn: {
    width: 48, height: 48, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.hairline,
    alignItems: 'center', justifyContent: 'center',
  },
});
