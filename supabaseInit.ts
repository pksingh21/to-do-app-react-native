import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env["EXPO_PUBLIC_supabaseUrl"]!!;
export const SUPABASE_KEY = process.env["EXPO_PUBLIC_supabaseKey"]!!;
console.log(SUPABASE_KEY,SUPABASE_URL)
// Better put your these secret keys in .env file
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  
});
