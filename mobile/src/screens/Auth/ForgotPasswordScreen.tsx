import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors, spacing } from '../../theme';
import { Mail } from 'lucide-react-native';

export function ForgotPasswordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <ChevronLeft size={24} color={colors.ink} />
      </TouchableOpacity>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.sub}>Insira seu e-mail para receber as instruções de recuperação.</Text>
      <Input label="E-mail" placeholder="seu@email.com" icon={Mail} keyboardType="email-address" autoCapitalize="none" />
      <Button title="Enviar link" full onPress={() => navigation.goBack()} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing[6], paddingTop: spacing[12] },
  back: { marginBottom: spacing[6] },
  title: { fontFamily: 'BebasNeue', fontSize: 32, color: colors.ink, marginBottom: spacing[2] },
  sub: { fontFamily: 'Inter', fontSize: 14, color: colors.fg2, lineHeight: 21, marginBottom: spacing[5] },
  btn: { marginTop: spacing[8] },
});
