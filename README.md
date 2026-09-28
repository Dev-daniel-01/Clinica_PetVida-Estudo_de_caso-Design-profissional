# PetVida Agenda 🐾

Protótipo funcional (landing page + demo interativa) desenvolvido para o **Estudo de Caso 5 — Clínica PetVida & Estética Animal**, da disciplina **Design Profissional** (Prof. Sedenilso Antonio Machado).

**🔗 Demo ao vivo:** https://dev-daniel-01.github.io/Clinica_PetVida-Estudo_de_caso-Design-profissional/

---

## 1. Briefing do problema

A PetVida é uma clínica veterinária e centro de estética pet fundada pelo Dr. Gabriel Santos e pela Dra. Camila Paes, com mais 2 veterinários plantonistas, 3 tosadores e 2 recepcionistas. Todo o agendamento (consultas, vacinação, cirurgias de pequeno porte, banho e tosa) é feito por telefone em uma agenda de papel.

Com mais de 30 banhos diários e consultas sobrepostas, isso gera três dores recorrentes:

1. **Choques de horário** — a agenda de papel não faz checagem cruzada entre os profissionais.
2. **Vacinas e retornos esquecidos** — sem lembrete automático, tutores esquecem a data, criando lacunas na agenda que não são preenchidas a tempo.
3. **Prontuário em arquivo morto** — a recepção perde minutos valiosos procurando o histórico médico do pet em pastas físicas.

A oportunidade de negócio é integrar o cuidado estético ao histórico de saúde do animal, mantendo o diferencial de confiança médica da PetVida frente aos pet shops de rede da região.

## 2. Decisão de design e justificativa

Optei por construir uma **landing page vitrine do produto "PetVida Agenda"** (estilo SaaS), em vez de um sistema completo ou um app mobile, pelos seguintes motivos:

- **Escopo realista para o prazo da atividade**: uma vitrine com demo funcional prova o conceito e a experiência de uso sem exigir infraestrutura de backend, autenticação ou banco de dados — que não seriam avaliados de qualquer forma nesta entrega individual.
- **Zero credenciais para gerenciar**: por decisão de arquitetura, o projeto não tem backend. Todos os dados são mock e persistem apenas em `localStorage` no navegador. Isso elimina por completo o risco do critério "Segurança de Credenciais" da atividade.
- **Publicação simples no GitHub Pages**: um app estático gerado pelo Vite publica facilmente via GitHub Actions, sem depender de servidor.
- **Resolve as 3 dores de verdade, não só ilustra**: cada dor do caso tem uma funcionalidade genuinamente operante na demo (não é uma imagem estática) — ver tabela abaixo.

