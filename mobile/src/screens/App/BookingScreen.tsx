import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { ChevronLeft, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Configure Calendar for Portuguese
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export function BookingScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = React.useState('');

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black uppercase tracking-tighter">Reservar Horário</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-black font-bold text-xl mb-4 mt-4">Selecione a Data</Text>
        <View className="bg-surface rounded-r-lg overflow-hidden mb-8">
          <RNCalendar
            onDayPress={(day: any) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#602C66' }
            }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#000000',
              selectedDayBackgroundColor: '#602C66',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#000000',
              dayTextColor: '#000000',
              textDisabledColor: '#D9D9D9',
              arrowColor: '#000000',
              monthTextColor: '#000000',
              indicatorColor: '#000000',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12
            }}
          />
        </View>

        <Text className="text-black font-bold text-xl mb-4">Selecione o Horário</Text>
        <View className="flex-row flex-wrap -mx-2 mb-8">
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
              className={`w-[30%] m-[1.5%] py-4 rounded-r-md items-center border ${selectedTime === time ? 'bg-plum border-plum' : 'bg-paper border-hairline'
                }`}
            >
              <Text className={`font-bold ${selectedTime === time ? 'text-on-ink' : 'text-ink'}`}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-surface-2 p-6 rounded-r-lg mb-10">
          <View className="flex-row items-center mb-4">
            <View className="mr-2">
              <Clock size={20} color="#000" />
            </View>
            <Text className="font-bold text-black">Resumo da Reserva</Text>
          </View>
          <Text className="text-gray-600 mb-1">Data: <Text className="text-black font-bold">{format(new Date(selectedDate), "dd 'de' MMMM", { locale: ptBR })}</Text></Text>
          <Text className="text-gray-600">Horário: <Text className="text-black font-bold">{selectedTime || 'Não selecionado'}</Text></Text>
        </View>
      </ScrollView>

      <View className="p-6 pb-10 bg-white border-t border-gray-100">
        <Button
          title="Continuar para Pagamento"
          disabled={!selectedTime}
          onPress={() => navigation.navigate('Payment' as never)}
        />
      </View>
    </View>
  );
}
