# Petize Teste

Este repositório contém a implementação do teste técnico solicitado pela empresa **Petize**, atendendo a todos os requisitos especificados.

Currently, two official plugins are available:

## Visão Geral do Projeto

Este projeto é uma aplicação baseada em **React** que utiliza **ChakraUI v2** para estilização de componentes e **i18Next** para internacionalização. A aplicação inclui uma funcionalidade de busca de usuários e uma página de perfil que pode ser compartilhada via links únicos.

---

## Funcionalidades

- **React**: O projeto foi desenvolvido utilizando o framework React.
- **ChakraUI v2**: Os componentes são estilizados com ChakraUI, com adaptações em CSS quando necessário.
- **Internacionalização**: O site suporta os idiomas Português e Inglês usando **i18Next**.
- **Rotas**:
  - `Home`: Página para busca de usuários.
  - `Profile`: Exibe o perfil do usuário pesquisado e pode ser acessado através de links compartilháveis (exemplo: `/profile/:username`).
- **Validação de Dados**: As entidades, como repositórios e usuários, são modeladas e validadas utilizando **Zod**.

## URL de Deploy

[https://petize-teste.vercel.app](https://petize-teste.vercel.app)

---
## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/Alexdosantos/Petize-teste.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o site em http://localhost:5173.


