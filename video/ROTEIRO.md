# Roteiro do Vídeo de Pitch — Rabisko

## Especificações técnicas globais

- **Duração total:** 5:20 (320 segundos = 19.200 frames a 60fps)
- **Resolução:** 1920x1080
- **Framerate:** 60fps
- **Áudio:** nenhum (vídeo mudo, sincronizado com narração ao vivo)

## Conversão tempo → frames

Para calcular o frame de qualquer momento: `frame = (minutos * 60 + segundos) * 60`

| Tempo | Frame |
|---|---|
| 0:00 | 0 |
| 0:30 | 1.800 |
| 1:15 | 4.500 |
| 2:00 | 7.200 |
| 2:45 | 9.900 |
| 3:30 | 12.600 |
| 4:10 | 15.000 |
| 4:40 | 16.800 |
| 5:05 | 18.300 |
| 5:20 | 19.200 |

## Princípios de sincronização

Cada cena deve:
1. Iniciar 16-24 frames (~300ms) **antes** do bloco da narração começar
2. Estabilizar no conteúdo principal durante o "respiro" central do bloco
3. Iniciar transição de saída 16-24 frames antes do próximo bloco

## Observação sobre fontes citáveis

Os dados estatísticos do roteiro são suportados por fontes documentadas (ver tabela no fim do arquivo). **A narração não cita as fontes verbalmente** — isso quebra o ritmo do pitch. As fontes aparecem **apenas visualmente** em DM Sans pequeno no canto inferior dos slides das Cenas 2 e 4, e na tabela de Q&A para uso oral se solicitado.

---

## CENA 1 — HOOK (ANIMADA)

