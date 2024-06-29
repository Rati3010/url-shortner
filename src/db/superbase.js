import { createClient } from '@supabase/supabase-js';

export const superbaseUrl = import.meta.env.VITE_SUPERBASE_URL;
const superbaseKey = import.meta.env.VITE_SUPERBASE_KEY;
const superbase = createClient(superbaseUrl, superbaseKey);

export default superbase;
