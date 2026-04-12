# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

### Mac Mini
- **Owner:** Scott and Jack (shared)
- **Location:** St. Albert house (Scott's home office)
- **This is the machine Kate runs on**
- **Pending setup:** gog auth (Gmail/Calendar), Telegram app install

### AgentMail

- **Inbox**: goliasphoenix@agentmail.to (display name: Golias)
- **API Key**: stored in workspace `.env` as `AGENTMAIL_API_KEY`
- **SDK**: agentmail Python package (`pip3 install agentmail --break-system-packages`)
- **Skill**: agentmail (installed at `/opt/homebrew/lib/node_modules/openclaw/skills/agentmail`)
- Load key with: `from dotenv import load_dotenv; load_dotenv('~/.openclaw/workspace/.env')`

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
