# CEP Finder - Consulta Profissional de Endereços

Uma aplicação moderna e profissional para consulta de CEPs brasileiros, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### Nível Básico ✅
- ✅ Projeto React.js criado do zero com Vite
- ✅ Consumo da API ViaCEP
- ✅ Listagem de dados em tela

### Nível Intermediário ✅
- ✅ Tratamento de erros com mensagens específicas
- ✅ Campo de busca para filtrar resultados
- ✅ Loading state durante chamadas à API

### Nível Avançado ✅
- ✅ Paginação dos resultados
- ✅ Modal com detalhes ao clicar em um endereço
- ✅ Estilização profissional com Tailwind CSS
- ✅ Código organizado em componentes reutilizáveis
- ✅ **Extras:** Histórico de buscas, busca por endereço, debounce, localStorage

## 🛠️ Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (ícones)

## 📦 Instalação

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
```
# Entre no diretório
```bash
cd BuscaCep
```

# Instale as dependências
```bash
npm install
```

# Execute o projeto

```bash
npm run dev
```

## 📁 Estrutura do Projeto


src/
├── components/       # Componentes reutilizáveis
├── hooks/           # Custom hooks
├── services/        # Serviços de API
├── styles/          # Estilos globais
├── types/           # Definições TypeScript
├── utils/           # Funções utilitárias
└── App.tsx          # Componente principal

## 🔍 Funcionalidades Detalhadas
- Busca por CEP: Digite um CEP válido para encontrar o endereço
- Busca por Endereço: Busque por estado, cidade e logradouro
- Filtro de Resultados: Filtre endereços já carregados
- Paginação: Navegue entre páginas de resultados
- Modal de Detalhes: Veja informações completas do endereço
- Histórico: Acesse rapidamente buscas anteriores
- Responsivo: Interface adaptada para todos os dispositivos

