# POC: GitHub Actions

Projeto pequeno para apresentar, de forma prática, os principais recursos do GitHub Actions. A aplicação Node.js não depende de serviços externos e cada workflow pode ser demonstrado de forma independente.

## Funcionalidades demonstradas

| Workflow | Como iniciar | O que demonstra |
| --- | --- | --- |
| [CI](.github/workflows/ci.yml) | Push para `main`, Pull Request ou execução manual | Triggers, permissões mínimas, concorrência, matriz Node.js, dependências entre jobs, workflow reutilizável e transferência de artefatos |
| [Testes reutilizáveis](.github/workflows/reusable-tests.yml) | Chamado pela CI com `workflow_call` | Reutilização de workflow com parâmetros e cache npm |
| [Execução manual](.github/workflows/manual-demo.yml) | Aba **Actions** → **Demo - execução manual** → **Run workflow** | Inputs tipados, condicionais, outputs entre jobs e resumo da execução; não realiza deploy |
| [Release](.github/workflows/release.yml) | Publicar uma tag como `v1.0.0` | Trigger por tag, empacotamento e criação de GitHub Release com `GITHUB_TOKEN` |
| [Gemini CLI](.github/workflows/gemini.yml) | Abrir/atualizar um PR interno ou comentar `@gemini-cli ...` | Revisão de PR, análise de código e assistência automatizada usando a ação oficial do Google |

## Rodar localmente

Requer Node.js 20 ou 22 e npm.

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
npm.cmd run build
node dist\index.js
```

O build gera `dist\index.js` e `dist\manifest.json`. O diretório `dist` é ignorado pelo Git, pois é produzido pelo workflow.

## Apresentação ao time

1. Crie um repositório no GitHub e envie estes arquivos para a branch `main`.
2. Abra **Actions** e mostre a execução da CI. O job de testes roda em Node.js 20 e 22; depois o build publica um artefato, que um job separado baixa e executa.
3. Abra **Demo - execução manual**, escolha um ambiente e habilite ou não os detalhes. O workflow apenas prepara um plano e registra um resumo; nenhum ambiente é alterado.
4. Para demonstrar releases, crie e envie uma tag:

   ```powershell
   git tag v1.0.0
   git push origin v1.0.0
   ```

   A execução testa o projeto, gera um ZIP e o anexa a uma nova GitHub Release.

5. Para demonstrar o Gemini CLI:
   - Crie uma chave no [Google AI Studio](https://aistudio.google.com/apikey).
   - Cadastre-a no GitHub como secret `GEMINI_API_KEY`, em **Settings > Secrets and variables > Actions**.
   - Abra ou atualize um Pull Request no mesmo repositório para iniciar a revisão.
   - Como owner, member ou collaborator, comente em um issue ou Pull Request: `@gemini-cli explique a função createGreeting`.
   - A automação responde no comentário. As ferramentas estão limitadas a leitura e comentários; ela não altera arquivos nem cria commits.

## Notas de segurança

- Os workflows usam `contents: read` por padrão; somente o workflow de release recebe `contents: write`.
- Os workflows originais não exigem secrets; a integração Gemini requer `GEMINI_API_KEY`. O workflow manual de demonstração não realiza deploy.
- A release só é iniciada por tags no formato `v*.*.*`.
- O Gemini exige o secret `GEMINI_API_KEY`; sem ele, os jobs de IA falham com uma mensagem explícita. A revisão automática só roda em PRs do mesmo repositório e de autores associados como owner, member ou collaborator; PRs de forks não são processados automaticamente.
- O workflow do Gemini restringe as ferramentas do CLI a operações de leitura e comentários, e limita o token do GitHub às permissões necessárias. Mesmo assim, o código e o texto enviados ao Gemini são processados pelo Google: confirme a política da organização antes de usar código confidencial.
- O nível gratuito do Gemini API oferece acesso limitado a alguns modelos, com cotas que variam por modelo e projeto e podem mudar. Consulte os limites ativos no [Google AI Studio](https://aistudio.google.com/rate-limit?timeRange=last-28-days). No nível gratuito, o Google informa que o conteúdo pode ser usado para melhorar seus produtos; confira os [termos atuais](https://ai.google.dev/gemini-api/terms).
- As respostas da IA são sugestões e precisam de revisão humana. A POC não mescla Pull Requests.
