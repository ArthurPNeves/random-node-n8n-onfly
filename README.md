# n8n Custom Random Node

Um conector personalizado para a plataforma de automação n8n que gera números verdadeiramente aleatórios usando a API do Random.org.

## 📋 Descrição do Projeto

Este projeto implementa um conector customizado para n8n que recebe inputs de valores mínimo e máximo (ambos inclusos) e retorna um número verdadeiramente aleatório gerado pela API do [Random.org](https://www.random.org).

### ✨ Funcionalidades

- **🎯 Operação única**: "True Random Number Generator"
- **📊 Inputs configuráveis**: Valores mínimo e máximo (inteiros)
- **🔗 Integração com Random.org**: Utiliza a API oficial para gerar números verdadeiramente aleatórios
- **🎨 Interface amigável**: Nomes descritivos e validação de entrada
- **🖼️ Ícone customizado**: SVG personalizado para fácil identificação

## 🛠️ Pré-requisitos

- **Node.js**: Versão 18+ (preferencialmente 22 LTS)
- **Docker & Docker Compose**: Para executar o n8n e PostgreSQL
- **Git**: Para clonar o repositório

## 🚀 Instalação e Configuração

### 1. Clone o repositório

\`\`\`bash
git clone <repository-url>
cd n8n-custom-random-node-project
\`\`\`

### 2. Instale as dependências

\`\`\`bash
# Dependências do projeto principal
npm install

# Dependências do custom node
cd custom-nodes/n8n-nodes-random
npm install
cd ../..
\`\`\`

### 3. Build do custom node

\`\`\`bash
# Fazer build do custom node
npm run build
\`\`\`

Este comando irá:
- Compilar o TypeScript do custom node
- Copiar os ícones SVG
- Copiar os arquivos compilados para a pasta \`.n8n/custom\`

### 4. Iniciar a infraestrutura

# Iniciar n8n + PostgreSQL
npm run dev


### 5. Acessar o n8n

Abra seu navegador e acesse: http://localhost:5679

**Credenciais de acesso:**
- Create an account


## 🎯 Como Usar o Custom Node

1. **Acesse o n8n** em http://localhost:5679
2. **Crie um novo workflow**
3. **Adicione o node "Random"** (procure por "Random" na lista de nodes)
4. **Configure os parâmetros**:
   - **Operation**: True Random Number Generator (já selecionado)
   - **Minimum Value**: Valor mínimo desejado (ex: 1)
   - **Maximum Value**: Valor máximo desejado (ex: 100)
5. **Execute o workflow** para gerar um número aleatório

### 📊 Exemplo de Saída

json
{
  "randomNumber": 42,
  "min": 1,
  "max": 100,
  "source": "random.org",
  "timestamp": "2024-03-15T10:30:45.123Z"
}



# Compilar e configurar custom node
npm run build

# 🚀 Iniciar ambiente de desenvolvimento
npm run dev

# Parar containers
npm run stop

# Ver logs do n8n
npm run logs

# Limpar containers e volumes
npm run clean

## 🔍 Desenvolvimento

### Alterações no Custom Node

Após fazer alterações no código do custom node:

1. **Rebuild o node**:
   npm run build

2. **Reinicie o n8n**:
   npm run stop
   npm run dev


## 🌐 API do Random.org

O custom node utiliza o seguinte endpoint da API do Random.org:

\`\`\`
GET https://www.random.org/integers/?num=1&min={min}&max={max}&col=1&base=10&format=plain&rnd=new
\`\`\`

