'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginForm() {
  const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['google', 'discord']}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </div>
  );
}