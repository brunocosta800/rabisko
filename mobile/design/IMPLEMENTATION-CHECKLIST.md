# Rabisko mobile — checklist de alinhamento ao design

Comparação dos comps em `design/` (protótipo-fonte `design/src/ui_kits/mobile-app/` + `design/src/colors_and_type.css` — o contrato; os PNGs em `screenshots/` são crops do topo do frame 402×874) com as telas em `src/screens/`.

Prioridades: **F = fundação** (fazer primeiro, destrava o resto) → **P1** = corrigir telas existentes → **P2** = telas faltando → **P3** = extras a reconciliar.

Status: `[ ]` a fazer · `[~]` em andamento · `[x]` feito.

---

## F — Fundação (design system)

- [x] **F1. Padrão de bordas arredondadas — anchor = seletor de perfil do Cadastro (RoleSwitch).**
  Curvatura canônica do design: **container externo = 12px, botão interno = 8px** (12 − 4 de padding). Toda outra borda escala disso:

  | token | valor | uso |
  |---|---|---|
  | `r-xs` | **8px** | item interno dentro de um container `md` (cada botão do RoleSwitch) |
  | `r-sm` | 10px | micro-chips / tags inline |
  | **`r-md`** | **12px** | **DEFAULT** — botões, fields, abas, role-switch (container), maioria dos containers |
  | `r-lg` | 16px | cards, sheets, tiles de superfície |
  | `r-xl` | 22px | hero cards, mídia grande |
  | `r-2xl` | 28px | modal sheets, bloco de logo |
  | `r-pill` | 9999px | status pills, botões de ícone redondos, segmented "full" |

  - [x] Escala em `tailwind.config.js` → `theme.extend.borderRadius` (`r-xs`…`r-pill`) → classes `rounded-r-xs` … `rounded-r-pill`.
  - [x] Espelhar em `src/theme/index.ts` → `radius` (`xs:8 … pill:9999`).
  - [x] **Banir hardcode**: trocou todo `rounded-[..]`/`rounded-2xl`/`rounded-3xl`/`rounded-xl`/`rounded-full` (e os `borderRadius:` inline de `SearchScreen.web.tsx`) pelos tokens `rounded-r-*`. Mapeamento aplicado: botões/inputs/icon-chips/time-slots/markers → `r-md`; cards → `r-lg`; portfólio → `r-xl`; sheets (Register form, Profile header, ArtistProfile content sheet) → `r-2xl` (com `rounded-t-r-2xl`/`rounded-b-r-2xl`); chips/pills/avatares-redondos/radio → `r-pill`. Exceções legítimas (inline geométrico em px) preservadas: `Stepper.tsx:38` (28×28 círculo → 14) e `app.routes.tsx:45` (indicador de aba 3px → 2). Lint limpo (0 erros).
  - [x] Comentário/regra no `tailwind.config.js` e nota no `CLAUDE.md`.

