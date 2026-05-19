export const colors = {
  preto: '#000000',
  violeta: '#602C66',
  azul: '#2C4466',
  bege: '#EAE0D5',
  gelo: '#F8F9FA',
} as const;

export const fonts = {
  bebas: '"Bebas Neue", sans-serif',
  inter: 'Inter, sans-serif',
  dm: '"DM Sans", sans-serif',
} as const;

export const FPS = 60;
// Durações alinhadas com a narração gravada em public/assets/audio/.
export const TOTAL_FRAMES = 19440;

export const sceneFrames = {
  cena1: { start: 0,     end: 1350,  length: 1350 },  // Hook        22.5s
  cena2: { start: 1350,  end: 4290,  length: 2940 },  // Problema    49.0s
  cena3: { start: 4290,  end: 6870,  length: 2580 },  // Solução     43.0s
  cena4: { start: 6870,  end: 8850,  length: 1980 },  // Mercado     33.0s
  cena5: { start: 8850,  end: 10830, length: 1980 },  // Receita     33.0s
  cena6: { start: 10830, end: 14100, length: 3270 },  // Concorrência 54.5s
  cena7: { start: 14100, end: 16860, length: 2760 },  // Tração      46.0s
  cena8: { start: 16860, end: 18780, length: 1920 },  // Time        32.0s
  cena9: { start: 18780, end: 19440, length: 660  },  // Fechamento  11.0s
} as const;
