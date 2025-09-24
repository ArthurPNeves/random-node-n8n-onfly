# n8n-nodes-random

Um custom node para n8n que gera números verdadeiramente aleatórios usando a API do Random.org.

## Instalação

Este pacote faz parte do projeto principal. Para instalação e uso, consulte o [README principal](../../README.md).

## Funcionalidades

- **Operação**: True Random Number Generator
- **Inputs**: Minimum Value, Maximum Value
- **Output**: Número aleatório + metadados
- **API**: Random.org para números verdadeiramente aleatórios

## Desenvolvimento

### Build

\`\`\`bash
npm run build
\`\`\`

### Lint

\`\`\`bash
npm run lint
\`\`\`

### Watch mode

\`\`\`bash
npm run dev
\`\`\`

## Estrutura

- \`nodes/Random/Random.node.ts\` - Lógica principal do node
- \`nodes/Random/random.svg\` - Ícone do node