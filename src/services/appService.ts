import { supabase } from "@/integrations/supabase/client";

export interface DailyStats {
  id: string;
  user_id: string;
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  water_glasses: number;
  steps: number;
}

export interface Meal {
  id: string;
  user_id: string;
  name: string;
  meal_type: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image_url?: string;
  logged_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  daily_calorie_goal: number;
  daily_protein_goal: number;
  daily_carbs_goal: number;
  daily_fat_goal: number;
  daily_water_goal: number;
}

// Get or create today's stats
export const getTodayStats = async (userId: string): Promise<DailyStats | null> => {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  if (error) {
    console.error("Error fetching daily stats:", error);
    return null;
  }

  if (!data) {
    // Create today's stats if not exists
    const { data: newStats, error: createError } = await supabase
      .from("daily_stats")
      .insert({ user_id: userId, date: today })
      .select()
      .single();

    if (createError) {
      console.error("Error creating daily stats:", createError);
      return null;
    }
    return newStats;
  }

  return data;
};

// Update daily stats
export const updateDailyStats = async (
  statsId: string,
  updates: Partial<DailyStats>
) => {
  const { error } = await supabase
    .from("daily_stats")
    .update(updates)
    .eq("id", statsId);

  if (error) {
    console.error("Error updating daily stats:", error);
    throw error;
  }
};

// Get today's meals
export const getTodayMeals = async (userId: string): Promise<Meal[]> => {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_at", `${today}T00:00:00`)
    .lte("logged_at", `${today}T23:59:59`)
    .order("logged_at", { ascending: false });

  if (error) {
    console.error("Error fetching meals:", error);
    return [];
  }

  return data || [];
};

// Add a meal
export const addMeal = async (meal: Omit<Meal, "id">) => {
  const { data, error } = await supabase
    .from("meals")
    .insert(meal)
    .select()
    .single();

  if (error) {
    console.error("Error adding meal:", error);
    throw error;
  }

  return data;
};

// Delete a meal
export const deleteMeal = async (mealId: string) => {
  const { error } = await supabase.from("meals").delete().eq("id", mealId);

  if (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};

// Get user profile
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
};

// Update user profile
export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>
) => {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Add water
export const addWater = async (userId: string, glasses: number = 1) => {
  const today = new Date().toISOString().split("T")[0];

  // First, get today's stats
  const stats = await getTodayStats(userId);
  if (!stats) return;

  // Update water glasses
  await updateDailyStats(stats.id, {
    water_glasses: (stats.water_glasses || 0) + glasses,
  });

  // Also log to water_logs table
  await supabase.from("water_logs").insert({
    user_id: userId,
    glasses,
    logged_at: today,
  });
};
