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
export const TOTAL_FRAMES = 18271;

export const sceneFrames = {
  cena1: { start: 0,     end: 1350,  length: 1350 },  // Hook        22.5s
  cena2: { start: 1350,  end: 4200,  length: 2850 },  // Problema    47.5s (cortada em 1:10)
  cena3: { start: 4200,  end: 6780,  length: 2580 },  // Solução     43.0s
  cena4: { start: 6780,  end: 8371,  length: 1591 },  // Mercado     26.52s
  cena5: { start: 8371,  end: 10081, length: 1710 },  // Receita     28.5s
  cena6: { start: 10081, end: 13351, length: 3270 },  // Concorrência 54.5s
  cena7: { start: 13351, end: 16111, length: 2760 },  // Tração      46.0s
  cena8: { start: 16111, end: 17671, length: 1560 },  // Equipe      26.0s
  cena9: { start: 17671, end: 18331, length: 660  },  // Fechamento  11.0s
} as const;
