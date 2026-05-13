export const colors = {
  bg:          '#F8F9FA',
  surface:     '#EAE0D5',
  surface2:    '#F2EBE0',
  ink:         '#000000',
  inkSoft:     '#1A1A1A',
  paper:       '#FFFFFF',
  hairline:    '#D9D9D9',

  plum:        '#602C66',
  plumDeep:    '#4A2150',
  plumTint:    '#EFE6F0',
  indigo:      '#2C4466',
  steel:       '#2E3238',

  fg1:         '#000000',
  fg2:         '#404040',
  fg3:         '#6B6B6B',
  onInk:       '#FFFFFF',

  success:     '#1F7A4D',
  warning:     '#B5752A',
  error:       '#B33A3A',
};

export const radius = {
  xs:   8,
  sm:   10,
  md:   12,
  lg:   16,
  xl:   22,
  xxl:  28,
  pill: 999,
};

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
};

export const shadow = {
  none: undefined,
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
};

export const theme = { colors, radius, spacing, shadow };
