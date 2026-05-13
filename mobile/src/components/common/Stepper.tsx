import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, radius } from '../../theme';

const STEPS = ['Artista', 'Data', 'Pagamento', 'Concluído'];

interface StepperProps {
  current: number;
}

export function Stepper({ current }: StepperProps) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <View style={styles.step}>
              <View style={[styles.node, done && styles.nodeDone, active && styles.nodeActive]}>
                {done
                  ? <Check size={14} color="#fff" strokeWidth={3} />
                  : <Text style={[styles.nodeNum, (done || active) && { color: '#fff' }]}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.nodeLabel, (done || active) && styles.nodeLabelActive]}>
                {label}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View style={[styles.line, done && styles.lineDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  step: {
    alignItems: 'center',
    gap: 6,
    minWidth: 56,
  },
  node: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.fg3,
    backgroundColor: 'transparent',
  },
  nodeDone: {
    backgroundColor: colors.plum,
    borderColor: colors.plum,
  },
  nodeActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  nodeNum: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    color: colors.fg3,
  },
  nodeLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    color: colors.fg3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  nodeLabelActive: { color: colors.ink },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.fg3,
    opacity: 0.35,
    marginBottom: 16,
  },
  lineDone: {
    backgroundColor: colors.plum,
    opacity: 1,
  },
});
