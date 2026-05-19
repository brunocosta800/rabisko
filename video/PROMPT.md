# Projeto: Vídeo de pitch institucional Rabisko

## Contexto

Crie um vídeo de 5:20 minutos para apresentar a Rabisko, uma startup brasileira de SaaS e marketplace para tatuadores, a investidores. O vídeo é **mudo** — vai rodar em paralelo a uma narração ao vivo durante a apresentação. Portanto:

- Sem áudio embutido
- Timing fixo e sincronizado com o ROTEIRO.md
- 1920x1080, 60fps, 19.200 frames totais (5 minutos e 20 segundos)

## Arquivos de referência (leia antes de começar)

Esses arquivos devem estar na raiz do projeto. **Leia todos antes de gerar qualquer código:**

1. **`ROTEIRO.md`** — texto da narração, divisão em 9 cenas, frames exatos de início e fim de cada cena, descrição visual cena a cena, especificação de animações por bloco. Fonte da verdade para timing e conteúdo.

2. **`BRANDBOOK.md`** — paleta de cores, tipografia, regras do logo, design tokens. Não invente cores ou fontes que não estejam aqui.

3. **`references/slides-preview.html`** — preview visual completo das 9 cenas. Abra no navegador (ou leia o código HTML/CSS) e veja como cada cena deve ficar. Use como guia de layout, hierarquia, escala tipográfica e densidade visual. **As Cenas 1, 4, 7 e 9 contêm animação real funcional — replique a sequência de beats que está implementada lá.**

4. **`references/brazil.svg`** — mapa do Brasil (CorelDRAW, viewBox `0 0 220000 194010`) com estados delimitados. Use este arquivo no projeto, copiando para `public/assets/brazil.svg`. Não substitua por outro.

## Stack técnica obrigatória

- Remotion última versão estável
- TypeScript (não use JS puro)
- React 18+
- Composição principal: 1920x1080, 60fps, 19.200 frames
- Saída: MP4 H.264 com CRF 18 (qualidade alta sem inchar arquivo)

## Estrutura de pastas esperada

Crie o projeto com esta organização:

```
rabisko-pitch-video/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── public/
│   ├── assets/
│   │   ├── brazil.svg          ← copiar de references/
│   │   ├── logo-polvo.svg      ← se eu fornecer, ou placeholder
│   │   └── mockups/             ← telas do app (placeholders se ausentes)
│   └── fonts/
│       ├── BebasNeue-Regular.ttf
│       ├── Inter-Regular.ttf
│       ├── Inter-Light.ttf
│       ├── Inter-Medium.ttf
│       └── DMSans-Regular.ttf
├── src/
│   ├── Root.tsx                 ← registra a composição
│   ├── Composition.tsx          ← orquestra as 9 cenas em Sequence
│   ├── tokens.ts                ← design tokens (cores, fontes, durações)
│   ├── scenes/
│   │   ├── Scene01Hook.tsx
│   │   ├── Scene02Problema.tsx
│   │   ├── Scene03Solucao.tsx
│   │   ├── Scene04Mercado.tsx
│   │   ├── Scene05Receita.tsx
│   │   ├── Scene06Concorrencia.tsx
│   │   ├── Scene07Tracao.tsx
│   │   ├── Scene08Time.tsx
│   │   └── Scene09Fechamento.tsx
│   ├── components/
│   │   ├── Logo.tsx             ← polvo + marca RABISKO
│   │   ├── AnimatedNumber.tsx   ← contador de 0 até valor
│   │   ├── FonteCitation.tsx    ← rodapé com fonte de dado
│   │   └── BrazilMap.tsx        ← componente do mapa SVG
│   └── styles/
│       └── easings.ts           ← curvas de easing reutilizáveis
```

## Princípios obrigatórios

### Tipografia

- **Bebas Neue:** títulos grandes, números de impacto, frases-âncora
- **Inter:** corpo de texto, descrições, listas
- **DM Sans:** legendas, labels temporais, fontes/citações

Carregue as fontes via `@remotion/google-fonts` ou arquivos locais em `public/fonts/`. Use `delayRender`/`continueRender` para garantir que fontes estejam prontas antes do render.

### Cores

Use APENAS as 5 cores do BRANDBOOK.md. Centralize tudo em `src/tokens.ts`:

