import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRoutesParamList } from '../../routes/auth.routes';
import { Button } from '../../components/common/Button';
import { colors, radius, spacing } from '../../theme';

export function LandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.logoBlock}>
        <View style={styles.logoSquare} />
      </View>

      <Text style={styles.wordmark}>RABISKO</Text>

      <Text style={styles.tagline}>
        Transforme sua vida com um Rabisko.
      </Text>

      <View style={styles.actions}>
        <Button
          title="Entrar"
          full
          onPress={() => navigation.navigate('Login')}
        />

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Novo por aqui? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  logoBlock: {
    marginBottom: spacing[8],
  },
  logoSquare: {
    width: 120,
    height: 120,
    borderRadius: radius.xxl,
    backgroundColor: colors.ink,
  },
  wordmark: {
    fontFamily: 'BebasNeue',
    fontSize: 64,
    color: colors.ink,
    letterSpacing: 1.5,
    marginBottom: spacing[4],
  },
  tagline: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: colors.fg2,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: spacing[12],
  },
  actions: {
    width: '100%',
    gap: 18,
    alignItems: 'center',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[1],
  },
  signupText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: colors.fg2,
  },
  signupLink: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    color: colors.ink,
  },
});
