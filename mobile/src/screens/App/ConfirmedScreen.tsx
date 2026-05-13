import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, MessageCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { HomeStackParamList } from '../../routes/home.stack';
import { colors, spacing, radius } from '../../theme';

export function ConfirmedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();

  const checkScale = useSharedValue(0);
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);

  React.useEffect(() => {
    checkScale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 200 }));
    ring1.value = withDelay(400, withTiming(1, { duration: 600 }));
    ring2.value = withDelay(550, withTiming(1, { duration: 700 }));
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const ring1Style = useAnimatedStyle(() => ({
    opacity: 1 - ring1.value,
    transform: [{ scale: 0.8 + ring1.value * 0.7 }],
  }));

  const ring2Style = useAnimatedStyle(() => ({
    opacity: 1 - ring2.value,
    transform: [{ scale: 0.8 + ring2.value * 0.9 }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stepper current={3} />

      <View style={styles.center}>
        {/* Animated check */}
        <View style={styles.checkArea}>
          <Animated.View style={[styles.ring, ring2Style]} />
          <Animated.View style={[styles.ring, styles.ringInner, ring1Style]} />
          <Animated.View style={[styles.checkCircle, checkStyle]}>
            <Check size={36} color="#fff" strokeWidth={3} />
          </Animated.View>
        </View>

        <Animated.Text entering={FadeIn.delay(400).duration(400)} style={styles.headline}>
          Reserva{'\n'}Confirmada
        </Animated.Text>

        <Animated.Text entering={FadeIn.delay(500).duration(400)} style={styles.sub}>
          Sua sessão com João Santos está agendada para 15 de Maio às 14:00.
        </Animated.Text>

        {/* Detail card */}
        <Animated.View entering={FadeIn.delay(600).duration(400)} style={styles.detailCard}>
          <Row label="Artista"  value="João Santos" />
          <View style={styles.divider} />
          <Row label="Data"    value="15 de Maio de 2025" />
          <View style={styles.divider} />
          <Row label="Horário" value="14:00" />
          <View style={styles.divider} />
          <Row label="Status"  value="Pago" isPaid />
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeIn.delay(700).duration(400)}
        style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
      >
        <Button
          title="Ir para o Chat"
          variant="plum"
          full
          onPress={() => navigation.navigate('HomeList')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('HomeList')}>
          <Text style={styles.backHome}>Voltar para o início</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function Row({ label, value, isPaid }: { label: string; value: string; isPaid?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {isPaid ? (
        <View style={styles.paidPill}>
          <Text style={styles.paidText}>Pago</Text>
        </View>
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'space-between' },
  center: { flex: 1, alignItems: 'center', paddingHorizontal: spacing[6], paddingTop: spacing[8] },
  checkArea: { alignItems: 'center', justifyContent: 'center', width: 120, height: 120 },
  ring: {
    position: 'absolute',
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 2, borderColor: colors.plum,
  },
  ringInner: { width: 90, height: 90, borderRadius: 45 },
  checkCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.plum,
    alignItems: 'center', justifyContent: 'center',
  },
  headline: {
    fontFamily: 'BebasNeue',
    fontSize: 48, color: colors.ink,
    letterSpacing: 0.5, textAlign: 'center',
    marginTop: spacing[6],
  },
  sub: {
    fontFamily: 'Inter', fontSize: 14, color: colors.fg2,
    textAlign: 'center', lineHeight: 21, maxWidth: 280,
    marginTop: spacing[3], marginBottom: spacing[5],
  },
  detailCard: {
    width: '100%', backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing[4],
  },
  divider: { height: 1, backgroundColor: colors.hairline, marginVertical: spacing[3] },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontFamily: 'Inter', fontSize: 13, color: colors.fg2 },
  rowValue: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: colors.ink },
  paidPill: {
    backgroundColor: colors.plumTint, borderRadius: radius.pill,
    paddingVertical: 4, paddingHorizontal: 12,
  },
  paidText: { fontFamily: 'Inter', fontSize: 12, fontWeight: '700', color: colors.plum },
  footer: {
    paddingHorizontal: spacing[6], paddingTop: spacing[4],
    gap: 14, alignItems: 'center',
  },
  backHome: {
    fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.fg2,
  },
});
