# Collaborative Editor

A real-time collaborative text editor built with modern web technologies. Multiple users can edit documents simultaneously with live cursor tracking, presence awareness, and persistent storage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Getting Started
IMPORTANT: Because of a hardware problem, the demo server is currently not available. I am working to fix this as fast as possible.
- Open the linked website ([nils-reith.de](https://nils-reith.de/)) in two different browsers or tabs on one or multiple desktop devices.
  - IMPORTANT: Tested with Chrome on Windows, some AI-heavy Browsers like Arc or Comet might not work because of browser-side bugs.
- You can then start writing into the default document and collaborate in realtime with other users or create more documents (or delete them)
- You will see the live position of other users' cursors and their highlighted text

## Features

- **Real-time Collaboration** - Multiple users can edit the same document simultaneously
- **Live Presence** - See who's online with color-coded cursors
- **Document Management** - Create, switch between, and delete documents
- **Rich Text Editing** - Full-featured editor powered by TipTap with formatting options
- **Persistent Storage** - Documents are automatically saved to PostgreSQL database
- **Modern UI** - Clean interface built with React and TailwindCSS
- **WebSocket Communication** - Low-latency updates using Socket.IO and Hocuspocus

## Architecture

This is a monorepo project with two main components:

### Client (`/client`)

- **Framework**: React 19 with TypeScript
- **Editor**: TipTap (ProseMirror-based)
- **Styling**: TailwindCSS 4
- **Real-time**: Hocuspocus Provider + Socket.IO Client
- **CRDT**: Yjs for conflict-free collaborative editing
- **Build Tool**: Vite

### Server (`/server`)

- **Framework**: NestJS
- **WebSocket Server**: Hocuspocus (for document sync)
- **Real-time Events**: Socket.IO (for presence & document events)
- **Database**: PostgreSQL
- **Language**: TypeScript

### Code Quality

This project uses:

- **Biome** - Fast linter and formatter
- **Ultracite** - Additional code quality checks
- **Husky** - Git hooks for pre-commit checks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TipTap](https://tiptap.dev/) - Headless editor framework
- [Hocuspocus](https://tiptap.dev/hocuspocus) - WebSocket backend for collaborative editing
- [Yjs](https://yjs.dev/) - CRDT framework for building collaborative applications
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [React](https://react.dev/) - UI library
- [Lucide Icons](https://lucide.dev/) - Icon library
