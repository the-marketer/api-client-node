---
id: claude-skill
title: Claude skill
sidebar_position: 21
---

# Claude skill

The repository ships a **Claude skill** that teaches AI assistants how to use
this Node client correctly. With it enabled, Claude (Code, Desktop, or web) can
generate accurate integration code, build valid payloads, and handle errors the
right way — usually without you having to paste the docs.

The skill lives in the repo at
[`skill/SKILL.md`](https://github.com/the-marketer/api-client-node/blob/main/skill/SKILL.md).

## What the skill teaches

- **TypeScript usage for every module** — `subscribers`, `orders`,
  `transactionals`, `products`, `campaigns`, `events`, `coupons`, `loyalty`,
  `reviews`, `mobilePush`, `reports`, plus the credential utilities on `Client`.
- **When to use the REST vs. tracking gateway** (e.g. most `events` methods and
  `serveJavascript` go through tracking and require `trackingKey`).
- **Payload specifications** — field names, types, required vs. optional, and
  allowed enum values (report types, campaign `type`/`mode`, loyalty `action`,
  push token `type`, feed `type`).
- **The calling convention** — which methods take a payload object and which take
  positional arguments.
- **Integrations** — the NestJS module (`@themarketer/api-client/nestjs`) and the
  Nodemailer transport (`@themarketer/api-client/nodemailer`).
- **Error handling** — `ValidationException`, `UnauthorizedException`,
  `CustomerNotFoundException`, `MethodNotAllowedException`, `ApiException`, and
  the HTTP-status → exception mapping.

## Platform support

The skill works across all three Claude environments:

1. **Claude Code** (CLI / IDE) — recommended
2. **Claude Desktop**
3. **Claude on the web**

## Installation

### Claude Code (manual)

Claude Code auto-loads any skill placed in its skills directories. Copy the
repo's `skill/` folder into one of them:

```bash
# Personal — available in every project
cp -r skill ~/.claude/skills/themarketer-api-client

# Project-specific — checked in with your repo
mkdir -p .claude/skills
cp -r skill .claude/skills/themarketer-api-client
```

Each target directory must contain the `SKILL.md` file. Reload skills (restart
Claude Code, or run `/reload`) and the skill becomes available.

### Claude Desktop / web

1. Package the `skill/` directory as a `.skill` file (a zip of the folder
   containing `SKILL.md`).
2. In Claude, open **Customize → Skills → Create skill**.
3. Upload the `.skill` file and **enable** it.
4. Make sure **code execution** is allowed in settings if the skill needs it.

## Activation

You typically **do not need to type a slash command** — Claude loads the skill
automatically when your question matches the topic (e.g. "add a subscriber with
the The Marketer client", "why am I getting a `ValidationException`?", "wire the
NestJS module"). You can also reference it explicitly by name.

## Keeping it up to date

The skill is plain Markdown maintained alongside the client in
[`skill/SKILL.md`](https://github.com/the-marketer/api-client-node/blob/main/skill/SKILL.md).
When the client's methods, payloads, or integrations change, update that file so
the skill stays accurate, then re-copy it into your skills directory.
