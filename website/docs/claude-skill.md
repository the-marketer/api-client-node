---
title: Claude Skill (Node.js - AI assistant)
---

The official **Claude skill** for the Node.js package — `@the-marketer/api-client` — teaches Claude how to use this package correctly: module APIs, payload shapes, REST vs tracking gateways, NestJS and Nodemailer wiring, and exception handling. It reduces guesswork when you integrate or debug in Claude **Code**, **Claude Desktop**, or **Claude** on the web.

Maintained in GitHub: [the-marketer/claude-docs-skill](https://github.com/the-marketer/claude-docs-skill).

:::tip Using PHP instead of Node.js?
This page covers the **Node.js** skill. If you work with the PHP package, there is a separate skill — `themarketer/api-client-php` — published in the **same repository** ([the-marketer/claude-docs-skill](https://github.com/the-marketer/claude-docs-skill)). Install that one instead for PHP projects.
:::

## What the skill helps with

- Correct Node.js / TypeScript for all client modules (`orders()`, `subscribers()`, `campaigns()`, `products()`, `transactionals()`, `reports()`, `events()`, `coupons()`, `loyalty()`, `reviews()`, `mobilePush()`, and related utilities).
- Choosing the **REST gateway** vs **tracking gateway** appropriately.
- Payload fields: names, types, required vs optional, and enums where applicable.
- NestJS: the `TheMarketerModule` global provider, and the `createTheMarketerTransport` Nodemailer transport.
- Catching errors with the right exception types in a sensible order.

When your question relates to this package, Claude can load the skill automatically so answers follow the same schemas and conventions as these docs.

## Releases

Packaged `.skill` files and install notes are published on **[GitHub Releases](https://github.com/the-marketer/claude-docs-skill/releases)**. Install using the **latest release** for up-to-date content; older tags remain available if you need to pin a version (for example [v0.1.0](https://github.com/the-marketer/claude-docs-skill/releases/tag/v0.1.0)).

## Install: Claude Code (recommended)

From a Claude Code session:

```text
/plugin marketplace add the-marketer/claude-docs-skill
/plugin install themarketer-api-client-node@themarketer-api-client
/reload-plugins
```

Confirm it appears when you ask what skills are available (`themarketer-api-client-node`). The skill may be addressed as `themarketer-api-client-node:themarketer-api-client-node` (plugin name + skill name); you typically do not need to type a slash command—Claude loads it when the topic matches.

## Install: Claude Desktop / Claude web

1. Download **`themarketer-api-client-node.skill`** from the [latest GitHub Release](https://github.com/the-marketer/claude-docs-skill/releases/latest).
2. In Claude: **Customize → Skills → + → Create skill**.
3. Upload the `.skill` file and enable it.
4. Ensure **code execution** is allowed where your account/org requires it (Settings → Capabilities, or org-level Skills settings for Team/Enterprise).

## Install: manual (clone skill folder)

**Personal (all projects):**

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/the-marketer/claude-docs-skill /tmp/tm-skill
cp -r /tmp/tm-skill/skills/themarketer-api-client-node ~/.claude/skills/
rm -rf /tmp/tm-skill
```

**Single project:**

```bash
cd /path/to/your/project
mkdir -p .claude/skills
git clone https://github.com/the-marketer/claude-docs-skill /tmp/tm-skill
cp -r /tmp/tm-skill/skills/themarketer-api-client-node .claude/skills/
rm -rf /tmp/tm-skill
```

You can also unzip a downloaded `.skill` archive into your skills directory.

## Example prompts

These illustrate the kinds of questions that trigger useful, schema-aware answers:

- “Help me sync an order with `@the-marketer/api-client` from Node.”
- “I'm getting a `ValidationException` on `viewProduct`—what's wrong?”
- “Set up the Nodemailer transport for The Marketer.”
- “Push 200 subscribers in bulk through The Marketer.”
- “What's the payload for `campaigns().create` with `type=email`?”

You do not always need to mention the package name explicitly; related wording about The Marketer APIs or NestJS integration often suffices.

## Contributing and versioning

The Node.js skill content lives under `skills/themarketer-api-client-node/` in the repository (the PHP skill lives alongside it under `skills/themarketer-api-client-php/`). The skill project follows SemVer; suggest improvements via pull requests on [the-marketer/claude-docs-skill](https://github.com/the-marketer/claude-docs-skill).
