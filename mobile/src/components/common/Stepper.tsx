import React from 'react';
import { View, Text } from 'react-native';
import { Check } from 'lucide-react-native';

/**
 * Booking-flow progress (DESIGN.md §8.7 — Stepper.jsx): 4 nodes — Artista · Data · Pagamento ·
 * Concluído. Completed steps get plum fill + check; the current step gets ink fill + number;
 * future steps are an outlined grey circle. Connector lines fill with plum as you progress.
 */
const DEFAULT_LABELS = ['Artista', 'Data', 'Pagamento', 'Concluído'];

interface StepperProps {
  /** index of the current step (0-based) */
  current?: number;
  labels?: string[];
}

const PLUM = '#602C66';
const INK = '#000000';
const FG3 = '#6B6B6B';

export function Stepper({ current = 0, labels = DEFAULT_LABELS }: StepperProps) {
  return (
    <View className="flex-row items-center px-1 pb-3.5 pt-2.5">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const circleBg = done ? PLUM : active ? INK : 'transparent';
        const textColor = done || active ? '#FFFFFF' : FG3;
        return (
          <React.Fragment key={label}>
            <View className="items-center" style={{ minWidth: 56 }}>
              <View
                className="items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: circleBg,
                  borderWidth: done || active ? 0 : 1.5,
                  borderColor: FG3,
                }}
              >
                {done ? (
                  <Check size={16} color="#FFFFFF" strokeWidth={3} />
                ) : (
                  <Text className="font-body-bold text-[12px]" style={{ color: textColor }}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text
                className="font-body-semibold text-[10px] uppercase mt-1.5"
                style={{ color: done || active ? INK : FG3, letterSpacing: 0.4 }}
              >
                {label}
              </Text>
            </View>
            {i < labels.length - 1 && (
              <View
                className="flex-1"
                style={{
                  height: 2,
                  marginTop: -16,
                  backgroundColor: done ? PLUM : FG3,
                  opacity: done ? 1 : 0.35,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
