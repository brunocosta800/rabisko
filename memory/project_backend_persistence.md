---
name: project-backend-persistence
description: Backend Rabisko migrou de MongoDB Atlas para Postgres/Supabase via Spring Data JPA — o CLAUDE.md ainda menciona Mongo
metadata:
  type: project
---

O backend Spring Boot do Rabisko **não usa mais MongoDB**. O `backend/pom.xml` foi migrado para `spring-boot-starter-data-jpa` + driver `org.postgresql:postgresql` (runtime), apontando para Postgres gerenciado no Supabase. Os comentários no próprio pom.xml documentam a migração.

**Why:** O `CLAUDE.md` na raiz do repo ainda descreve o stack como "MongoDB Atlas" e cita repositórios `Spring Data Mongo` em `repositories/` — isso está defasado em relação ao código real. Confiar no CLAUDE.md pode levar a sugerir entidades `@Document`, queries Mongo, ou dependências `mongodb-driver-sync` que já foram removidas.

**How to apply:** Ao desenhar novas entidades/repos no backend (ex.: chat — `Conversation`, `Message`), usar `@Entity` JPA + `JpaRepository`, não `@Document` + `MongoRepository`. Para testes, o pom sugere H2 (`test` scope) ou Testcontainers Postgres — não `spring-boot-starter-data-mongodb-test`. Quando tocar no CLAUDE.md por outro motivo, vale corrigir a seção do backend.

Relacionado: [[project-chat-realtime]] (próxima feature em construção).
