// Supabase Server Client
// Used in RSC (React Server Components) for data fetching
// Phase 2: Uncomment and configure

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
// import type { Database } from '@/types/database'

// export function createClient() {
//   const cookieStore = cookies()
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//       },
//     }
//   )
// }

export { };
