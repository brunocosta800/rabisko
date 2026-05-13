import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Mail, Lock, User, Instagram } from 'lucide-react-native';

import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RoleSwitch, Role } from '../../components/common/RoleSwitch';
import { useAuthStore } from '../../store/authStore';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { colors, spacing, radius } from '../../theme';

const ESTILOS = ['Realismo', 'Fineline', 'Blackwork', 'Old School', 'Minimalista', 'Aquarela'];

const COPY: Record<Role, { h1: string; sub: string; cta: string }> = {
  cliente: { h1: 'Criar conta', sub: 'Encontre o artista ideal para sua próxima tatuagem.', cta: 'Criar conta' },
  artista: { h1: 'Sou artista',  sub: 'Comece a receber clientes pela plataforma.',           cta: 'Continuar para portfólio' },
  estudio: { h1: 'Sou estúdio',  sub: 'Cadastre seu estúdio e seus tatuadores.',              cta: 'Cadastrar estúdio' },
};

const NOTICE: Record<Role, string> = {
  cliente: 'Ao continuar você concorda com os Termos e a Política de Privacidade.',
  artista: 'Após o cadastro, complete seu portfólio e aceite os termos para aparecer nas buscas.',
  estudio: 'Após validarmos o CNPJ você poderá adicionar tatuadores ao seu estúdio.',
};

export function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
  const setUser = useAuthStore((s) => s.setUser);
  const [role, setRole] = React.useState<Role>('cliente');
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [estilo, setEstilo] = React.useState('Realismo');
  const copy = COPY[role];

  const handleRegister = () => {
    setUser({ id: '2', name: nome || 'Novo usuário', email: email || 'novo@email.com', role });
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.back}>
          <ChevronLeft size={24} color={colors.ink} />
        </TouchableOpacity>

        <Text style={styles.h1}>{copy.h1}</Text>
        <Text style={styles.sub}>{copy.sub}</Text>

        <View style={styles.roleRow}>
          <RoleSwitch value={role} onChange={setRole} />
        </View>

        <View style={styles.fields}>
          <Input
            label={role === 'estudio' ? 'Nome fantasia' : 'Nome completo'}
            placeholder="Ex: João Santos"
            icon={User}
            value={nome}
            onChangeText={setNome}
          />
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
            value={senha}
            onChangeText={setSenha}
          />

          {role === 'artista' && (
            <>
              <Input
                label="@ no Instagram"
                placeholder="@seuhandle"
                icon={Instagram}
                autoCapitalize="none"
              />
              <View>
                <Text style={styles.styleLabel}>Estilo principal</Text>
                <View style={styles.styleChips}>
                  {ESTILOS.map((e) => (
                    <TouchableOpacity
                      key={e}
                      onPress={() => setEstilo(e)}
                      style={[styles.chip, estilo === e && styles.chipActive]}
                    >
                      <Text style={[styles.chipText, estilo === e && styles.chipTextActive]}>{e}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {role === 'estudio' && (
            <>
              <Input label="CNPJ" placeholder="00.000.000/0000-00" keyboardType="numeric" />
              <Input label="Endereço completo" placeholder="Rua das Artes, 123 – Jardins, SP" />
            </>
          )}
        </View>

        <Text style={styles.notice}>{NOTICE[role]}</Text>

        <View style={styles.footer}>
          <Button title={copy.cta} full onPress={handleRegister} />
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Entrar</Text>
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
  h1: { fontFamily: 'BebasNeue', fontSize: 32, color: colors.ink, letterSpacing: 0.5, marginBottom: spacing[2] },
  sub: { fontFamily: 'Inter', fontSize: 12, color: colors.ink, lineHeight: 17, maxWidth: 280 },
  roleRow: { marginTop: spacing[5] },
  fields: { marginTop: spacing[5], gap: 2 },
  styleLabel: {
    fontFamily: 'Inter', fontSize: 11, fontWeight: '600', color: colors.fg3,
    letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 4,
  },
  styleChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 999, backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.ink },
  chipText: { fontFamily: 'Inter', fontSize: 12, fontWeight: '600', color: colors.ink },
  chipTextActive: { color: colors.onInk },
  notice: {
    fontFamily: 'Inter', fontSize: 11, color: colors.fg3,
    lineHeight: 16, marginTop: spacing[5],
  },
  footer: { marginTop: spacing[5], gap: 12, alignItems: 'center', paddingBottom: spacing[8] },
  loginRow: { flexDirection: 'row' },
  loginText: { fontFamily: 'Inter', fontSize: 12, color: colors.fg2 },
  loginLink: { fontFamily: 'Inter', fontSize: 12, fontWeight: '700', color: colors.ink },
});
