# Brandbook Rabisko

## Paleta de cores

| Nome | Hex | Uso principal |
|---|---|---|
| **Preto Blackwork** | `#000000` | Fundo principal de cenas escuras (Cenas 1, 3, 6, 8) |
| **Violeta Irezumi** | `#602C66` | Cor de destaque, números importantes, CTAs, fundo de fechamento |
| **Azul Fineline** | `#2C4466` | Fundo da Cena 4 (Mercado), cor secundária |
| **Bege Old School** | `#EAE0D5` | Fundo da Cena 7 (Tração), texto sobre fundo escuro como acent |
| **Gelo Highlight** | `#F8F9FA` | Fundo principal de cenas claras (Cenas 2, 5), texto sobre fundo escuro |

**Regra:** nenhuma cor fora dessa paleta. Tons intermediários devem ser obtidos via opacidade (`rgba(96, 44, 102, 0.5)` para violeta translúcido, etc.), nunca via cores novas.

## Tipografia

| Família | Uso | Tamanhos típicos |
|---|---|---|
| **Bebas Neue** | Títulos grandes, números de impacto, frases-âncora | 64-240px |
| **Inter** | Corpo de texto, descrições, listas | 18-32px (Regular, Light) |
| **DM Sans** | Legendas, labels temporais, fontes/citações, headers de seção | 10-24px |

### Pesos disponíveis

- Bebas Neue: Regular (único peso)
- Inter: Light (300), Regular (400), Medium (500)
- DM Sans: Regular (400), Medium (500)

### Letter-spacing recomendado

- Bebas Neue como título: `0.02em` a `0.05em`
- Bebas Neue como destaque de slogan: `0.15em` a `0.25em`
- DM Sans em labels: `0.20em` a `0.30em` (sempre uppercase)
- Inter: spacing default, sem ajuste

## Logo

### Versões

- **Polvo (mascote):** silhueta sólida em formato circular, sem traços internos, baseado no logo do brandbook visual original
- **Marca tipográfica:** "RABISKO" em Bebas Neue espaçado (letter-spacing 0.15em)
- **Versão composta:** polvo à esquerda + RABISKO à direita, separados por gap de 12-24px

### Cores aplicáveis ao logo

O polvo é monocromático e adapta-se ao fundo:
- Sobre Preto Blackwork: polvo em Gelo Highlight
- Sobre Violeta Irezumi: polvo em Gelo Highlight
- Sobre Azul Fineline: polvo em Gelo Highlight
- Sobre Bege Old School: polvo em Preto Blackwork
- Sobre Gelo Highlight: polvo em Preto Blackwork

### Tamanhos recomendados por contexto

- **Logo de abertura (Cena 1):** polvo 60-120px + marca 96px
- **Logo no canto (Cena 1 a partir do Beat 2):** polvo 20-32px + marca 14-22px
- **Logo de fechamento (Cena 9):** polvo 70-120px + marca 48-100px

### Regras de uso

- Não rotacionar, não distorcer, sempre manter proporção original
- Não aplicar gradientes, sombras ou efeitos sobre o logo
- Não usar emoji 🐙 como substituto — sempre SVG vetorial
- O arquivo SVG oficial deve estar em `public/assets/logo-polvo.svg` no projeto Remotion

## Princípios de design

### Densidade visual

Cada cena deve ter no máximo **3 elementos principais** simultâneos na tela. Em cenas animadas, blocos podem se suceder no tempo — não empilhar visualmente.

### Hierarquia tipográfica

Cada slide tem um único elemento dominante (geralmente em Bebas Neue grande). Hierarquia decrescente:
1. Número-âncora ou frase-chave (Bebas Neue 96-240px)
2. Título de seção (Bebas Neue 44-72px)
3. Descrição (Inter 18-32px)
4. Legenda/fonte (DM Sans 10-14px)

### Movimento

- **Easing padrão de entrada:** `cubic-bezier(0.4, 0, 0.2, 1)`
- **Easing padrão de saída:** `cubic-bezier(0.4, 0, 1, 1)`
- **Stagger entre elementos:** 200-1000ms dependendo da densidade
- **Sem bounces, sem efeitos hollywoodianos.** Movimento sutil e preciso.

### Background

Cada cena tem uma cor de fundo principal. Transições entre cenas usam crossfade ou recolorização gradual, nunca cortes secos.

## Aplicação no Remotion

Criar arquivo `src/tokens.ts` com:

```typescript
export const colors = {
  preto: '#000000',
  violeta: '#602C66',
  azul: '#2C4466',
  bege: '#EAE0D5',
  gelo: '#F8F9FA',
};

export const fonts = {
  bebas: 'Bebas Neue, sans-serif',
  inter: 'Inter, sans-serif',
  dm: 'DM Sans, sans-serif',
};

export const easings = {
  in: [0.4, 0, 0.2, 1] as const,
  out: [0.4, 0, 1, 1] as const,
};
```

Carregar fontes em `src/Root.tsx` usando `@remotion/google-fonts` ou arquivos locais em `public/fonts/`.
