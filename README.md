# Moodflix

Moodflix is a mood-based movie recommendation app built with Next.js. It suggests movies based on the user's current mood and preferences, providing a personalized movie-watching experience.

![Moodflix Intro](public/images/intro.png)

## What This App Does

Moodflix allows users to:
1. Assess their current mood through a simple interface
2. Receive movie recommendations tailored to their mood
3. View detailed information about recommended movies
4. Toggle between light and dark themes for comfortable viewing

## Major Technologies Used

- [Next.js](https://nextjs.org/): React framework for building the web application
- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/): Re-usable components built with Radix UI and Tailwind CSS

## Project Structure

```
moodflix/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── moviedetails/
│   │   │   └── recommendations/
│   │   ├── fonts/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── intro.tsx
│   │   ├── mood-assessment.tsx
│   │   ├── mood-based-movie-app.tsx
│   │   ├── movie-card.tsx
│   │   ├── movie-list.tsx
│   │   └── theme-toggle.tsx
│   └── lib/
│       └── utils.ts
└── types/
    └── index.ts
```

## Main Components and Their Roles

1. `mood-based-movie-app.tsx`: The main component that orchestrates the app's functionality
2. `mood-assessment.tsx`: Handles the user's mood input
3. `movie-list.tsx`: Displays the list of recommended movies
4. `movie-card.tsx`: Renders individual movie information
5. `theme-toggle.tsx`: Allows users to switch between light and dark themes
6. `intro.tsx`: Provides an introduction to the app

API Routes:
- `recommendations/route.ts`: Handles movie recommendation requests
- `moviedetails/[id]/route.ts`: Fetches detailed information for a specific movie

## How to Build and Run the App

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/moodflix.git
   cd moodflix
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - learn about React.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about the components used in this project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
