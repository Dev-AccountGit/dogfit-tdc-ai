import { supabase } from "@/integrations/supabase/client";

// Admin email constant
export const ADMIN_EMAIL = "kartywillytdc@gmail.com";

// Check if user is admin - uses direct query with RLS
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    // First try RPC function
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });

    if (!error && data === true) {
      return true;
    }

    // Fallback: direct query to user_roles (user can see their own role)
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleError && roleData) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Get user role
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data.role;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

// Get all users with profiles
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
};

// Get all subscriptions
export const getAllSubscriptions = async () => {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }

  return data || [];
};

// Update subscription
export const updateSubscription = async (subscriptionId: string, updates: {
  plan?: string;
  status?: string;
  expires_at?: string | null;
}) => {
  const { error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("id", subscriptionId);

  if (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

// Create subscription for user
export const createSubscription = async (userId: string, plan: string, expiresAt?: string) => {
  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
      plan,
      status: "active",
      expires_at: expiresAt || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }

  return data;
};

// Get app settings
export const getAppSettings = async () => {
  const { data, error } = await supabase
    .from("app_settings")
    .select("*")
    .order("key");

  if (error) {
    console.error("Error fetching app settings:", error);
    return [];
  }

  return data || [];
};

// Update app setting
export const updateAppSetting = async (key: string, value: string, description?: string) => {
  const { data: existing } = await supabase
    .from("app_settings")
    .select("id")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("app_settings")
      .update({ value, description })
      .eq("key", key);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("app_settings")
      .insert({ key, value, description });

    if (error) throw error;
  }
};

// Delete app setting
export const deleteAppSetting = async (key: string) => {
  const { error } = await supabase
    .from("app_settings")
    .delete()
    .eq("key", key);

  if (error) {
    console.error("Error deleting app setting:", error);
    throw error;
  }
};

// Get database stats
export const getDatabaseStats = async () => {
  const [profilesRes, mealsRes, dailyStatsRes, waterLogsRes, subscriptionsRes] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("meals").select("id", { count: "exact", head: true }),
    supabase.from("daily_stats").select("id", { count: "exact", head: true }),
    supabase.from("water_logs").select("id", { count: "exact", head: true }),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }),
  ]);

  return {
    profiles: profilesRes.count || 0,
    meals: mealsRes.count || 0,
    daily_stats: dailyStatsRes.count || 0,
    water_logs: waterLogsRes.count || 0,
    subscriptions: subscriptionsRes.count || 0,
  };
};

// Export table data as JSON
export const exportTableData = async (tableName: string) => {
  const { data, error } = await supabase
    .from(tableName as any)
    .select("*");

  if (error) {
    console.error(`Error exporting ${tableName}:`, error);
    throw error;
  }

  return data;
};

// Get all user roles
export const getAllUserRoles = async () => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }

  return data || [];
};

// Assign role to user
export const assignUserRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
  // First check if user already has a role
  const { data: existing } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("user_roles")
      .update({ role })
      .eq("user_id", userId);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role });

    if (error) throw error;
  }
};

// Remove user role
export const removeUserRole = async (userId: string) => {
  const { error } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error removing user role:", error);
    throw error;
  }
};
