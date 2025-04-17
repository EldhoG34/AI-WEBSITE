# AI Tools Directory

A modern directory of AI tools with advanced search, user reviews, and monetization features.

## Tech Stack

- Frontend: Next.js with TypeScript
- Styling: Tailwind CSS
- Database: Supabase
- Deployment: Vercel
- SEO: Next.js built-in features

## Features

- Advanced search and filtering
- User reviews and ratings
- Tool submissions
- Newsletter integration
- Dark/Light mode
- SEO optimization
- Monetization through ads and affiliate links

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── tools/
│   │   ├── [category]/
│   │   └── [id]/
│   ├── api/
│   ├── blog/
│   └── layout.tsx
├── components/
│   ├── common/
│   ├── layout/
│   └── tools/
├── lib/
│   ├── supabase/
│   ├── utils/
│   └── constants/
├── types/
├── public/
└── styles/
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id
```

## Database Schema

### Tools Table
```sql
create table tools (
  id uuid default uuid_generate_v4() primary key,
  name varchar not null,
  slug varchar unique not null,
  description text not null,
  category varchar not null,
  pricing_type varchar not null,
  features jsonb,
  website_url varchar not null,
  logo_url varchar,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Reviews Table
```sql
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  tool_id uuid references tools(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Categories Table
```sql
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name varchar not null,
  slug varchar unique not null,
  description text,
  icon varchar
);
```

## API Endpoints

### Tools
- `GET /api/tools` - List all tools
- `GET /api/tools/[id]` - Get tool details
- `GET /api/tools/category/[category]` - List tools by category
- `POST /api/tools` - Submit new tool
- `PUT /api/tools/[id]` - Update tool
- `DELETE /api/tools/[id]` - Delete tool

### Reviews
- `GET /api/reviews/tool/[id]` - Get reviews for tool
- `POST /api/reviews` - Submit review
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

### Users
- `GET /api/user/favorites` - Get user favorites
- `POST /api/user/favorites` - Add to favorites
- `DELETE /api/user/favorites/[id]` - Remove from favorites

## License

MIT 