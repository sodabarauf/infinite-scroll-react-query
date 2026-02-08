Infinite Pages Project

A Next.js project demonstrating infinite scrolling using React Query, with responsive design using Tailwind CSS.
This project fetches pages from an API and displays them in a grid with smooth loading and error handling.

🛠️ Tech Stack

Next.js 14+ – React framework for server-side rendering and routing

React Query (@tanstack/react-query) – Data fetching & caching

Tailwind CSS – Utility-first styling

TypeScript – Type safety

IntersectionObserver API – Infinite scroll functionality

🚀 Feature

Infinite scrolling of pages with automatic loading

📂 Project Structure
/components
  └── PageCard.tsx        # Individual page card
  └── InfinitePages.tsx   # Infinite scrolling grid
/lib
  └── fetchPages.ts       # API fetch function
/pages
  └── index.tsx           # Main page using InfinitePages

⚡ Installation

Clone the repository:

git clone https://github.com/usename/infinite-scroll-react-query.git
cd infinite-scroll-react-query


Install dependencies:

npm install
# or
yarn install


Set up environment variables (if your API requires them):

NEXT_PUBLIC_API_URL=https://api.example.com


Run the development server:

npm run dev
# or
yarn dev


Open http://localhost:3000
 to see it in action.

📈 Usage

Scroll down to load more pages automatically

Error messages will display if API fetch fails

If there are no pages, a friendly message will appear
