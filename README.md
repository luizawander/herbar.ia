# Herbar.ia

Aplicativo mobile assistente de cuidado de plantas e identificação de espécies via câmera, com guia de cuidados (rega, luz, substrato, toxicidade para pets) e lembretes de manutenção.

## Stack

- **Backend:** NestJS (TypeScript) — API REST, proxy de IA (Gemini Structured Output), cache de espécies e agendador de notificações.
- **Infraestrutura Local:** PostgreSQL + Redis via Docker Compose.
- **Mobile:** React Native com Expo (TypeScript) — executado via Expo Go na mesma rede Wi-Fi.

## Estrutura Planejada

```text
herbaria/
├── backend/             # API NestJS
├── mobile/              # App React Native (Expo)
├── docker-compose.yml   # PostgreSQL e Redis para dev local
└── README.md
```

## Convenções de Desenvolvimento Local

- **Banco & Cache:** PostgreSQL e Redis rodam via Docker Compose.
- **Backend:** Roda fora do Docker em `0.0.0.0:3000` para aceitar conexões do celular físico na rede local.
- **Armazenamento de imagens:** Object storage (S3/R2/Supabase ou storage local em dev), nunca como blob no banco.

