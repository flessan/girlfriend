# girlfriend

A proactive AI companion for everyday conversations.

girlfriend is designed to make AI companionship feel like casual messaging: a companion can remember context, continue conversations, and reach out first when proactive messaging is enabled.

## Project status

The repository currently contains the Expo mobile foundation and a local conversation UI preview.

**The current preview does not call an AI provider.** Its sample replies are deterministic local responses. Authentication, provider APIs, persistent chat history, long-term memory, proactive scheduling, and push notifications are planned for later milestones.

## Getting started

Requirements:
- Node.js LTS
- npm
- Expo Go for a quick device preview, or an Android development build for native features as they are added

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

## Current foundation

- Expo SDK 58 and React Native
- Expo Router
- TypeScript
- Mobile-first conversation layout
- Keyboard-aware message composer
- Local message preview with a typing state
- Android, iOS, and web project targets

## Roadmap

1. Chat foundation and conversation experience
2. Companion personality and user-controlled memory
3. Provider adapters and secure server-side model access
4. Proactive messaging engine and scheduling
5. Push notifications and background delivery
6. Multi-platform polish

## Design reference

The chat interaction patterns were informed by [EvanBacon/chat-template](https://github.com/EvanBacon/chat-template). This project keeps its existing Expo SDK 58 foundation and implements its own UI components rather than importing that template's SDK 56 dependency set.

## License

MIT. See [LICENSE](LICENSE).