```typescript
export const colors = {
  preto: '#000000',       // Blackwork
  violeta: '#602C66',     // Irezumi
  azul: '#2C4466',        // Fineline
  bege: '#EAE0D5',        // Old School
  gelo: '#F8F9FA',        // Highlight
};

export const fonts = {
  bebas: 'Bebas Neue, sans-serif',
  inter: 'Inter, sans-serif',
  dm: 'DM Sans, sans-serif',
};
```

### Easings

Defina dois padrões globais em `src/styles/easings.ts`:

```typescript
import { Easing } from 'remotion';

export const easeIn = Easing.bezier(0.4, 0, 0.2, 1);   // entradas
export const easeOut = Easing.bezier(0.4, 0, 1, 1);     // saídas
```

Use `interpolate(frame, [inputRange], [outputRange], { easing: easeIn })` em todas as animações.

### Animações

- Use `useCurrentFrame()` em cada cena
- `interpolate` para opacidade, translate, scale
- `spring()` apenas quando precisar de feel orgânico (raro neste projeto)
- Stagger entre elementos: 200-1000ms (12-60 frames a 60fps)
- Toda animação tem entrada (~12 frames), respiro (~maior parte), saída (~12 frames)

## Como abordar cada cena

Cada cena é um componente React que recebe as props padrão do Remotion. Estrutura sugerida:

```typescript
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, fonts } from '../tokens';
import { easeIn, easeOut } from '../styles/easings';

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  // ... animações baseadas no frame
  return (
    <AbsoluteFill style={{ backgroundColor: colors.preto }}>
      {/* conteúdo */}
    </AbsoluteFill>
  );
};
```

### Cenas com animação detalhada no preview

Quatro cenas têm animação real implementada no `references/slides-preview.html`. Para essas, replique a sequência de beats que está lá:

**Cena 1 (Hook) — 4 beats em 30s:**
1. LOGO (0-7.5s): polvo aparece + RABISKO surge
2. TRANSIÇÃO (7.5-15s): logo migra para canto, centro fica livre
3. EVOLUÇÃO (15-22.5s): 3 linhas aparecem com stagger ("A arte evoluiu" / "A sociedade evoluiu" / "A gestão, não")
4. AGULHA (22.5-30s): frase-âncora "CHEGOU A HORA DESSA EVOLUÇÃO ACOMPANHAR A AGULHA"

**Cena 4 (Mercado) — 5 beats em 45s:**
1. ABERTURA (0-8s): mapa do Brasil centralizado, pontos aparecem em stagger orgânico
2. +150 MIL (8-18s): mapa desliza pra esquerda, número entra à direita
3. R$ 2,5 BI (18-28s): "+150 MIL" encolhe pro topo, "R$ 2,5 BI" entra grande
4. ZOOM SP (28-40s): mapa amplia 2.4x para enquadrar SP, "2.219 novos estúdios" entra
5. TIMING (40-45s): mapa some, frase "O TATUADOR DE 2026 NÃO QUER MAIS SEIS ABAS ABERTAS"

Importe `brazil.svg` como string (use `staticFile` do Remotion) e renderize inline para conseguir aplicar transforms de zoom/translate.

**Cena 7 (Tração) — 3 blocos sequenciais em 30s:**
1. PARCEIROS (0-8s): tela bege com 2 cards grandes centralizados (Microsoft Azure + Tatuadores & Estúdios)
2. GO-TO-MARKET (8-16s): tela limpa, 3 cards grandes horizontais (Instagram / Parcerias / Eventos)
3. ROADMAP (16-30s): timeline horizontal grande com 3 marcos pulsando, depois números de breakeven/payback

**Importante na Cena 7:** os 3 blocos se **sucedem** com fade-out completo entre eles (foco único por momento), não se empilham nem ficam visíveis simultaneamente. Cada bloco ocupa 90%+ da tela.

**Cena 9 (Fechamento) — 3 beats em 15s:**
1. BILHÕES (0-5s): frase "A TATUAGEM MOVE BILHÕES" entra sobre fundo preto; background faz transição gradual de Preto → Violeta Irezumi nos primeiros 3s
2. TATUAGEM (5-10s): segunda linha "A GENTE MOVE A TATUAGEM" entra abaixo, maior; fundo já é violeta
3. LOGO + SLOGAN (10-15s): linhas sobem e diminuem; logo do polvo + marca RABISKO entram no centro; slogan "COM APENAS UM RABISKO" entra com letter-spacing aumentando de 0.05em para 0.25em