- [x] **F2. Cores — tokens reais (substituir a ramp `primary` rosada).**
  - [x] Tokens `rbk` em `tailwind.config.js`: `background #F8F9FA`, `surface #EAE0D5`, `surface-2 #F2EBE0`, `ink #000`, `ink-soft #1A1A1A`, `paper #FFF`, `hairline #D9D9D9`, `plum #602C66`, `plum-deep #4A2150`, `plum-tint #EFE6F0`, `fg-2 #404040`, `fg-3 #6B6B6B`, `on-ink #FFF`, `success #1F7A4D`, `warning #B5752A`, `error #B33A3A`.
  - [x] Espelhar em `src/theme/index.ts`.
  - [x] Migrou usos: `bg-primary-100`/`bg-[#eaddd7]` → `bg-surface`; `bg-primary-100/30` e `/50` → `bg-surface-2`; `bg-[#f8f9fa]` → `bg-background`; `border-primary-100` → `border-hairline`; `text-primary-500` → `text-ink`; `#666`/`#999`/`#ccc`/`#bfa094` inline → `#6B6B6B`/`#D9D9D9`/`#602C66`. PaymentScreen MethodTile e BookingScreen time-slot selecionados agora usam **plum**; o `react-native-calendars` (legacy) recebeu `selectedColor: '#602C66'` e `todayTextColor: '#000000'` (encerra antes do CalendarMini substituir).
  - [x] Status pills `bg-green-100`/`bg-yellow-100` (BookingsScreen) → Confirmado = `bg-plum` + `text-on-ink`; Pendente = `bg-surface border border-ink` + `text-ink`. Sign-out (SettingsScreen) `bg-red-50`/`bg-red-500`/`text-red-500` → `bg-error/10`/`bg-error`/`text-error`. Switch track ativo `#000` → plum `#602C66`.
  - [x] Removeu do `tailwind.config.js` os keys `primary` (ramp), `secondary`, `card`, `text`, `muted`; do `src/theme/index.ts` removeu `colors.primary`, `colors.secondary`, `colors.gray`, `colors.white`, `colors.black`, e o bloco `borderRadius` legado. `npx expo lint` e `npx tsc --noEmit` limpos (0 erros).

- [~] **F3. Tipografia.**
  - [x] `@expo-google-fonts/bebas-neue` + `@expo-google-fonts/inter` + `@expo-google-fonts/dm-sans` instalados; `useFonts` no `App.tsx` carregando Bebas 400, Inter 300/400/400i/500/600/700/800, DM Sans 400/700; `expo-splash-screen` segura até carregar.
  - [x] Tokens de família em `tailwind.config.js` → classes `font-display` (Bebas), `font-body`/`font-body-medium`/`font-body-semibold`/`font-body-bold`/`font-body-extrabold`/`font-body-light`/`font-body-italic` (Inter), `font-aux`/`font-aux-bold` (DM Sans).
  - [ ] Substituir nas telas os `font-black uppercase tracking-tighter` que imitam display → `font-display` / `font-aux-bold` / etc., e aplicar a escala de tamanhos (`t-display-lg = 32`, `t-h1 = 32`, `t-h3 = 20`, `t-body-lg = 16`, `t-button = 20`, `t-caption = 11`...). (P1)

- [ ] **F4. Sombras → flat.** Remover `shadow-sm/lg/xl/2xl` de cards, search bars, markers, avatar. Sombra só em coisas que flutuam de verdade (bottom sheet, modal, FAB) ≈ `0 6px 18px rgba(0,0,0,.08)`.

- [ ] **F5. Espaçamento.** Adotar a escala 8pt (a Tailwind padrão já bate: `p-1`=4 … `p-6`=24 … `p-16`=64). Padrões: padding lateral de tela = 24 (`px-6`), topo sob status bar ≈ 68, gap entre cards = 12, padding de card = 16–20, bottom nav reserva = 80. Hoje as telas misturam `px-6`/`px-8` sem critério.

