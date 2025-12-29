# TrendBlade - Dashboard de Produtividade e Metas

Um dashboard moderno e interativo para gestão de metas pessoais, projetado para ser reutilizável e escalável. Focado em uma experiência de usuário limpa e eficiente.

## 🎯 Objetivo
O projeto visa auxiliar na organização de metas anuais divididas por categorias essenciais, permitindo o acompanhamento de progresso, registro de observações e persistência de dados localmente.

## 🧱 Tecnologias Utilizadas
- **HTML5**: Estrutura semântica.
- **CSS3**: Design moderno, responsivo (mobile-first) e variáveis para fácil manutenção.
- **JavaScript (Vanilla)**: Lógica de aplicação, manipulação de DOM e persistência.
- **LocalStorage**: Armazenamento de dados no navegador do usuário.

## 🗂️ Estrutura do Projeto
- `/css`: Estilos da aplicação.
- `/js`: Lógica modularizada (Storage, UI, App).
- `index.html`: Ponto de entrada da aplicação.

## 🚀 Como Rodar Localmente
1. Clone o repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Não é necessário servidor backend ou instalação de dependências.

## ☁️ Deploy na Vercel
Este projeto está configurado para deploy automático na Vercel. Basta conectar seu repositório GitHub à plataforma Vercel e o deploy será realizado instantaneamente.

## 🧠 Decisões de Design e Melhorias
- **Mobile-First**: A interface foi pensada para ser usada tanto no desktop quanto no celular, com um menu lateral que se adapta ao topo em telas menores.
- **Persistência Simples**: O uso de `localStorage` garante que o usuário não perca seus dados ao fechar o navegador, sem a complexidade de um banco de dados externo.
- **Modularidade**: O código JS foi dividido em responsabilidades claras (armazenamento, interface e lógica principal) para facilitar futuras expansões.
- **Feedback Visual**: Barras de progresso e cores dinâmicas fornecem gratificação instantânea ao concluir tarefas.

---
Desenvolvido com foco em clareza, escalabilidade e experiência do usuário.
