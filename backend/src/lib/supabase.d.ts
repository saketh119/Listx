export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
/**
 * Creates a Supabase client with the user's access token.
 * This is required for RLS policies to work correctly in the backend.
 */
export declare const getSupabase: (token?: string) => import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
//# sourceMappingURL=supabase.d.ts.map