# Project Manager

A modern, scalable project management application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- Three-level hierarchy:
  - Projects (top-level containers)
  - Collections (groupings within projects)
  - Tasks (individual work items)
- Task Management:
  - Create, edit, and delete tasks
  - Set priorities and due dates
  - Track status (TODO, IN_PROGRESS, DONE)
  - Add descriptions and metadata
- Project Organization:
  - Create and manage projects
  - Organize tasks into collections
  - Flexible task views and filtering

### Technical Features
- Modern React with Next.js 14 App Router
- Type-safe development with TypeScript
- Beautiful UI with Tailwind CSS and shadcn/ui
- SQLite database with Prisma ORM
- State management with Zustand
- Form handling with react-hook-form and zod validation

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Create a .env file with your database URL
echo "DATABASE_URL=\"file:./dev.db\"" > .env

# Run database migrations
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
src/
├── app/              # Next.js app router pages and API routes
├── components/       # React components
│   ├── features/    # Feature-specific components
│   ├── ui/          # Reusable UI components
│   └── dialogs/     # Modal dialogs and popups
├── lib/             # Utility functions and configurations
├── models/          # Data models and types
├── services/        # API service layers
└── stores/          # Zustand state management
```

## Database Schema

The application uses a SQLite database with the following models:

- **Project**: Top-level container for collections
- **Collection**: Groups of tasks within a project
- **Task**: Individual work items with properties like status, priority, and due date

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Zustand](https://github.com/pmndrs/zustand)