- [x] **F6. Componentes do kit → `src/components/common/`:**
  - [x] `Button` → retângulo `rounded-r-md`, `font-body-bold` 20px, padding 18×40, press scale .97 (sem `opacity .8`), variantes `primary(ink)`/`secondary(surface)`/**`plum`**/`outline`/`ghost`, estados `loading`/`disabled`.
  - [x] `Input` (Field) → cream `bg-surface`, `rounded-r-md`, label `font-body` 12px caixa normal em `text-fg-2`, sem borda em repouso, foco → **borda plum** (erro → borda `error`), ícone leading + `secure`(olho)/`trailingIcon` opcional.
  - [x] `Header` → back chevron + título Bebas centralizado (3 zonas), padding-top do safe-area inset.
  - [x] `Stepper` → 4 passos (Artista·Data·Pagamento·Concluído), done = plum+check, ativo = ink+nº, futuro = círculo outline; conectores preenchem em plum.
  - [x] `CalendarMini` → grade do mês (pt-BR, domingo primeiro), nav de mês, dia selecionado = bolinha plum, hoje = ink negrito sublinhado, dias antes de `minDate` mutados; controlado via `selectedDate`/`onSelectDate`.
  - [x] `Chip` → `FilterChip` (pill cream→ink, ícone), `PrefChip` (pill ink→plum, label branco uppercase), `StatusPill` (`ink` = cream+borda ink / `plum` = plum cheia).
  - [x] `ArtistCard` → bloco preto `rounded-r-lg`, coração top-left (`favorited`/`onToggleFavorite`), nota+estrela top-right, foto 96px `rounded-r-lg`, nome centro, tags pill outline branco, rodapé cream "ver mais...".
  - [x] `BottomNav` custom → ver F7.
  - [ ] `Toast` (snackbar plum) — ainda não portado (baixa prioridade).

- [x] **F7. Bottom navigation** (`src/routes/app.routes.tsx`). **4 abas — Home · Chat · Sessões · Settings** (Chat agora tem `ChatScreen` — lista de conversas estática; o thread completo com anexos é P2). Surface cream `#EAE0D5`, sem borda; ativo = **plum** + indicador "pill underline" animado (`withSpring`, largura 0→18) + ícone com escala 1.12 (componente `TabBarIcon` com reanimated). Abas **Search** (mapa) e **Profile** removidas da nav (os arquivos `SearchScreen`/`ProfileScreen` continuam no repo até a decisão de P3). Altura ~96px (≈ design 80 + safe-area; refinar com inset depois é polish).

- [ ] **F8. Animações.** Padronizar: screen-enter `fadeUp` (10px→0, opacity 0→1, ~220ms `ease-out`), press scale .97, indicador de aba `width 0→18px` com mola, sucesso (Confirmed) = check com mola + 2 anéis expandindo, stagger de lista 30ms, respeitar reduced-motion.

