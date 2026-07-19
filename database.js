import { createClient } from "@supabase/supabase-js";

const SUPABASEKEY = import.meta.env.VITE_SUPABASE_KEY;
const SUPABASEURL = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);