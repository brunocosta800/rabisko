import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, QrCode, CreditCard, Smartphone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { HomeStackParamList } from '../../routes/home.stack';
import { colors, spacing, radius } from '../../theme';

const METHODS = [
  { id: 'pix',  label: 'Pix',              Icon: QrCode },
  { id: 'card', label: 'Cartão de Crédito', Icon: CreditCard },
  { id: 'mpay', label: 'Apple / Google Pay', Icon: Smartphone },
];

export function PaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [method, setMethod] = React.useState('pix');

  const selectedLabel = METHODS.find((m) => m.id === method)?.label ?? '';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <ChevronLeft size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.title}>Pagamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <Stepper current={2} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Total card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalValue}>R$ 250,00</Text>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Serviço</Text>
            <Text style={styles.detailValue}>Tatuagem Realista</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profissional</Text>
            <Text style={styles.detailValue}>João Santos</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data</Text>
            <Text style={styles.detailValue}>15 de Maio · 14:00</Text>
          </View>
        </View>

        {/* Methods */}
        <Text style={styles.sectionLabel}>Escolha o método</Text>
        {METHODS.map(({ id, label, Icon }) => (
          <TouchableOpacity
            key={id}
            onPress={() => setMethod(id)}
            style={[styles.methodCard, method === id && styles.methodCardActive]}
            activeOpacity={0.85}
          >
            <View style={[styles.methodIcon, method === id && styles.methodIconActive]}>
              <Icon size={22} color={method === id ? colors.onInk : colors.ink} />
            </View>
            <Text style={styles.methodLabel}>{label}</Text>
            <View style={[styles.radio, method === id && styles.radioActive]}>
              {method === id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Button
          title={`Pagar com ${selectedLabel}`}
          full
          onPress={() => navigation.navigate('Confirmed')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing[6], paddingVertical: spacing[4],
  },
  title: { fontFamily: 'BebasNeue', fontSize: 24, color: colors.ink },
  scroll: { flex: 1, paddingHorizontal: spacing[6] },
  totalCard: {
    backgroundColor: colors.ink, borderRadius: radius.xl,
    padding: spacing[5], marginTop: spacing[4],
  },
  totalLabel: { fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  totalValue: { fontFamily: 'Inter', fontSize: 36, fontWeight: '700', color: '#fff' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: spacing[4] },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  detailValue: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: '#fff' },
  sectionLabel: {
    fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.ink,
    marginTop: spacing[5], marginBottom: spacing[3],
  },
  methodCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.paper, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.hairline,
    padding: spacing[4], marginBottom: 12,
  },
  methodCardActive: { borderColor: colors.plum, backgroundColor: colors.plumTint },
  methodIcon: {
    width: 44, height: 44, borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  methodIconActive: { backgroundColor: colors.plum },
  methodLabel: { flex: 1, fontFamily: 'Inter', fontSize: 15, fontWeight: '600', color: colors.ink },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.hairline,
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { borderColor: colors.plum },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.plum },
  footer: {
    paddingHorizontal: spacing[6], paddingTop: spacing[4],
    borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.paper,
  },
});
