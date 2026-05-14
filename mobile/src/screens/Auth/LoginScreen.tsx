import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuthStore, type UserRoleId } from '../../store/authStore';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RoleSwitch } from '../../components/common/RoleSwitch';

/** Subtitle copy per role (P1 Login — DESIGN.md §3 / IMPLEMENTATION-CHECKLIST F9). */
const SUBTITLE_BY_ROLE: Record<UserRoleId, string> = {
  cliente: 'Encontre artistas, agende sessões e acompanhe sua cicatrização.',
  artista: 'Gerencie seu portfólio, sua agenda e seus clientes em um só lugar.',
  estudio: 'Gerencie seu estúdio, equipe, agenda e financeiro em um só lugar.',
};

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
  const insets = useSafeAreaInsets();
  const { role, setRole, setUser } = useAuthStore();

  const handleLogin = useCallback(() => {
    // TODO: replace mock with real auth against the Spring backend (`POST /auth/login`).
    // After login, role-based home: cliente → AppRoutes Home; artista/estudio → Dashboard
    // (P2 #13 — Dashboard not built yet, so all roles land on Home for now).
    setUser({ id: '1', name: 'User Test', email: 'test@example.com' });
  }, [setUser]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background"
    >
      <Header onBack={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Hero — Bebas 32 + role subtitle */}
        <View className="mb-8">
          <Text className="font-display text-[32px] leading-[34px] text-ink mb-3">BEM-VINDO</Text>
          <Text className="font-body text-[15px] leading-[20px] text-fg-2">
            {SUBTITLE_BY_ROLE[role]}
          </Text>
        </View>

        {/* Role selector — anchor of the design system curvature beat */}
        <RoleSwitch value={role} onChange={setRole} className="mb-8" />

        {/* Fields */}
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          icon={Mail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input label="Senha" placeholder="••••••••" icon={Lock} secure />

        <TouchableOpacity
          className="self-end -mt-2 mb-2"
          onPress={() => navigation.navigate('ForgotPassword')}
          hitSlop={8}
        >
          <Text className="font-body-bold text-[12px] text-plum">Esqueceu a Senha?</Text>
        </TouchableOpacity>

        {/* Spacer keeps the CTA anchored to the bottom regardless of content height */}
        <View className="flex-1" />

        <Button title="Entrar" onPress={handleLogin} />

        <View className="flex-row justify-center mt-6">
          <Text className="font-body text-[14px] text-fg-2">Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} hitSlop={8}>
            <Text className="font-body-bold text-[14px] text-ink">Criar conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
