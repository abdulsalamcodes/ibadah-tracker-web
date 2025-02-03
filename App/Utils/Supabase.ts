import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// const EXPO_PUBLIC_SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
// const EXPO_PUBLIC_SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const EXPO_PUBLIC_SUPABASE_URL = "https://xlybkpntzqvqtvzdpcnf.supabase.co";

const EXPO_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhseWJrcG50enF2cXR2emRwY25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MjQxMTEsImV4cCI6MjA1MzIwMDExMX0.WPb4Kw_B0V9lH5K7Y3LeuEs4NQCn2lEszAYdN87gPH0";
export const supabase = createClient(
  EXPO_PUBLIC_SUPABASE_URL || "",
  EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
