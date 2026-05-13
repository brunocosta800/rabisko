import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, User, AtSign, Building2, MapPin, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuthStore, type UserRoleId } from '../../store/authStore';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { RoleSwitch } from '../../components/common/RoleSwitch';
import { PrefChip } from '../../components/common/Chip';

/** Subtitle copy per role (P1 Cadastro — DESIGN.md §3 / IMPLEMENTATION-CHECKLIST F9). */
const SUBTITLE_BY_ROLE: Record<UserRoleId, string> = {
  cliente: 'Crie sua conta para encontrar artistas e agendar sessões.',
  artista: 'Crie sua conta para divulgar seu trabalho e receber reservas.',
  estudio: 'Crie sua conta para gerenciar seu estúdio, equipe e agenda.',
};

/** CTA label per role (per IMPLEMENTATION-CHECKLIST P1 Cadastro item). */
const CTA_BY_ROLE: Record<UserRoleId, string> = {
  cliente: 'Criar conta',
  artista: 'Sou artista',
  estudio: 'Sou estúdio',
};

/** Tattoo styles offered to artistas (P1 Cadastro). Multi-select pills. */
const TATTOO_STYLES = [
  'Realismo',
  'Minimalista',
  'Tradicional',
  'Aquarela',
  'Geométrico',
  'Blackwork',
  'Old School',
  'Japonês',
];

export function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();
  const insets = useSafeAreaInsets();
  const { role, setRole, setUser } = useAuthStore();

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = useCallback((style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    );
  }, []);

  const handleRegister = useCallback(() => {
    // TODO: replace mock with real registration against the Spring backend (`POST /user/cadastro`).
    // After register, role-based home: cliente → AppRoutes Home; artista/estudio → Dashboard
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
          paddingHorizontal: 32,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {/* Hero — Bebas 32 + role subtitle */}
        <View className="mb-6">
          <Text className="font-display text-[32px] leading-[34px] text-ink mb-3">
            CRIE SUA CONTA
          </Text>
          <Text className="font-body text-[15px] leading-[20px] text-fg-2">
            {SUBTITLE_BY_ROLE[role]}
          </Text>
        </View>

        <RoleSwitch value={role} onChange={setRole} className="mb-8" />

        {/* Common fields (all roles) */}
        <Input label="Nome completo" placeholder="Ex: Maria Silva" icon={User} />
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          icon={Mail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input label="Senha" placeholder="••••••••" icon={Lock} secure />

        {/* Artista-only: Instagram handle + tattoo style pills */}
        {role === 'artista' && (
          <>
            <Input
              label="@ Instagram"
              placeholder="@seuhandle"
              icon={AtSign}
              autoCapitalize="none"
            />
            <Text className="font-body text-[12px] text-fg-2 mb-2 ml-1">Estilo principal</Text>
            <View className="flex-row flex-wrap mb-4" style={{ gap: 8 }}>
              {TATTOO_STYLES.map((style) => (
                <PrefChip
                  key={style}
                  label={style}
                  selected={selectedStyles.includes(style)}
                  onPress={() => toggleStyle(style)}
                />
              ))}
            </View>
          </>
        )}

        {/* Estúdio-only: CNPJ + full address */}
        {role === 'estudio' && (
          <>
            <Input
              label="CNPJ"
              placeholder="00.000.000/0001-00"
              icon={Building2}
              keyboardType="numeric"
            />
            <Input
              label="Endereço completo"
              placeholder="Rua, número, bairro, cidade — UF"
              icon={MapPin}
            />
          </>
        )}

        {/* Terms acceptance notice */}
        <View className="flex-row items-start mt-2 mb-6">
          <View style={{ marginTop: 2, marginRight: 8 }}>
            <Info size={14} color="#6B6B6B" />
          </View>
          <Text className="flex-1 font-body text-[12px] text-fg-3 leading-[16px]">
            Ao continuar você concorda com os <Text className="text-plum">Termos de Uso</Text> e a{' '}
            <Text className="text-plum">Política de Privacidade</Text>.
          </Text>
        </View>

        <Button title={CTA_BY_ROLE[role]} onPress={handleRegister} />

        <View className="flex-row justify-center mt-6">
          <Text className="font-body text-[14px] text-fg-2">Já tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} hitSlop={8}>
            <Text className="font-body-bold text-[14px] text-ink">Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
