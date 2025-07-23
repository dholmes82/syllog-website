import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  // If no user is found, redirect them to the login page.
  if (!user) {
    redirect('/');
  }

  // If a user is found, show their welcome message and a sign-out button.
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto', color: 'white' }}>
      <h2>Welcome, {user.email}</h2>
      <p>You have successfully reached the protected account page!</p>
      <form action="/auth/sign-out" method="post">
        <button type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}