A seção [Arquitetura](#6-arquitetura) deste README documenta a única peça que não dá para resolver sem backend (sincronização em tempo real entre os funcionários da clínica) e o que mudaria para isso virar um sistema real em produção.

## 3. Cobertura das dores do cliente

| Dor do cliente | Funcionalidade no protótipo | Real ou ilustrativo? |
|---|---|---|
| Choques de horário | Formulário de agendamento roda checagem de conflito por profissional/horário e **recusa** o agendamento se colidir | ✅ Real — lógica funcional, testável |
| Tutor esquece vacina/banho | Botão **"Adicionar lembrete ao calendário"** gera um arquivo `.ics` de verdade; o tutor importa no Google Agenda/Apple Calendar/celular e recebe o lembrete pelo próprio telefone | ✅ Real — gera arquivo `.ics` de verdade, sem backend |
| Prontuário em arquivo morto | Seção **Prontuário** com busca por pet ou tutor, mostrando histórico completo (vacina + consultas + banho/tosa) puxado dos agendamentos reais da demo | ✅ Real — busca funcional sobre os dados da demo |
| Sincronização entre os funcionários da clínica (recepção, veterinários, tosadores em dispositivos diferentes) | — | ⚠️ Não resolvido nesta demo — depende de um backend com banco compartilhado (ver [Arquitetura](#6-arquitetura)) |

## 4. Funcionalidades do protótipo

| Seção | O que mostra |
|---|---|
| **Hero** | Resumo da dor e da proposta de valor |
| **O problema** | As 3 dores do cliente, com números do caso |
| **Solução** | As 4 funcionalidades centrais da proposta |
| **Demo interativa** | Agenda por profissional (7 profissionais), formulário de agendamento com **checagem automática de conflito de horário**, lembrete `.ics` real por agendamento, painel de **lembretes automáticos de vacina** com download de lembrete real |
| **Prontuário** | Busca real por pet/tutor, com histórico completo puxado dos agendamentos da demo |
| **Telas do protótipo** | Mockups ilustrativos de uma versão de produção: dashboard de ocupação e notificação mobile nativa |
| **Arquitetura** | Stack atual da demo vs. roadmap de produção |

### Como testar a checagem de conflito

1. Acesse a seção **Demo interativa** no site.
2. Escolha um profissional que já tenha um agendamento no dia (ex: *Dr. Gabriel Santos às 09:00*).
3. Tente agendar outro atendimento para ele no mesmo horário.
4. O sistema recusa o agendamento e explica o conflito, em vez de simplesmente sobrepor os horários como acontece hoje na agenda de papel da PetVida.

### Como testar o lembrete real (.ics)

1. Na seção **Demo interativa**, clique no ícone 📅 de qualquer agendamento, ou na seção **Lembretes automáticos** clique em "Adicionar lembrete ao calendário" para um pet com vacina próxima.
2. Um arquivo `.ics` é baixado pelo navegador.
3. Abra o arquivo — ele importa direto no Google Agenda, Apple Calendar ou Outlook, com um alarme configurado para o dia anterior.

### Como testar a busca de prontuário

1. Agende um novo atendimento na seção **Demo interativa**.
2. Vá até a seção **Prontuário** e busque pelo nome do pet ou do tutor.
3. O atendimento recém-criado aparece no histórico — prova de que a busca lê os dados reais da demo, não uma lista fixa.

## 5. Stack técnica

- **React 18 + TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS** (estilização)
- **localStorage** (persistência client-side dos dados da demo)
- **GitHub Actions → GitHub Pages** (build e deploy automático a cada push em `main`)

Nenhuma chave de API, variável de ambiente sensível ou banco de dados externo é utilizado neste projeto.

## 6. Arquitetura

```
Navegador do usuário
 ├─ React (UI) ── componentes em src/components
 ├─ Estado local (useState) + hook useLocalStorage
 └─ localStorage do navegador (dados mock: pets, profissionais, agendamentos)

Build & Deploy
 GitHub (push em main) → GitHub Actions (npm ci && npm run build) → GitHub Pages (dist/)
```

Como este é um protótipo de portfólio, não há servidor, banco de dados ou serviço externo. A seção **Arquitetura** do próprio site (`#arquitetura`) detalha o roadmap para uma versão de produção: banco compartilhado (ex. Supabase/Postgres) para sincronizar recepção e profissionais em tempo real, autenticação por usuário, e integração com uma API de mensageria (WhatsApp/e-mail) para lembretes automáticos de verdade — sempre com credenciais protegidas via variáveis de ambiente, nunca versionadas no repositório.

## 7. Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/Dev-daniel-01/Clinica_PetVida-Estudo_de_caso-Design-profissional.git
cd Clinica_PetVida-Estudo_de_caso-Design-profissional

# Instalar dependências
npm install

# Rodar em modo desenvolvimento (http://localhost:5173)
npm run dev

# Gerar build de produção em dist/
npm run build

# Pré-visualizar o build de produção localmente
npm run preview
```

## 8. Deploy

O deploy é automático: qualquer push na branch `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que builda o projeto com Vite e publica o conteúdo de `dist/` no GitHub Pages.

## 9. Estrutura do projeto

```
├─ .github/workflows/deploy.yml   # CI/CD para GitHub Pages
├─ public/                        # assets estáticos (favicon)
├─ src/
│  ├─ components/                 # seções da landing page
│  ├─ data/mockData.ts            # pets, profissionais e agendamentos fictícios
│  ├─ hooks/useLocalStorage.ts    # persistência client-side
│  ├─ types.ts                    # tipos TypeScript do domínio
│  ├─ utils.ts                    # checagem de conflito, formatação de datas
│  ├─ ics.ts                      # geração do arquivo .ics (lembrete real de calendário)
│  ├─ App.tsx
│  └─ main.tsx
├─ LICENSE
└─ README.md
```

## 10. Licença

Distribuído sob a licença MIT — veja [LICENSE](LICENSE) para mais detalhes.

## 11. Autor

Desenvolvido individualmente por **Daniel** ([@Dev-daniel-01](https://github.com/Dev-daniel-01)) para a disciplina de Design Profissional.
