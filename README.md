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
