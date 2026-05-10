# Guia de Instalação e Execução - Expo Go

Este documento descreve os passos necessários para configurar e rodar a aplicação mobile deste projeto utilizando o **Expo Go**.

## Pré-requisitos

1. **Node.js** instalado no seu computador.
2. Aplicativo **Expo Go** instalado no seu celular:
   - [Baixar para Android (Google Play)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Baixar para iOS (App Store)](https://apps.apple.com/br/app/expo-go/id982107779)
3. Computador e celular conectados na **mesma rede**.

---

## Instalação das Dependências

A aplicação mobile está localizada na pasta `mobile`. Para instalar as dependências necessárias, siga os comandos abaixo no seu terminal:

1. Acesse a pasta do projeto mobile:
   ```bash
   cd mobile
   ```

2. Instale as dependências utilizando o npm (ou yarn/pnpm se preferir):
   ```bash
   npm install
   ```

---

## Como Executar o Projeto

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento do Expo:

1. Dentro da pasta `mobile`, inicie o Expo:
   ```bash
   npx expo start
   ```

2. Após rodar o comando, um **QR Code** aparecerá no seu terminal.

3. **No seu celular:**
   - **Android:** Abra o aplicativo Expo Go e selecione "Scan QR Code". Aponte a câmera para o QR Code no terminal.
   - **iOS:** Abra o aplicativo de Câmera padrão do iPhone, aponte para o QR Code e clique no link do Expo Go que aparecerá na tela.

---

## Comandos Úteis do Expo

Durante o desenvolvimento (com o servidor rodando), você pode utilizar alguns atalhos diretamente no terminal apertando as seguintes teclas:

- `r` - **Reload**: Recarrega o aplicativo no celular (útil se o hot-reload falhar).
- `j` - **Debugger**: Abre o depurador do React Native no navegador.
- `m` - **Menu**: Abre o menu de desenvolvedor no aplicativo (o mesmo que chacoalhar o celular).
- `a` - **Android**: Tenta abrir o aplicativo em um emulador Android (se estiver rodando no PC).
- `i` - **iOS**: Tenta abrir o aplicativo em um emulador de iOS (apenas Mac).
- `c` - **Limpar Cache**: Reinicia o servidor limpando o cache, muito útil quando ocorrem erros inexplicáveis após instalar novas bibliotecas:
  ```bash
  # Para iniciar com o cache limpo:
  npx expo start -c
  ```

---

## Possíveis Problemas e Soluções

- **O aplicativo não carrega ou dá erro de Network:** Verifique se o celular e o computador estão na **mesma rede**. Em redes corporativas ou de faculdade o Expo pode ser bloqueado, nesse caso pode ser necessário utilizar o modo Tunnel:
  ```bash
  npx expo start --tunnel
  ```
- **Erro de pacotes não encontrados:** Pare o servidor (Ctrl + C) e limpe o cache com `npx expo start -c`.
