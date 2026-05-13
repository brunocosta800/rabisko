import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Mail, Lock } from 'lucide-react-native';

import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RoleSwitch, Role } from '../../components/common/RoleSwitch';
import { useAuthStore } from '../../store/authStore';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { colors, spacing, radius } from '../../theme';

const COPY: Record<Role, { h1: string; sub: string }> = {
  cliente: { h1: 'Bem-vindo de volta', sub: 'Encontre artistas, agende sessões e acompanhe sua cicatrização.' },
  artista: { h1: 'Bem-vindo, artista', sub: 'Gerencie sua agenda, portfólio e ganhe novos clientes.' },
  estudio: { h1: 'Bem-vindo, estúdio', sub: 'Acompanhe seus tatuadores e a saúde do seu negócio.' },
};

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
  const setUser = useAuthStore((s) => s.setUser);
  const [role, setRole] = React.useState<Role>('cliente');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const copy = COPY[role];

  const handleLogin = () => {
    setUser({ id: '1', name: 'Maria Silva', email: email || 'maria@email.com', role });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kav}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.back}>
          <ChevronLeft size={24} color={colors.ink} />
        </TouchableOpacity>

        <Text style={styles.h1}>{copy.h1}</Text>
        <Text style={styles.sub}>{copy.sub}</Text>

        <View style={styles.roleRow}>
          <RoleSwitch value={role} onChange={setRole} />
        </View>

        <View style={styles.fields}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            icon={Mail}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="••••••••"
            icon={Lock}
            secure
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.forgotRow}>
          <Text style={styles.forgot}>Esqueceu a Senha?</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Button title="Entrar" full onPress={handleLogin} />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing[6], paddingTop: spacing[12], flexGrow: 1 },
  back: { marginBottom: spacing[6] },
  h1: {
    fontFamily: 'BebasNeue',
    fontSize: 32,
    color: colors.ink,
    letterSpacing: 0.5,
    marginBottom: spacing[2],
  },
  sub: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: colors.ink,
    lineHeight: 17,
    maxWidth: 280,
  },
  roleRow: { marginTop: spacing[5], marginBottom: spacing[1] },
  fields: { marginTop: spacing[5], gap: 2 },
  forgotRow: { alignSelf: 'flex-end', marginTop: spacing[3] },
  forgot: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    color: colors.plum,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing[8],
    gap: 18,
    alignItems: 'center',
  },
  signupRow: { flexDirection: 'row' },
  signupText: { fontFamily: 'Inter', fontSize: 12, color: colors.fg2 },
  signupLink: { fontFamily: 'Inter', fontSize: 12, fontWeight: '700', color: colors.ink },
});