- [~] **F9. Papéis (Cliente/Artista/Estúdio).**
  - [x] `RoleSwitch` (`src/components/common/RoleSwitch.tsx`) — container `rounded-r-md` 12px com `p-1` (4px), 3 botões `rounded-r-xs` 8px, selecionado = `bg-ink` + texto branco, com ícones (User/Brush/Store). **Este é o anchor do F1.**
  - [x] `role: 'cliente' | 'artista' | 'estudio'` + `setRole` no `authStore` (persistido).
  - [~] Wiring: Login + Cadastro feitos (P1) — ambos renderizam `RoleSwitch` + copy/CTA por papel. Falta a divisão de `AppRoutes` por papel (artista/estúdio → Dashboard, P2 #13).

---

## P1 — Corrigir as telas que já existem

### Login (`src/screens/Auth/LoginScreen.tsx`) — `[x]`
- [x] `Header onBack={() => navigation.goBack()}` no topo — volta pra Landing (que agora é o initial route do `AuthRoutes`).
- [x] `RoleSwitch` (de `src/components/common/RoleSwitch.tsx`, controlado por `useAuthStore().role`/`setRole`) + copy por papel via `SUBTITLE_BY_ROLE` (cliente/artista/estudio).
- [x] Título "BEM-VINDO" em `font-display text-[32px]` — Bebas, sem `text-[44px] font-black uppercase tracking-tighter`.
- [x] "Esqueceu a Senha?" → `font-body-bold text-[12px] text-plum`, `hitSlop={8}` para área de toque.
- [x] Botão "Entrar" ancorado no rodapé via `<View className="flex-1" />` spacer; forma/label do `Button` (já `rounded-r-md` + Inter 700/20 desde F6).
- [~] Cliente → Home (default do `AppRoutes`). Artista/estúdio → Dashboard ainda não existe (P2 #13); para já, `setRole` guarda o papel no store e todos os papéis caem em Home; quando o Dashboard for criado, a divisão do `AppRoutes` por papel resolve o roteamento real.

### Cadastro (`src/screens/Auth/RegisterScreen.tsx`) — `[~]`
- [x] `Header` + back chevron → `navigation.goBack()` (volta pra Login, que é o initial route do AuthRoutes).
- [x] `RoleSwitch` controlado por `useAuthStore().role`/`setRole`; `SUBTITLE_BY_ROLE` muda a copy de descrição; `CTA_BY_ROLE` muda o botão ("Criar conta" / "Sou artista" / "Sou estúdio").
- [x] Campos comuns a todos os papéis: **Nome completo / E-mail / Senha**. Removidos: Nascimento+CPF, "Confirmar Senha".
- [x] Condicionais por papel: artista → `@ Instagram` + 8 pills `PrefChip` multi-select de "Estilo principal" (`TATTOO_STYLES`); estúdio → `CNPJ` + `Endereço completo`.
- [x] Bloco "Localização / Horários de Atendimento" hardcodado removido.
- [x] Nota de Termos: ícone `Info` + texto `font-body 12/16 text-fg-3` com "Termos de Uso" e "Política de Privacidade" em `text-plum`.
- [~] CTA roteia via `setUser` (mock) — todos os papéis caem em Home enquanto Dashboard (P2 #13) não existir, igual à Login. "Já tem conta? Entrar" → `navigation.navigate('Login')`.

### Home (`src/screens/App/HomeScreen.tsx`) — `[x]`
- [x] Linha de saudação "OLÁ, {firstName}" (lê do `useAuthStore().user`, fallback "VOCÊ") + localização "São Paulo, SP" com ícone `MapPin` + botão `Bell` com bolinha plum (overlay 2.5×2.5 com borda do background pra parecer flutuando).
- [x] Headline editorial em 3 linhas, alinhada à esquerda: "ARTISTAS" `font-display text-[64px]` / "perto de" `font-body-italic text-[28px] text-plum lowercase` / "VOCÊ" `font-display text-[64px]`.
- [x] Search bar via `Input` (Field) com `icon=Search` + `trailingIcon=SlidersHorizontal`, placeholder "Artistas, estúdios, estilos...".
- [x] Filter chips `[Perto, Estilo, Preço, Disponível]` via `FilterChip` com ícones (`Compass`/`Palette`/`Tag`/`CalendarCheck`), "Perto" default ativo. "Dinheiro" e o uppercase pesado removidos.
- [x] Const `CATEGORIES` morta removida (junto com sabor "serviços em geral"); imports não-usados também.
- [x] Todas as seções: "Por estilo" (rail de `StyleTile` 96×128), "Flash do dia" (com `StatusPill` "HOJE" tone plum + rail de `FlashCard` 168×168), "Em destaque" (hero 16:11 com badge BOOST), "Favoritos" (rail de `FavoriteTile` redondo 72px com coração plum no canto), "Perto de você" (grid 2-col de `ArtistCard` real com FadeInDown stagger), card-dica "NOVIDADE → ABRIR" (entrada planejada do Simulador, fundo `bg-plum-tint`, ícone `Sparkles` em círculo plum).
- [x] Cards pretos `rounded-[32px]` ad-hoc substituídos pelo `ArtistCard` (`r-lg`, footer "ver mais..."), com `onPress` navegando pra `EstablishmentProfile`.

### Artist Profile (`src/screens/App/EstablishmentProfileScreen.tsx`)
- [ ] Alinhar a intenção ao design (perfil de artista centrado-no-chat). Trocar o layout banner pelo centralizado: foto redonda 120px → pill da 1ª tag → nota+estrela → nome em DM Sans `t-h1`.
- [ ] Coração flutuante no topo direito.
- [ ] "Sobre" dentro de um card cream `rounded-r-lg` + linha "@handle"; usar a copy do design.
- [ ] "Portifólio": 2 imagens quadradas `rounded-r-xl` (22px) + link "Ver Todos".
- [ ] Adicionar a seção "Avaliações" (card de review: avatar de iniciais, nome, "Há 2 horas", 5 estrelas, texto micro).
- [ ] Remover a seção "Horários" e o badge "Verificado"; remover a barra inferior com preço.
- [ ] CTA full-width "Iniciar Conversa" → Chat (não "Reservar Agora" → Booking). *Se o produto precisar de "Reservar" aqui, levar pro DESIGN.md primeiro.*

### Booking (`src/screens/App/BookingScreen.tsx`)
- [ ] `Stepper` (passo 1).
- [ ] Mini-linha do artista (foto 46px + nome + tags) — passar o artista via params.
- [ ] Trocar `react-native-calendars` pelo `CalendarMini`: dia selecionado = bolinha plum, hoje = sublinhado. (F2 já neutralizou as cores legadas: `selectedColor` agora é plum, `todayTextColor` é ink — a troca de componente segue como P1.)
- [ ] Header "RESERVA" Bebas; remover headings "Selecione a Data/Horário" → só "Horário" DM Sans h3 + linha "{dia} Out · {hora}".
- [ ] Slots = 6 (10/12/14/16/18/20), 3/linha, `rounded-r-md`, selecionado = ink, não-selecionado = cream sem borda, pré-selecionar 14:00.
- [ ] Remover o card "Resumo da Reserva".
- [ ] Botão sempre habilitado, "Avançar para Pagamento".

### Payment (`src/screens/App/PaymentScreen.tsx`)
- [ ] `Stepper` (passo 2).
- [ ] Tile "Projeto escolhido" (imagem do desenho, `rounded-r-lg`).
- [ ] Trocar o card preto "Total R$ 250" pelo card **cream** com breakdown: Valor R$ 200,00 / Sessões 3x / Taxa da Reserva R$ 20,00 / divisor ink / Valor Total R$ 220,00.
- [ ] Métodos = 3 `MethodTile` lado a lado (ícone+label empilhados), selecionado = borda 2px plum (sem radio, sem linhas full-width).
- [ ] Nota "Pagamento criptografado..." com cadeado.
- [ ] Botão "Confirmar Pagamento" → "Processando…" → tela Confirmed (remover o `alert()`).

### Bookings → "Sessões" (`src/screens/App/BookingsScreen.tsx`)
- [ ] Header: overline "MINHA AGENDA" + "Sessões" Bebas.
- [ ] `CalendarMini` no topo.
- [ ] Toggle: segmented control real (container cream `rounded-r-pill`, ativo = ink), labels "Próximas"/"Concluídas", com estado funcional + filtro.
- [ ] Cards → `SessionRow`: foto 52px `rounded-r-md`, nome + (pill "HOJE" plum se hoje) + estilo·local + data·duração; trailing = pill plum "CHECK-IN" + QR se hoje / check-circle plum se concluída / chevron senão; linha de hoje = fundo ink invertido. Tirar verde/amarelo.
- [ ] Datas relativas ("Hoje · 14:00", "Sex · 19 Out · 18:30"); incluir endereço/distância/preço/depósito/código. Tirar "Barbearia VIP".
- [ ] Card com `onPress` → tela Session Detail (P2).

### Settings (`src/screens/App/SettingsScreen.tsx`)
- [ ] Título "Configurações" Bebas + subtítulo "Gerencie sua conta, pedidos, pagamentos e preferências".
- [ ] Alinhar a lista ao design (lista única, sem grupos): "Meu Perfil / Meus Pedidos / Métodos de Pagamento / Notificações / Ajuda" — ou, mantendo grupos+toggles, levar a variação pro DESIGN.md primeiro.
- [ ] Linhas: ícone "pelado" + label + chevron (tirar o chip preto de cada ícone). Card container `rounded-r-lg` com `surface` sólido (não translúcido), divisores `hairline #D9D9D9`.
- [ ] Toggle "ligado" → plum (não preto).
- [ ] "Sair da Conta": se ficar, usar `error #B33A3A` (não `red-500`/`red-50`); decidir no DESIGN.md se Settings tem sign-out (§10 diz que sim; o stub não mostra).

---

## P2 — Telas faltando do catálogo (criar)

- [x] **Landing (01)** — `src/screens/Auth/LandingScreen.tsx`. Vertical+horizontal centered: bloco-logo 132×132 `rounded-r-2xl bg-ink` (placeholder "R" em Bebas 80px branco — TODO: trocar pela imagem `logo-bisko-mark.png` quando o asset chegar no repo), "RABISKO" `font-display text-[64px]` com tracking +1.3, tagline `font-body 14 text-fg-2` (max 280, centered), CTA primary "Entrar" → Login, link "Novo por aqui? Criar conta" → Register. Adicionado como `Screen` em `auth.routes.tsx` com `initialRouteName="Landing"`; Login agora tem `Header onBack={navigation.goBack}` voltando pra cá.
- [ ] **Confirmed (06b)** — tela cheia sem nav, `Stepper` passo 3, check plum grande + 2 anéis expandindo + pop com mola, "Reserva Confirmada" Bebas, copy de 24h, card-resumo (foto + nome + "Ter 14 Out · 14:00 · R$ 220,00" + `StatusPill` "Pago" plum), botões "Abrir Chat com {nome}" + "Voltar para Home".
- [~] **Chat (08)** — `ChatScreen.tsx` (lista de conversas estática + empty-state + FAB) já feita e ligada na aba do bottom nav (F7). Falta: dados/estado reais e a tela de thread/mensagens com anexos de imagem (`ChatV2`).
- [ ] **Session Detail (09b)** — detalhe de uma sessão: dados completos, "Abrir chat" / "Check-in".
- [ ] **Check-in (10)** — QR code do cliente pra apresentar no estúdio.
- [ ] **Scanner (10b)** — leitor de QR (papel artista/estúdio).
- [ ] **Healing (11)** — timeline de cicatrização pós-tattoo.
- [ ] **Rating (12)** — estrelas + comentário pós-sessão.
- [ ] **Dashboard (13)** — overview de reservas + receita (artista/estúdio); definir `AppRoutes` por papel.
- [ ] **Simulador (07)** — preview do desenho no corpo (`expo-image-picker` + visão; contraparte do `boofcv` no backend); entradas: card "NOVIDADE" da Home e botão "ABRIR".

---

## P3 — Extras fora do design (reconciliar)

- [ ] **Search / mapa (`SearchScreen.tsx` + `.web.tsx`)** — o design não tem mapa; descoberta é o feed + filtro "Perto". Decidir: (a) remover a aba e dobrar a função no filtro "Perto" da Home, ou (b) se mapa for requisito, adicionar a tela ao DESIGN.md (sem sombras, raios `rounded-r-lg/r-pill`, plum) antes de manter.
- [ ] **Profile (`ProfileScreen.tsx`)** — não existe no design; duplica "Meu Perfil" (lá é uma linha do Settings) e ocupa uma aba. Decidir: remover a aba (mover conteúdo pra um "Meu Perfil" dentro de Settings) ou formalizar no DESIGN.md.
- [ ] **ForgotPassword / NewPassword** — não estão no catálogo. Adicionar essas duas ao DESIGN.md (são necessárias na prática) e reescrevê-las usando `Header`/`Field`/`Button`, fundo `background #F8F9FA`, tokens de raio. Corrigir o bug de layout do botão "Enviar Link" (está fora da `View` com padding → estica de borda a borda).
- [ ] **`src/mocks/react-native-maps.js`** — dead code (não referenciado no `metro.config.js`); remover ou ligar de fato se for fazer fallback de mapa.