### Citações de fonte

Nas Cenas 2 e 4, aparecem em DM Sans 14px no canto inferior:
- "Fonte: Sebrae, 2023"
- "Fonte: PrePly, 2024"
- "Fonte: Sebrae" (no Beat 4 da Cena 4, junto ao "2.219")

Crie um componente `FonteCitation` reutilizável.

## Mockups do app

A Cena 3 menciona 5 telas mas o preview só mostra os 3 pilares + 3 perfis. Se eu fornecer arquivos em `public/assets/mockups/`, use-os para enriquecer a Cena 3. Caso contrário, mantenha apenas o conteúdo já validado no preview (3 pilares + 3 perfis).

## Logo do polvo

Se eu fornecer `public/assets/logo-polvo.svg`, use-o. Caso contrário, crie um polvo estilizado simples (silhueta com 8 tentáculos curvados, em SVG) como placeholder. **Não use emoji 🐙 — só SVG vetorial.** Veja a implementação placeholder no `references/slides-preview.html` (Cenas 1 e 9 usam máscaras CSS como aproximação).

## O que fazer no início do projeto

Antes de gerar todas as cenas, faça primeiro:

1. **Confirme a leitura.** Diga em uma frase que você leu ROTEIRO.md, BRANDBOOK.md e olhou o slides-preview.html.

2. **Apresente a estrutura.** Liste a estrutura de pastas que vai criar e as dependências do package.json (remotion, react, typescript, @remotion/google-fonts, etc).

3. **Implemente os fundamentos.** Crie:
   - `package.json` e `tsconfig.json` funcionais
   - `remotion.config.ts`
   - `src/Root.tsx` e `src/Composition.tsx` orquestrando 9 sequences vazias
   - `src/tokens.ts` com cores e fontes
   - `src/styles/easings.ts`
   - Componentes utilitários básicos (Logo, FonteCitation, AnimatedNumber)

4. **Implemente APENAS a Cena 1 (Hook) completa** para validação. Pause e me peça feedback antes de continuar.

Quando eu aprovar a Cena 1, gere as outras 8 em sequência, na ordem do roteiro, pausando para validação ao final de cada uma. Não tente fazer tudo de uma vez — iteração cena a cena dá resultado muito melhor.

## Como rodar o preview

Após criar a estrutura, preciso conseguir rodar:

```bash
npm install
npm start              # abre o preview interativo do Remotion
```

E quando estiver tudo pronto:

```bash
npx remotion render src/Root.tsx Rabisko out/rabisko-pitch.mp4 --codec=h264 --crf=18
```

## Restrições importantes

- **Não invente conteúdo.** Todos os textos narrados, números, fontes e estruturas visuais vêm do ROTEIRO.md. Se algo estiver ambíguo, pergunte antes de assumir.
- **Não use bibliotecas de animação extras** (framer-motion, gsap, etc). Remotion + `interpolate`/`spring` resolvem tudo.
- **Não use Tailwind** — use estilos inline com objetos JavaScript ou `<style>` em componentes. Mantém o código portável.
- **Não use emojis em nenhum lugar do output visual.** Use SVGs vetoriais para qualquer ícone necessário.
- **Resista à tentação de "melhorar" o ROTEIRO.** Se você acha que algo deveria mudar, sinalize em comentário no código mas não altere.
- **Sem música, sem efeitos sonoros, sem narração gerada por IA.** O vídeo é mudo, ponto.
- **Não cite fontes na narração** — elas aparecem apenas visualmente nos slides.

## O que esperar de mim como feedback

Para cada cena que você implementar:

1. Vou rodar `npm start` e abrir o preview do Remotion
2. Vou ver a cena rodando
3. Vou dar feedback: "ajustar X", "encurtar Y", "passe para a próxima"

Não tente adiantar trabalho antes da validação. A iteração rápida é o que garante qualidade final.

---

**Primeiro passo:** leia os arquivos referenciados, apresente a estrutura proposta, e implemente os fundamentos + Cena 1. Aguarde meu feedback.
