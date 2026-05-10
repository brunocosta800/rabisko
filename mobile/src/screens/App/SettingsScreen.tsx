import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight, Bell, Lock, CreditCard, LogOut, Moon, User } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { LucideIcon } from 'lucide-react-native';

interface SettingItem {
  id: string;
  name: string;
  icon: LucideIcon;
  type?: 'toggle';
  value?: boolean;
  onToggle?: (value: boolean) => void;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

export function SettingsScreen() {
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const SETTINGS_GROUPS: SettingGroup[] = [
    {
      title: 'Conta',
      items: [
        { id: 'profile', name: 'Editar Perfil', icon: User },
        { id: 'security', name: 'Segurança e Senha', icon: Lock },
        { id: 'payments', name: 'Métodos de Pagamento', icon: CreditCard },
      ]
    },
    {
      title: 'Preferências',
      items: [
        { id: 'notifications', name: 'Notificações Push', icon: Bell, type: 'toggle', value: notifications, onToggle: setNotifications },
        { id: 'darkmode', name: 'Modo Escuro', icon: Moon, type: 'toggle', value: darkMode, onToggle: setDarkMode },
      ]
    }
  ];

  return (
    <View className="flex-1 bg-white pt-14">
      <View className="px-6 mb-8">
        <Text className="text-4xl font-bold text-black uppercase tracking-tighter">Configurações</Text>
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        {SETTINGS_GROUPS.map((group) => (
          <View key={group.title} className="mb-10">
            <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">{group.title}</Text>
            <View className="bg-primary-100/30 rounded-[32px] overflow-hidden">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View key={item.id}>
                    <TouchableOpacity 
                      className="flex-row items-center p-6"
                      activeOpacity={item.type === 'toggle' ? 1 : 0.7}
                    >
                      <View className="bg-black p-3 rounded-2xl mr-4">
                        <Icon size={20} stroke="#fff" />
                      </View>
                      <Text className="flex-1 text-black font-bold text-lg">{item.name}</Text>
                      
                      {item.type === 'toggle' ? (
                        <Switch 
                          value={item.value ?? false} 
                          onValueChange={(val) => item.onToggle?.(val)}
                          trackColor={{ false: '#ddd', true: '#000' }}
                          thumbColor="#fff"
                        />
                      ) : (
                        <ChevronRight size={20} stroke="#000" />
                      )}
                    </TouchableOpacity>
                    {index < group.items.length - 1 && <View className="h-[1px] bg-primary-100 mx-6" />}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          onPress={logout}
          className="bg-red-50 p-6 rounded-[32px] flex-row items-center mb-20"
        >
          <View className="bg-red-500 p-3 rounded-2xl mr-4">
            <LogOut size={20} stroke="#fff" />
          </View>
          <Text className="text-red-500 font-bold text-lg">Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