**Frames:** 0 a 1.800 (0:00 - 0:30)
**Background:** Preto Blackwork (#000000)
**Mood:** abertura institucional, peso, autoridade

### Narração

> No passado, tatuagem era marca de marginalidade. Hoje, 37% dos brasileiros têm pelo menos uma tatuagem, e o mercado movimenta bilhões de reais por ano. A arte evoluiu, a sociedade evoluiu — mas a forma como o tatuador gerencia o próprio negócio não acompanhou. Chegou a hora dessa evolução acompanhar a agulha.

### Sequência visual (4 beats)

**Beat 1 — LOGO (0:00 - 0:07.5, frames 0-450):**
Tela preta absoluta nos primeiros frames. Logo do polvo aparece no centro com scale 0.85 → 1.0 e fade-in. "RABISKO" surge embaixo do polvo, em Bebas Neue 96px, cor Gelo Highlight, espaçamento amplo (letter-spacing: 0.15em).

**Beat 2 — TRANSIÇÃO (0:07.5 - 0:15, frames 450-900):**
Logo central faz fade-out. Simultaneamente, no canto superior esquerdo, aparece uma versão menor do logo (polvo 32px + RABISKO 24px) que fica permanente como assinatura discreta. Centro da tela fica livre.

**Beat 3 — EVOLUÇÃO (0:15 - 0:22.5, frames 900-1350):**
Três linhas aparecem com stagger de 800ms entre cada uma:
- "A arte evoluiu." (Inter Light, 48px, cor Gelo Highlight)
- "A sociedade evoluiu." (Inter Light, 48px, cor Gelo Highlight)
- "A gestão, não." (Bebas Neue, 96px, cor Violeta Irezumi)

**Beat 4 — AGULHA (0:22.5 - 0:30, frames 1350-1800):**
As três linhas fazem fade-out. Aparece grande no centro a frase âncora em Bebas Neue 140px, cor Gelo Highlight, com translate Y de 20px → 0 + fade:

> CHEGOU A HORA DESSA EVOLUÇÃO ACOMPANHAR A AGULHA.

Quebra em 3 linhas. "ACOMPANHAR A AGULHA" em destaque visual maior.

---

## CENA 2 — PROBLEMA

**Frames:** 1.800 a 4.500 (0:30 - 1:15)
**Background:** transição de Preto para Gelo Highlight (#F8F9FA) nos primeiros 120 frames
**Mood:** revelação do problema, dado factual

### Narração

> Em 2022, 97% dos novos estúdios de tatuagem abertos no Brasil foram MEIs — quase 6.800 pequenos negócios criados num único ano, profissionais que faturam até R$ 81 mil por ano e precisam gerenciar tudo sozinhos. Esse tatuador independente usa hoje cinco ou seis ferramentas desconectadas: Instagram para captação, WhatsApp para orçamento, Google Agenda para horários, plataformas de gestão para parte financeira, Pix avulso para pagamento. Nenhuma delas conversa entre si. O resultado é um artista que passa metade do tempo administrando ferramentas em vez de tatuar.
>
> Do outro lado, o cliente também sofre. Só no primeiro semestre, mais de 275 mil brasileiros pesquisaram remoção de tatuagem — o Brasil é o segundo país do mundo no ranking, atrás apenas dos Estados Unidos. Um em cada quatro brasileiros tatuados se arrepende de pelo menos uma tatuagem.

### Conteúdo visual

**Frames 1.800-2.100 (0:30-0:35):** Background crossfade para Gelo Highlight. No centro, grande "97%" em Bebas Neue 240px, cor Preto. Contador animado de 0% até 97% durante 180 frames.

**Frames 2.100-2.400 (0:35-0:40):** Abaixo do 97%, em Inter Regular 32px, cor Preto: "dos novos estúdios de tatuagem abertos em 2022 foram MEIs". Em DM Sans 14px abaixo, cor cinza: "Fonte: Sebrae, 2023".

**Frames 2.400-2.700 (0:40-0:45):** Crossfade. Centro mostra silhueta linear simples de pessoa com cinco logos orbitando (Instagram, WhatsApp, Google Agenda, Excel, Pix) ligados por linhas tracejadas em Violeta Irezumi com baixa opacidade, cruzadas para sugerir caos.

**Frames 2.700-3.300 (0:45-0:55):** Texto entrando pela direita em Bebas Neue 64px, cor Preto: "5 OU 6 FERRAMENTAS. NENHUMA CONVERSA ENTRE SI."

**Frames 3.300-3.900 (0:55-1:05):** Background muda para Bege Old School. Centro: "275 MIL" em Bebas Neue 180px, cor Preto. Abaixo, Inter 28px: "brasileiros pesquisaram remoção de tatuagem em 6 meses". DM Sans 14px: "Fonte: PrePly, 2024".

**Frames 3.900-4.500 (1:05-1:15):** Frase complementar entrando em DM Sans 24px:
> "Brasil é o 2º país do mundo no ranking — só atrás dos EUA. 1 em cada 4 brasileiros tatuados se arrepende."

---

## CENA 3 — SOLUÇÃO

**Frames:** 4.500 a 7.200 (1:15 - 2:00)
**Background:** Preto Blackwork
**Mood:** revelação do produto, conexão com mercado

### Narração

> A Rabisko é o sistema operacional do tatuador, especialmente os pequenos e médios. Em um único app, integramos toda a jornada: o cliente descobre o artista pela nossa vitrine, simula a tatuagem no próprio corpo usando IA, conversa direto pelo chat, paga o sinal por Pix e agenda a sessão. O tatuador recebe tudo organizado — agenda, pagamento, histórico do cliente, pós-procedimento — em uma única tela.
>
> Atendemos três perfis: estúdios compartilhados com 10 tatuadores e faturamento médio de R$ 50 mil por mês, tatuadores independentes que fazem cerca de 30 trabalhos mensais, e clientes finais que querem tatuar mas têm insegurança sobre como o resultado vai ficar. Unimos em uma só plataforma os três pilares do mercado.

### Conteúdo visual

**Frames 4.500-4.800 (1:15-1:20):** Tela preta. Logo do polvo no centro pequeno (60px). Frase em Bebas Neue 96px, cor Gelo Highlight:
> O SISTEMA OPERACIONAL DO TATUADOR.

**Frames 4.800-5.700 (1:20-1:35):** Frase recua para o topo. Aparecem três caixas grandes com border Violeta Irezumi, stagger de 500ms:
- SIMULAÇÃO NO CORPO — IA que mostra como a tatuagem fica antes do procedimento
- VITRINE PÚBLICA — Descoberta de artistas por estilo, técnica e localização
- FLUXO INTEGRADO — Da descoberta ao pós-procedimento em um único app

**Frames 5.700-6.300 (1:35-1:45):** Crossfade. Header em DM Sans pequeno cor Bege Old School:
> OS 3 PILARES DO MERCADO

Três perfis em coluna horizontal, stagger de 500ms:
- **01 ESTÚDIOS** — 10 tatuadores compartilhados / R$ 50 mil/mês de faturamento
- **02 TATUADORES** — 30 trabalhos independentes / por mês em média
- **03 CLIENTES** — Insegurança / querem tatuar mas não sabem como vai ficar

Cada perfil tem numeração 01-02-03 em violeta, título em Bebas Neue, stat principal em bege e descrição em Inter.

**Frames 6.300-7.200 (1:45-2:00):** Os perfis recuam. Frase de fechamento centralizada em Bebas Neue 96px:
> UNIDOS EM UMA SÓ PLATAFORMA.

"SÓ" em Violeta Irezumi.

---

## CENA 4 — MERCADO E TIMING (ANIMADA)

**Frames:** 7.200 a 9.900 (2:00 - 2:45)
**Background:** Azul Fineline (#2C4466)
**Mood:** escala, oportunidade, momento certo

### Narração

> O Brasil tem mais de 150 mil estúdios de tatuagem ativos. É um mercado que movimentou R$ 2,5 bilhões em 2024, crescendo 15% ao ano, dominado por microempreendedores que acabaram de se formalizar e ainda não foram digitalizados de forma integrada.
>
> Esse é o momento. A geração que está tatuando hoje cresceu fazendo tudo pelo celular. O tatuador de 2026 não quer mais gerenciar seis abas abertas — ele quer um app que resolva. E o cliente de 2026 não confia mais em comprar nada sem ver antes como vai ficar.

### Sequência visual (5 beats)

**Beat 1 — ABERTURA (2:00 - 2:08, frames 7.200-7.680):**
Mapa do Brasil centralizado, outline em Bege Old School com 55% opacidade. Pontos violeta aparecem em stagger orgânico do Norte ao Sul, totalizando ~36 pontos. Label superior "MERCADO BRASILEIRO DE TATUAGEM" em DM Sans pequeno cor Bege.

**Beat 2 — +150 MIL (2:08 - 2:18, frames 7.680-8.280):**
Mapa desliza para a esquerda. No espaço à direita aparece "+150 MIL" em Bebas Neue ~130px, cor Gelo Highlight, com "ESTÚDIOS" e "estúdios de tatuagem ativos em todo o território nacional" embaixo em Inter.

**Beat 3 — R$ 2,5 BI (2:18 - 2:28, frames 8.280-8.880):**
"+150 MIL" sobe e diminui para 55% do tamanho, indo para o topo do painel direito. No centro do painel surge "R$ 2,5 BI" em Bebas Neue ~170px, com pill "↗ CRESCENDO +15% AO ANO" abaixo em DM Sans com background bege translúcido. Pontos periféricos do mapa fazem fade para 20%.

**Beat 4 — ZOOM SP (2:28 - 2:40, frames 8.880-9.600):**
Mapa amplia 2.4x e desloca para enquadrar a região Sudeste, onde fica o cluster intensificado de SP. Painel direito atualiza: "SÃO PAULO" em label, "2.219" em Bebas Neue grande, "novos estúdios abertos só na capital em 2022" embaixo. "FONTE: SEBRAE" em DM Sans pequeno.

**Beat 5 — TIMING (2:40 - 2:45, frames 9.600-9.900):**
Mapa faz fade-out. Tela limpa em azul. Aparece centralizada a frase em Bebas Neue 110px:
> O TATUADOR DE 2026 NÃO QUER MAIS SEIS ABAS ABERTAS.

"SEIS ABAS ABERTAS" em Violeta Irezumi.

**Importante:** o arquivo `references/brazil.svg` (CorelDRAW, viewBox `0 0 220000 194010`) é a fonte do mapa. Use exatamente este arquivo, não substitua.

---

## CENA 5 — MODELO DE RECEITA

**Frames:** 9.900 a 12.600 (2:45 - 3:30)
**Background:** Gelo Highlight (#F8F9FA)
**Mood:** clareza estratégica, números concretos

### Narração

> Ganhamos dinheiro de três formas. A primeira é a mensalidade, que tatuadores e estúdios pagam para usar a plataforma — entre R$ 400 e R$ 600 por mês, conforme o porte. A segunda é o impulso de visibilidade: artistas que querem aparecer mais na vitrine pagam para destacar o perfil em determinados períodos. E a terceira é a taxa sobre cada sinal pago via Pix dentro do app — pequena, mas que cresce junto com o uso da plataforma.
>
> A gente cresce com o mercado, não só com assinatura — a cada nova sessão que acontece, capturamos valor.

### Conteúdo visual

**Frames 9.900-10.200 (2:45-2:50):** Background Gelo Highlight. Título no topo em Bebas Neue 72px, cor Preto:
> 3 FORMAS DE GANHAR DINHEIRO

**Frames 10.200-11.700 (2:50-3:15):** Três cards horizontais aparecendo em stagger de 1.000ms. Cada card tem:
- Número 01-02-03 em Bebas Neue 96px, cor Violeta Irezumi
- Título em Bebas Neue 44px, cor Preto
- Descrição em Inter 18px, cor Preto
- Valor/destaque em DM Sans 24px italic, cor Violeta Irezumi

Cards:
1. **MENSALIDADE** — Tatuadores e estúdios pagam pela plataforma. *R$ 400 a R$ 600 por mês*
2. **IMPULSO DE PERFIL** — Artistas pagam para aparecer mais na vitrine. *Pacotes semanais*
3. **TAXA SOBRE O SINAL** — Pequena taxa em cada pagamento via Pix. *A cada sessão fechada*

**Frames 11.700-12.600 (3:15-3:30):** Cards comprimem para o topo. Embaixo entra frase de fechamento em Bebas Neue 84px:
> A GENTE CRESCE COM O MERCADO. NÃO SÓ COM ASSINATURA.

"COM O MERCADO" em Violeta Irezumi.

---

## CENA 6 — CONCORRÊNCIA E DEFENSIBILIDADE

**Frames:** 12.600 a 15.000 (3:30 - 4:10)
**Background:** Preto Blackwork
**Mood:** maturidade, conhecimento de mercado

### Narração

> Existem dois concorrentes relevantes hoje: Inker e GestãoInk. Ambos são ferramentas competentes de gestão para o tatuador — agenda, anamnese, financeiro, captação de orçamento. Mas existem três espaços que nenhum dos dois ocupa.
>
> Primeiro: simulação de tatuagem na pele do próprio cliente. O Inker tem IA, mas ela gera referências artísticas para o tatuador. Nossa IA faz o oposto — o cliente envia uma selfie e vê como a tatuagem fica no próprio corpo antes de fechar. Atacamos diretamente o problema das centenas de milhares de pessoas que pesquisam remoção todos os anos.
>
> Segundo: monetização de marketplace. Os concorrentes vivem só de mensalidade — a gente também cresce a cada sinal pago pela plataforma.
>
> Terceiro: mobile-first nativo. O mercado é dominado por soluções web responsivas. Construímos Rabisko nativo em React Native desde o primeiro dia, para o artista que vive no celular.

### Conteúdo visual

**Frames 12.600-12.900 (3:30-3:35):** Background Preto. Título em Bebas Neue 72px, cor Gelo:
> POSICIONAMENTO COMPETITIVO

**Frames 12.900-14.100 (3:35-3:55):** Tabela comparativa horizontal com 4 colunas (Feature / Inker / GestãoInk / Rabisko) e 6 linhas. Entra linha por linha em stagger de 400ms.

Ao invés dos nomes das empresas, coloque os logos delas, que estão na pasta references.

| Feature | Inker | GestãoInk | Rabisko |
|---|---|---|---|
| Gestão do tatuador | ✓ | ✓ | ✓ |
| Captação de clientes | ✓ | parcial | ✓ |
| IA — referência artística | ✓ | — | ✓ |
| **Simulação no corpo do cliente** | — | — | ✓ |
| **Taxa sobre o sinal (Pix)** | — | — | ✓ |
| **Mobile-first nativo** | parcial | — | ✓ |

Checks em Violeta Irezumi. X's e traços em cinza claro. Linha do Rabisko com fundo levemente Violeta de baixa opacidade.

**Frames 14.100-15.000 (3:55-4:10):** Tabela recua. Destaque centralizado em Bebas Neue 110px:
> 3 EIXOS QUE NENHUM CONCORRENTE OCUPA.

"3" em Violeta Irezumi, dominante no centro.

---

## CENA 7 — TRAÇÃO E ROADMAP (ANIMADA - SEQUENCIAL)

**Frames:** 15.000 a 16.800 (4:10 - 4:40)
**Background:** Bege Old School (#EAE0D5)
**Mood:** plano concreto, marcos claros

### Narração

> Em parceria com tatuadores e estúdios, estamos estruturando um projeto piloto para validar e ajustar o produto antes do lançamento, com a Microsoft Azure dando escalabilidade de infraestrutura desde o primeiro dia. Nosso go-to-market acontece em três frentes: contato direto via Instagram com testes promocionais, parcerias com estúdios para onboarding assistido, e presença em eventos do setor.
>
> O grande marco comercial é a Tattoo Week São Paulo em novembro de 2027 — o maior evento de tatuagem do mundo, que reúne milhares de profissionais brasileiros e internacionais. É lá que entramos no mercado em escala.
>
> Nossa meta é atingir os primeiros 84 estúdios pagantes em São Paulo até o final de 2028, com breakeven projetado em 21 meses e payback em 37.

### Sequência visual (3 blocos sequenciais)

**Bloco 1 — PARCEIROS (4:10 - 4:18, frames 15.000-15.480):**
Tela bege. Centralizado: header "PARCEIROS TECNOLÓGICOS" em DM Sans pequeno cor Preto. Abaixo, dois cards grandes lado a lado entrando em stagger de 500ms. Cada card tem o tipo (INFRAESTRUTURA / PILOTO) em DM Sans pequeno violeta no topo, e o nome em Bebas Neue grande embaixo:
- INFRAESTRUTURA · Microsoft Azure
- PILOTO · Tatuadores & Estúdios

Tela respira com foco único nesse bloco. Fade-out completo para Bloco 2.

**Bloco 2 — GO-TO-MARKET (4:18 - 4:26, frames 15.480-15.960):**
Tela bege limpa. Header "GO-TO-MARKET · 3 FRENTES". Três cards horizontais entrando em stagger de 400ms, com border-left em Violeta Irezumi. Cada card tem numeração 01-02-03 em violeta, título em Bebas Neue e descrição em Inter:
- 01 INSTAGRAM — Contato direto com testes promocionais e divulgação de artistas que usam.
- 02 PARCERIAS — Estúdios para onboarding assistido e validação durante o piloto.
- 03 EVENTOS — Presença em eventos do setor para captação e exposição.

Fade-out completo para Bloco 3.

**Bloco 3 — ROADMAP + MÉTRICAS (4:26 - 4:40, frames 15.960-16.800):**
Tela bege. Header "ROADMAP COMERCIAL". Timeline horizontal grande no centro, linha base desenhada da esquerda para a direita em ~1.2 segundos. Três marcos circulares aparecendo em sequência (stagger de 800ms):
- 2026 — Projeto piloto com parceiros (ponto normal)
- NOV 2027 — Tattoo Week SP / entrada em escala (ponto MAIOR com glow violeta, escala 1.05x)
- DEZ 2028 — 84 estúdios pagantes em São Paulo (ponto normal)

Abaixo, depois da timeline estabilizar, entram dois números grandes em Bebas Neue, cor Violeta:
- 21 MESES — BREAKEVEN
- 37 MESES — PAYBACK

---

## CENA 8 — TIME, OPERAÇÃO E ASK

**Frames:** 16.800 a 18.300 (4:40 - 5:05)
**Background:** Preto Blackwork
**Mood:** confiança, fechamento estratégico

### Narração

> Somos seis desenvolvedores formados em Ciência da Computação pela FECAP, com papéis definidos entre produto, back-end, front-end e UX. Construímos a Rabisko juntos do zero — arquitetura, design, modelo de negócio. E oferecemos suporte direto no app desde o primeiro dia, porque tatuador não quer aprender plataforma — quer resolver.
>
> Estamos buscando R$ 112 mil de investimento inicial para fechar o desenvolvimento, consolidar a marca e chegar na Tattoo Week 2027 prontos para escalar.

### Conteúdo visual

**Frames 16.800-17.700 (4:40-4:55):** Background Preto. Seis avatares circulares em fileira horizontal centralizada. Cada avatar é círculo com inicial em fundo Violeta Irezumi. Abaixo de cada avatar, em DM Sans 16px:
- BD — Product Owner / Back-end
- VT — Scrum Master / Back-end
- JB — UX / Front-end
- VB — Back-end / Tests
- FM — UX / Front-end
- AS — Front-end

Entrada em stagger de 200ms da esquerda para a direita.

Abaixo dos avatares, em Inter 20px, cor Gelo:
> Ciência da Computação — FECAP · Suporte direto no app desde o dia 1

**Frames 17.700-18.300 (4:55-5:05):** Avatares fazem fade-out. Centralizado:
> R$ 112.000
> INVESTIMENTO INICIAL

"R$ 112.000" em Bebas Neue 220px, cor Violeta Irezumi. "INVESTIMENTO INICIAL" em DM Sans 32px, cor Gelo, espaçamento amplo.

---

## CENA 9 — FECHAMENTO (ANIMADA)

**Frames:** 18.300 a 19.200 (5:05 - 5:20)
**Background:** transição de Preto Blackwork para Violeta Irezumi
**Mood:** clímax emocional, call to action

### Narração

> A tatuagem move bilhões e ainda é gerenciada em seis abas abertas. A gente quer mudar isso. Vem com a gente transformar a vida de milhares de artistas — com apenas um Rabisko.

### Sequência visual (3 beats)

**Beat 1 — BILHÕES (5:05 - 5:10, frames 18.300-18.600):**
Slide começa com background preto. A frase "A TATUAGEM MOVE BILHÕES." entra centralizada em Bebas Neue ~72px, cor Gelo Highlight, com fade + translate vertical leve. Durante os primeiros 3 segundos, o background **faz transição gradual de Preto para Violeta Irezumi** — não é corte, é mudança suave que sinaliza chegada ao clímax. Frase fica visível e estável.

**Beat 2 — TATUAGEM (5:10 - 5:15, frames 18.600-18.900):**
A segunda linha "A GENTE MOVE A TATUAGEM." entra abaixo da primeira, em Bebas Neue ~92px (maior, peso visual ampliado). As duas linhas ficam visíveis juntas. Background já está totalmente Violeta Irezumi.

**Beat 3 — LOGO + SLOGAN (5:15 - 5:20, frames 18.900-19.200):**
As duas linhas sobem juntas e diminuem para 55% do tamanho, indo para a parte superior da tela (mantêm-se visíveis como memória, mas saem do foco). No centro entra o logo do polvo grande (clamp 70-120px) junto com a marca "RABISKO" em Bebas Neue ~100px, escalando de 0.92 → 1.0 com fade.

Logo abaixo, o slogan "COM APENAS UM RABISKO." entra com efeito de **letter-spacing aumentando de 0.05em para 0.25em** ao longo de 1 segundo, criando sensação de "respiração final" antes da imagem estabilizar.

Frame 19.200: tela estabilizada com logo + slogan em Violeta Irezumi.

---

## Tabela de fontes (para Q&A — não citada na narração)

Vocês devem ter essa tabela na mão durante o pitch. Se algum investidor pedir fonte de qualquer dado, podem responder oralmente.

| Dado citado no roteiro | Fonte | Onde foi publicado |
|---|---|---|
| 37% dos brasileiros tatuados | Instituto Dalia (Alemanha) | Diversas matérias citando Tattoo Week, Medical San, Revista Lynx |
| 97% dos novos estúdios = MEIs em 2022 | Sebrae, a partir de dados do CNAE | Agência Sebrae de Notícias, 06/04/2023 |
| Quase 6.800 pequenos negócios em 2022 | Sebrae (6.763 exatos) | Agência Sebrae de Notícias, 06/04/2023 |
| Teto de faturamento MEI = R$ 81 mil/ano | Receita Federal | Lei Complementar 123/2006 |
| 275 mil pesquisaram remoção em 6 meses | PrePly | Diversas matérias (Valor Econômico, Oeste Mais, Conexão Política) |
| Brasil 2º país no ranking de remoção | PrePly | Mesmas matérias |
| 1 em cada 4 brasileiros se arrepende | Pew Research Center | Matérias da Conexão Política |
| +150 mil estúdios no Brasil | Tattoo Week SP | Agência Brasil, 14/11/2024 |
| R$ 2,5 bilhões em 2024 | Tattoo Week SP | Agência Brasil, 14/11/2024 |
| 15% de crescimento ano contra ano | Tattoo Week SP | Agência Brasil, 14/11/2024 |
| 2.219 novos estúdios em SP em 2022 | Sebrae | Agência Sebrae de Notícias, 06/04/2023 |
| Estúdios com 10 tatuadores faturando R$ 50 mil/mês | Pesquisa de mercado interna do BMC Rabisko | Documentação do TCC |
| Tatuadores independentes fazem 30 trabalhos/mês | Pesquisa de mercado interna do BMC Rabisko | Documentação do TCC |

**As fontes Sebrae e PrePly aparecem visualmente nos slides das Cenas 2 e 4 em DM Sans pequeno.** A narração não as menciona verbalmente para preservar o ritmo do pitch.

---

## Cobertura do BMC

O roteiro cobre os 9 blocos do Business Model Canvas:

| Bloco | Onde aparece | Status |
|---|---|---|
| Customer Segments | Cena 3 (3 perfis com números) | Forte |
| Value Proposition | Cena 3 (sistema operacional + 3 pilares) | Forte |
| Channels | Cena 7 (3 frentes go-to-market) | Forte |
| Customer Relationships | Cena 8 (suporte direto no app) | Médio |
| Revenue Streams | Cena 5 (3 fontes nomeadas) | Forte |
| Key Resources | Cena 7 (Microsoft Azure) | Médio |
| Key Activities | Cena 7 (piloto + onboarding + eventos) | Médio |
| Key Partners | Cena 7 (Azure + tatuadores/estúdios) | Forte |
| Cost Structure | Cena 8 (R$ 112k de investimento) | Médio |

---

## Notas finais para o Claude Code

1. **Framerate é 60fps, não 30.** Configurem a composição do Remotion com `fps: 60` e duração total de 19.200 frames (5:20).
2. **Não inserir áudio em momento algum.** Todas as cenas são puramente visuais.
3. **Respeitar rigorosamente os frames exatos.** A narração ao vivo depende dessa sincronização.
4. **Reutilizar componentes.** Logo, contador animado, transição entre cenas devem ser componentes únicos em `src/components/`.
5. **Cores apenas do brandbook.** Nenhuma cor fora da paleta definida em BRANDBOOK.md.
6. **Tipografia apenas das três famílias.** Bebas Neue (títulos/números), Inter (corpo), DM Sans (legendas/labels).
7. **Easing suave em tudo.** Padrão: `Easing.bezier(0.4, 0, 0.2, 1)` para entradas, `Easing.bezier(0.4, 0, 1, 1)` para saídas.
8. **As fontes citadas em DM Sans pequeno embaixo dos números** (Sebrae 2023, PrePly 2024) são obrigatórias nas Cenas 2 e 4 — protegem credibilidade visual mesmo sem citação verbal.
9. **Placeholders Violeta Irezumi** apenas quando necessário (mockups e avatares de time), com label discreto em DM Sans.
10. **Para a Cena 4**, use o arquivo `references/brazil.svg` (viewBox `0 0 220000 194010`) sem substituir.
11. **Render final:** `npx remotion render src/Root.tsx Rabisko out/rabisko-pitch.mp4 --codec=h264 --crf=18`
