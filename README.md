# POC: GitHub Actions

Projeto pequeno para apresentar, de forma prática, os principais recursos do GitHub Actions. A aplicação Node.js não depende de serviços externos e cada workflow pode ser demonstrado de forma independente.

## Funcionalidades demonstradas

| Workflow | Como iniciar | O que demonstra |
| --- | --- | --- |
| [CI](.github/workflows/ci.yml) | Push para `main`, Pull Request ou execução manual | Triggers, permissões mínimas, concorrência, matriz Node.js, dependências entre jobs, workflow reutilizável e transferência de artefatos |
| [Testes reutilizáveis](.github/workflows/reusable-tests.yml) | Chamado pela CI com `workflow_call` | Reutilização de workflow com parâmetros e cache npm |
| [Execução manual](.github/workflows/manual-demo.yml) | Aba **Actions** → **Demo - execução manual** → **Run workflow** | Inputs tipados, condicionais, outputs entre jobs e resumo da execução; não realiza deploy |
| [Release](.github/workflows/release.yml) | Publicar uma tag como `v1.0.0` | Trigger por tag, empacotamento e criação de GitHub Release com `GITHUB_TOKEN` |
| [Groq](.github/workflows/groq.yml) | Abrir/atualizar um PR interno ou comentar `@groq ...` | Revisão de PR e assistência automatizada usando a API compatível com OpenAI da Groq |

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

5. Para demonstrar a integração Groq:
   - Crie uma chave de API na [GroqCloud](https://console.groq.com/keys).
   - Cadastre-a no GitHub como secret `GROQ_API_KEY`, em **Settings > Secrets and variables > Actions**.
   - Abra ou atualize um Pull Request no mesmo repositório para iniciar a revisão.
   - Como owner, member ou collaborator, comente em um issue ou Pull Request: `@groq explique a função createGreeting`.
   - A automação responde no comentário. Ela só lê dados do GitHub e publica comentários de revisão/resposta; não altera arquivos nem cria commits.

## Notas de segurança

- Os workflows usam `contents: read` por padrão; somente o workflow de release recebe `contents: write`.
- Os workflows originais não exigem secrets; a integração Groq requer `GROQ_API_KEY`. O workflow manual de demonstração não realiza deploy.
- A release só é iniciada por tags no formato `v*.*.*`.
- A integração Groq exige o secret `GROQ_API_KEY`; sem ele, os jobs de IA falham com uma mensagem explícita. A revisão automática só roda em PRs do mesmo repositório e de autores associados como owner, member ou collaborator; PRs de forks não são processados automaticamente.
- O workflow da Groq limita o token do GitHub às permissões de leitura e comentários; a API não recebe permissão para alterar o repositório. O diff, o contexto dos arquivos selecionados e os comentários enviados são processados pela API Groq. Consulte os [termos e a política de privacidade da Groq](https://groq.com/privacy-policy/) e confirme a política da organização antes de enviar código confidencial.
- As respostas da IA são sugestões e precisam de revisão humana. A POC não mescla Pull Requests.
