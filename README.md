# 🎲 n8n Custom Random Node Project

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

\`\`\`bash
# Iniciar n8n + PostgreSQL
npm run dev
\`\`\`

### 5. Acessar o n8n

Abra seu navegador e acesse: http://localhost:5678

**Credenciais de acesso:**
- **Usuário**: admin
- **Senha**: password123

## 📁 Estrutura do Projeto

\`\`\`
n8n-custom-random-node-project/
├── 📄 docker-compose.yml          # Configuração Docker (n8n + PostgreSQL)
├── 📄 package.json                # Configurações e scripts do projeto
├── 📄 README.md                   # Este arquivo
├── 📂 custom-nodes/               # Pasta dos custom nodes
│   └── 📂 n8n-nodes-random/       # Nosso custom node
│       ├── 📄 package.json        # Configurações do node
│       ├── 📄 tsconfig.json       # Configuração TypeScript
│       ├── 📄 .eslintrc.js        # Configuração ESLint
│       └── 📂 nodes/              # Código dos nodes
│           └── 📂 Random/         # Node Random
│               ├── 📄 Random.node.ts   # Lógica principal
│               └── 🖼️ random.svg       # Ícone SVG
└── 📂 .n8n/                      # Pasta de configuração do n8n
    └── 📂 custom/                 # Custom nodes compilados (auto-gerada)
\`\`\`

## 🎯 Como Usar o Custom Node

1. **Acesse o n8n** em http://localhost:5678
2. **Crie um novo workflow**
3. **Adicione o node "Random"** (procure por "Random" na lista de nodes)
4. **Configure os parâmetros**:
   - **Operation**: True Random Number Generator (já selecionado)
   - **Minimum Value**: Valor mínimo desejado (ex: 1)
   - **Maximum Value**: Valor máximo desejado (ex: 100)
5. **Execute o workflow** para gerar um número aleatório

### 📊 Exemplo de Saída

\`\`\`json
{
  "randomNumber": 42,
  "min": 1,
  "max": 100,
  "source": "random.org",
  "timestamp": "2024-03-15T10:30:45.123Z"
}
\`\`\`

## 🔧 Scripts Disponíveis

\`\`\`bash
# 🏗️ Compilar e configurar custom node
npm run build

# 🚀 Iniciar ambiente de desenvolvimento
npm run dev

# 🛑 Parar containers
npm run stop

# 📋 Ver logs do n8n
npm run logs

# 🧹 Limpar containers e volumes
npm run clean
\`\`\`

## 🔍 Desenvolvimento e Debug

### Alterações no Custom Node

Após fazer alterações no código do custom node:

1. **Rebuild o node**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Reinicie o n8n**:
   \`\`\`bash
   npm run stop
   npm run dev
   \`\`\```

### Logs e Debugging

- **Ver logs do n8n**: \`npm run logs\`
- **Acessar container**: \`docker-compose exec n8n sh\`
- **Verificar custom nodes**: Pasta \`.n8n/custom\` no container

## 🌐 API do Random.org

O custom node utiliza o seguinte endpoint da API do Random.org:

\`\`\`
GET https://www.random.org/integers/?num=1&min={min}&max={max}&col=1&base=10&format=plain&rnd=new
\`\`\`

### Parâmetros:
- **num=1**: Gera 1 número
- **min={min}**: Valor mínimo (configurável)
- **max={max}**: Valor máximo (configurável)  
- **col=1**: Uma coluna de output
- **base=10**: Base decimal
- **format=plain**: Formato de texto simples
- **rnd=new**: Força nova geração

## ⚠️ Tratamento de Erros

O custom node inclui tratamento robusto de erros:

- ✅ **Validação de entrada**: Min não pode ser maior que Max
- ✅ **Erro de API**: Tratamento de falhas da Random.org
- ✅ **Timeout**: Timeout configurável para requisições
- ✅ **Parsing**: Validação da resposta da API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## 🆘 Resolução de Problemas

### Node não aparece na lista

1. Verifique se o build foi executado: \`npm run build\`
2. Confirme que os arquivos estão em \`.n8n/custom\`
3. Reinicie o n8n: \`npm run stop && npm run dev\`

### Erro na API do Random.org

- Verifique sua conexão com a internet
- Random.org pode ter rate limiting - aguarde alguns segundos
- Verifique os logs: \`npm run logs\`

### Problemas de permissão no Docker

\`\`\`bash
# Linux/Mac - ajustar permissões
sudo chown -R $USER:$USER .n8n/
\`\`\`

## 📞 Suporte

Para dúvidas e suporte:
- Abra uma issue no GitHub
- Consulte a [documentação oficial do n8n](https://docs.n8n.io/)
- Verifique o [fórum da comunidade n8n](https://community.n8n.io/)

---

**⭐ Desenvolvido com ❤️ para a comunidade n8n**