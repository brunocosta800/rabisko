import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/common/Button';
import { Stepper } from '../../components/common/Stepper';
import { HomeStackParamList } from '../../routes/home.stack';
import { colors, spacing, radius } from '../../theme';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

const TIME_SLOTS = ['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00'];

export function BookingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = React.useState('');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <ChevronLeft size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.title}>Agendar</Text>
        <View style={{ width: 24 }} />
      </View>

      <Stepper current={1} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <Text style={styles.sectionLabel}>Selecione a data</Text>
        <View style={styles.calendarCard}>
          <RNCalendar
            onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: colors.plum } }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: colors.ink,
              selectedDayBackgroundColor: colors.plum,
              selectedDayTextColor: '#ffffff',
              todayTextColor: colors.plum,
              dayTextColor: colors.ink,
              textDisabledColor: colors.hairline,
              arrowColor: colors.ink,
              monthTextColor: colors.ink,
              textDayFontFamily: 'Inter',
              textMonthFontFamily: 'Inter',
              textDayHeaderFontFamily: 'Inter',
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '700',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />
        </View>

        {/* Time slots */}
        <Text style={styles.sectionLabel}>Selecione o horário</Text>
        <View style={styles.timesGrid}>
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
              style={[styles.timeSlot, selectedTime === time && styles.timeSlotActive]}
            >
              <Text style={[styles.timeText, selectedTime === time && styles.timeTextActive]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumo</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Data</Text>
            <Text style={styles.summaryValue}>
              {format(new Date(selectedDate + 'T12:00:00'), "dd 'de' MMMM", { locale: ptBR })}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Horário</Text>
            <Text style={styles.summaryValue}>{selectedTime || '—'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Artista</Text>
            <Text style={styles.summaryValue}>João Santos</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Button
          title="Continuar"
          full
          disabled={!selectedTime}
          onPress={() => navigation.navigate('Payment', { artistId: '1' })}
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
  sectionLabel: {
    fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.ink,
    marginBottom: spacing[3], marginTop: spacing[5],
  },
  calendarCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    overflow: 'hidden', marginBottom: spacing[2],
  },
  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeSlot: {
    width: '30%',
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1, borderColor: colors.hairline,
  },
  timeSlotActive: { backgroundColor: colors.plum, borderColor: colors.plum },
  timeText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: colors.ink },
  timeTextActive: { color: colors.onInk },
  summary: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing[4], marginTop: spacing[5], marginBottom: spacing[4],
  },
  summaryTitle: { fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.ink, marginBottom: spacing[3] },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  summaryLabel: { fontFamily: 'Inter', fontSize: 13, color: colors.fg2 },
  summaryValue: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: colors.ink },
  divider: { height: 1, backgroundColor: colors.hairline, marginVertical: spacing[3] },
  footer: {
    paddingHorizontal: spacing[6], paddingTop: spacing[4],
    borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.paper,
  },
});
