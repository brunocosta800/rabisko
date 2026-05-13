import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { ChevronRight, Bell, Lock, CreditCard, LogOut, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideIcon } from 'lucide-react-native';

import { useAuthStore } from '../../store/authStore';
import { colors, spacing, radius } from '../../theme';

interface SettingItem {
  id: string;
  label: string;
  Icon: LucideIcon;
  toggle?: boolean;
  value?: boolean;
  onToggle?: (v: boolean) => void;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();
  const [notifs, setNotifs] = React.useState(true);

  const GROUPS: SettingGroup[] = [
    {
      title: 'Conta',
      items: [
        { id: 'profile',  label: 'Editar Perfil',          Icon: User },
        { id: 'security', label: 'Segurança e Senha',       Icon: Lock },
        { id: 'payments', label: 'Métodos de Pagamento',    Icon: CreditCard },
      ],
    },
    {
      title: 'Preferências',
      items: [
        { id: 'notifs', label: 'Notificações Push', Icon: Bell, toggle: true, value: notifs, onToggle: setNotifs },
      ],
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
      </View>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar} />
        <View>
          <Text style={styles.profileName}>{user?.name ?? 'Usuário'}</Text>
          <Text style={styles.profileEmail}>{user?.email ?? ''}</Text>
          <View style={styles.rolePill}>
            <Text style={styles.rolePillText}>
              {(user?.role ?? 'cliente').charAt(0).toUpperCase() + (user?.role ?? 'cliente').slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 100, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {GROUPS.map((group) => (
          <View key={group.title}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, idx) => (
                <View key={item.id}>
                  <TouchableOpacity style={styles.settingRow} activeOpacity={item.toggle ? 1 : 0.7}>
                    <View style={styles.iconBox}>
                      <item.Icon size={18} color={colors.onInk} />
                    </View>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.toggle ? (
                      <Switch
                        value={item.value ?? false}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.hairline, true: colors.plum }}
                        thumbColor={colors.paper}
                      />
                    ) : (
                      <ChevronRight size={18} color={colors.fg3} />
                    )}
                  </TouchableOpacity>
                  {idx < group.items.length - 1 && <View style={styles.itemDivider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutRow} onPress={logout}>
          <View style={styles.logoutIcon}>
            <LogOut size={18} color={colors.error} />
          </View>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing[6], paddingTop: spacing[4], paddingBottom: spacing[3] },
  title: { fontFamily: 'BebasNeue', fontSize: 32, color: colors.ink, letterSpacing: 0.5 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.surface, marginHorizontal: spacing[6],
    borderRadius: radius.lg, padding: spacing[4], marginBottom: spacing[5],
  },
  profileAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.hairline },
  profileName: { fontFamily: 'Inter', fontSize: 16, fontWeight: '700', color: colors.ink },
  profileEmail: { fontFamily: 'Inter', fontSize: 12, color: colors.fg2, marginTop: 2 },
  rolePill: {
    marginTop: 6, alignSelf: 'flex-start',
    backgroundColor: colors.plumTint, borderRadius: radius.pill,
    paddingVertical: 3, paddingHorizontal: 10,
  },
  rolePillText: { fontFamily: 'Inter', fontSize: 10, fontWeight: '700', color: colors.plum },
  scroll: { flex: 1, paddingHorizontal: spacing[6] },
  groupTitle: {
    fontFamily: 'Inter', fontSize: 11, fontWeight: '700',
    color: colors.fg3, letterSpacing: 0.8, textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  groupCard: {
    backgroundColor: colors.paper, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.hairline, overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: spacing[4], paddingHorizontal: spacing[4],
  },
  iconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontFamily: 'Inter', fontSize: 14, fontWeight: '600', color: colors.ink },
  itemDivider: { height: 1, backgroundColor: colors.hairline, marginLeft: 64 },
  logoutRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFF2F2', borderRadius: radius.lg,
    padding: spacing[4], borderWidth: 1, borderColor: '#FFD9D9',
  },
  logoutIcon: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: '#FFD9D9', alignItems: 'center', justifyContent: 'center',
  },
  logoutText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.error },
});
