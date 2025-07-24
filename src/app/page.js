'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function Home() {
  const [session, setSession] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // This listener will update the session state when the user logs in or out
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    // Initial check for a session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // If there is no session, show the login form
  if (!session) {
    return (
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google', 'discord']}
        />
      </div>
    );
  }

  // If there IS a session, show the welcome message and sign-out button
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto', color: 'white' }}>
      <h2>Welcome, {session.user.email}</h2>
      <p>You are now logged in! (Client-side)</p>
      <button onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}