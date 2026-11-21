---
name: commits-logicos
description: Divide qualquer implementação, setup, feature ou refatoração em etapas pequenas e atômicas correspondentes a commits lógicos (Conventional Commits), executando apenas uma etapa por vez e aguardando revisão e confirmação do usuário antes de avançar.
---

# Fluxo de Implementação por Commits Lógicos

Sempre que o usuário solicitar setup de projeto, novas funcionalidades, integrações ou refatorações que envolvam múltiplas responsabilidades ou arquivos, siga rigorosamente este fluxo. **Nunca implemente tudo de uma só vez.**

## 1. Planejamento prévio
Antes de criar ou editar código em uma nova demanda:
1. Divida a tarefa em um roadmap numerado de **commits lógicos e independentes**.
2. Garanta que cada etapa tenha **uma única responsabilidade** (ex.: infraestrutura/Docker separado do esqueleto do backend; migrations separadas de regras de negócio; setup inicial do app separado da criação de telas).
3. Mostre o plano completo de etapas de forma enxuta e execute **apenas a Etapa 1** (ou aguarde confirmação do plano se houver ambiguidade na arquitetura).

## 2. Execução estritamente incremental
- Crie e modifique **somente** os arquivos pertencentes à etapa atual.
- **Não antecipe** código, pastas ou dependências de etapas futuras.
- **Não misture** formatação geral, refatorações paralelas ou ajustes fora do escopo da etapa.
- Sempre que possível, deixe o projeto em estado executável ou validável ao final da etapa.

## 3. Checkpoint obrigatório ao concluir a etapa
Assim que terminar a etapa atual, **PARE imediatamente** e apresente:
1. **Resumo da entrega:** O que foi implementado (objetivo e direto).
2. **Arquivos afetados:** Lista dos arquivos criados ou alterados.
3. **Como testar/validar:** Comandos ou passos rápidos para confirmar que a etapa funciona antes do commit.
4. **Sugestão de commit (Conventional Commits):**
   - Use prefixos padronizados (`chore`, `feat`, `fix`, `refactor`, `docs`, `test`, `ci`, `style`).
   - Sugira a mensagem pronta, ex.:
     `chore(infra): adicionar docker-compose com postgresql e redis`

## 4. Aprovação antes de continuar
- **Nunca faça `git commit` automaticamente**, a menos que o usuário peça de forma explícita.
- **Nunca avance para a próxima etapa por conta própria.**
- Aguarde o usuário revisar, commitar e sinalizar que pode seguir (ex.: *"commitado"*, *"pode ir para a etapa 2"*, *"próximo"*) ou pedir ajustes na etapa atual.