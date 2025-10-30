# Collaborative Editor

A real-time collaborative text editor built with modern web technologies. Multiple users can edit documents simultaneously with live cursor tracking, presence awareness, and persistent storage.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

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

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **PostgreSQL** >= 14.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ellothil/collaborative-editor.git
   cd collaborative-editor
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up PostgreSQL database**

   ```bash
   # Create a new database
   createdb collaborative_editor
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=3000
   HOCUSPOCUS_PORT=1234
   CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=collaborative_editor
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

   Create a `.env` file in the `client` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   VITE_HOCUSPOCUS_URL=http://localhost:1234
   ```

5. **Start the development servers**

   ```bash
   # Start both client and server concurrently
   pnpm dev
   ```

   Or start them individually:

   ```bash
   # Terminal 1 - Start server
   cd server
   pnpm dev

   # Terminal 2 - Start client
   cd client
   pnpm dev
   ```

6. **Open the application**

   Navigate to `http://localhost:5173` in your browser

## 📦 Project Structure

```text
collaborative-editor/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── config/        # Configuration files
│   │   └── types/         # TypeScript type definitions
│   └── package.json
├── server/                # NestJS backend application
│   ├── src/
│   │   ├── documents/     # Document management module
│   │   ├── hocuspocus/    # Hocuspocus server module
│   │   └── main.ts        # Application entry point
│   └── package.json
├── package.json           # Root package.json (workspace)
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── README.md
```

## 🛠️ Development

### Available Scripts

**Root level:**

- `pnpm dev` - Start both client and server in development mode
- `pnpm build` - Build both client and server for production
- `pnpm pre-commit` - Run linting and formatting checks

**Client:**

- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build for production

**Server:**

- `pnpm dev` - Start NestJS in watch mode
- `pnpm build` - Build for production
- `pnpm start:prod` - Start production server

### Code Quality

This project uses:

- **Biome** - Fast linter and formatter
- **Ultracite** - Additional code quality checks
- **Husky** - Git hooks for pre-commit checks

## 🔧 Configuration

### Database Schema

The application automatically creates the required database schema on startup:

```sql
CREATE TABLE documents (
  name VARCHAR(255) PRIMARY KEY,
  data BYTEA,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### CORS Configuration

Update `CORS_ORIGINS` in the server `.env` file to allow requests from your client domain:

```env
CORS_ORIGINS=https://client-domain.com
```

## 🌐 Deployment

### Client Deployment

The client can be deployed to any static hosting service (Vercel, Netlify, etc.):

```bash
cd client
pnpm build
# Deploy the 'dist' folder
```

### Server Deployment

The server requires a Node.js environment and PostgreSQL database:

```bash
cd server
pnpm build
pnpm start:prod
```

Make sure to set the appropriate environment variables for production.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - Headless editor framework
- [Hocuspocus](https://tiptap.dev/hocuspocus) - WebSocket backend for collaborative editing
- [Yjs](https://yjs.dev/) - CRDT framework for building collaborative applications
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [React](https://react.dev/) - UI library
- [Lucide Icons](https://lucide.dev/) - Icon library
