# CLAUDE.md — Rabisko

## Visão Geral do Projeto

**Rabisko** é um aplicativo mobile que centraliza todo o fluxo de trabalho do mercado de tatuagem, desde a captação do cliente até o acompanhamento pós-sessão. O objetivo é substituir os métodos informais (redes sociais, mensagens, planilhas) por uma plataforma digital especializada que conecta tatuadores e clientes.

**Instituição:** FECAP — Centro Universitário Álvares Penteado  
**Curso:** Ciência da Computação  
**Orientador:** Prof. Leonardo Fabris Lugoboni  
**Ano:** 2026

**Equipe:**
- Bruno Costa Dourado — Product Owner / Back-End
- Vitor Hideki Tokunaga — Scrum Master / Back-End
- João Vitor Leão Bonifácio — UX / Front-End
- Vinicius Binda — Back-End / QA
- Felipe Martins — UX / Front-End
- Alexsander Sudario Abreu — Front-End

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Mobile | React Native + TypeScript |
| Back-end | Java + Spring Boot |
| Banco de Dados | MongoDB (via Azure Cosmos DB) |
| Armazenamento de Imagens | Azure Blob Storage |
| Autenticação | Spring Security + JWT (bcrypt/Argon2) |
| Pagamentos | Mercado Pago API (Pix) |
| Geolocalização | Google Maps Platform API |
| QR Code | ZXing (Java) |
| Infraestrutura | Microsoft Azure (Standard_D2s_v3) |

**Arquitetura:** Monólito Modular — única aplicação executável organizada em módulos por domínio de negócio (autenticação, usuários, tatuadores, busca, chat, simulação, reservas, pagamentos, notificações).
Cada módulo deve ser montado como MVC, e a comunicação entre eles deve ser feita por meio de interfaces

---

## Módulos e Funcionalidades

### Cadastro e Perfil de Tatuador
- Cadastro via e-mail e senha
- Upload manual de imagens do portfólio
- Seleção/remoção de estilos artísticos
- Complemento de perfil (contato, endereço, descrição)
- Indexação no mecanismo de busca após aceite dos termos

### Motor de Busca
- Busca por estilo de tatuagem e localização aproximada
- Resultados ordenados por relevância ou proximidade
- **Boost Premium:** impulsionamento de um trabalho por semana por tatuador

### Galeria de Trabalhos
- Galeria de imagens no perfil do tatuador
- Botão de interação para iniciar conversa
- Histórico de mensagens persistente
- Catálogo de Tatuagens Flash

### Simulação de Tatuagem no Corpo
- Upload de foto/selfie do cliente
- Posicionamento digital da tatuagem sobre a foto
- Ajuste de tamanho, rotação e posição

### Reserva e Agendamento
- Criação de reserva associada ao histórico de conversa e arte final
- Pagamento antecipado de sinal via Pix (Mercado Pago)
- QR Code de confirmação gerado para check-in no estúdio

### Agenda de Sessões
- Lista de sessões nos próximos 7 dias
- Calendário mensal com sessões marcadas
- Tela de detalhes da sessão ao clicar

### Acompanhamento Pós-Tatuagem
- Canal de comunicação ativo após o procedimento
- Envio de fotos da cicatrização
- Orientações do tatuador e discussão de retoques

### Sistema de Avaliação
- Avaliação mútua cliente ↔ tatuador após conclusão do serviço
- Nota em estrelas + avaliação textual opcional
- Exibição no perfil dos usuários; bloqueio de duplicatas

### Dashboards de Negócio (Tatuador)
- Métricas: faturamento, clientes atendidos, ticket médio
- Gráficos de pizza, linha e cartões
- Drill-down em tela analítica por métrica

---

## Requisitos Não-Funcionais Chave

- Imagens armazenadas em infraestrutura segura com controle de acesso
- Dados pessoais protegidos conforme boas práticas (LGPD)
- Somente perfis completos com aceite de termos aparecem na busca
- Consultas de busca com tempo de resposta adequado em grande volume
- Transações financeiras com protocolos seguros
- Interface de agenda e dashboards gerada em até **5 segundos**
- Histórico de conversas e reservas com persistência e integridade garantidas
- Autenticação stateless via JWT; senhas com hash bcrypt/Argon2

---

## Estrutura de Módulos (Back-End)

Cada módulo possui suas próprias entidades, serviços e repositórios:

```
rabisko-backend/
├── autenticacao/           # Autenticação e autorização (JWT, Spring Security)
├── usuarios/          # Gerenciamento de clientes e tatuadores
├── portfolio/      # Cadastro e galeria de trabalhos
├── busca/         # Motor de busca e boost premium
├── chat/           # Mensagens em tempo real e histórico
├── simulacao/     # Simulação de tatuagem no corpo
├── agendamento/        # Reservas, agenda e QR Code
├── pagamento/        # Integração Mercado Pago (Pix)
├── posvenda/      # Acompanhamento pós-tatuagem
├── avaliacao/        # Sistema de avaliação
└── dashboard/      # Métricas e relatórios
```

---

## Custos de Infraestrutura (Referência Mensal)

| Serviço | Custo Estimado |
|---------|---------------|
| Azure Cosmos DB (100 GB) | R$ 128,00 |
| Servidor Azure Standard_D2s_v3 | ~R$ 241,50 |
| Google Maps API (~50k requisições) | ~US$ 140,00 |
| App Store (anual) | US$ 99,00/ano |
| Play Store (taxa única) | US$ 25,00 |
| **Total geral mensal (incl. equipe)** | **~R$ 31.445,00** |

---

## Convenções de Desenvolvimento
- **Convenção de nomes** funcionalidades em PT-BR, nomes técnicos em inglês (Repository, Controlelr, Service, etc)
- **Linguagem back-end:** Java com Spring Boot; seguir convenções padrão Spring (camadas Controller → Service → Repository)
- **Linguagem front-end:** TypeScript com React Native; componentes reutilizáveis e tipagem estrita
- **Banco de dados:** MongoDB — documentos JSON/BSON; evitar esquemas rígidos para módulos com dados variáveis (portfólio, simulação)
- **Segurança:** nunca armazenar senhas em plain text; usar bcrypt ou Argon2; validar tokens JWT em todos os endpoints protegidos
- **Imagens:** nunca armazenar imagens diretamente no banco; usar Azure Blob Storage e guardar apenas a URL no documento
- **Pagamentos:** integração exclusiva via Mercado Pago; validar webhooks de confirmação antes de registrar reserva como paga
- **QR Code:** gerado com ZXing; token único por reserva; validado no check-in do estúdio

---

## Contexto para o Claude

Ao trabalhar neste projeto, considere:

1. **Domínio:** marketplace B2C no nicho de tatuagem — dois perfis de usuário distintos (cliente e tatuador) com fluxos diferentes.
2. **Arquitetura:** monólito modular em Java/Spring Boot. Evitar sugerir microsserviços até que o projeto cresça em escala.
3. **Mobile-first:** toda a UI é React Native; não usar componentes exclusivos de web.
4. **Pagamentos no Brasil:** o foco é Pix via Mercado Pago; não implementar outros meios sem solicitação.
5. **LGPD:** dados de usuários (especialmente fotos de cicatrização e selfies de simulação) exigem atenção especial à privacidade.
6. **Fase atual:** TCC acadêmico — priorizar clareza, documentação e demonstração das funcionalidades core sobre otimizações prematuras.
