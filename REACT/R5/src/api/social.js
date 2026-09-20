import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const social = url && key ? createClient(url, key, {
  auth: { flowType: 'pkce', detectSessionInUrl: false, persistSession: true },
}) : null;

// Una sola promesa evita consumir dos veces el código en React StrictMode.
let callback;
export function completarIngresoSocial(api) {
  if (callback) return callback;
  callback = (async () => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const code = params.get('code');
    if (!error && !code) return null;
    window.history.replaceState({}, '', window.location.pathname);
    if (error) throw new Error('El ingreso fue cancelado o rechazado. Podés intentarlo nuevamente.');
    if (!social) throw new Error('Falta configurar Supabase en el frontend.');
    const { data, error: authError } = await social.auth.exchangeCodeForSession(code);
    if (authError) throw new Error('No se pudo completar el ingreso. Volvé a intentarlo desde este navegador.');
    try {
      const { data: session } = await api.post('/auth/social', { accessToken: data.session.access_token });
      return session;
    } catch (err) {
      if (err.response?.data?.requiereVinculacion) err.tokenParaVincular = data.session.access_token;
      throw err;
    } finally {
      // La biblioteca usa su propio JWT, no necesita guardar la sesión externa.
      await social.auth.signOut({ scope: 'local' });
    }
  })();
  return callback;
}
export async function iniciarIngresoSocial(provider) {
  if (!social) throw new Error('Falta configurar el ingreso social. Consultá la guía INGRESO-SOCIAL.md.');
  if (!['google', 'github', 'discord'].includes(provider)) throw new Error('Proveedor no permitido.');
  const { error } = await social.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin + '/', scopes: provider === 'github' ? 'user:email' : undefined },
  });
  if (error) throw error;
}
