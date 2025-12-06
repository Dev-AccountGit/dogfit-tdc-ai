-- Add policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Add policy for admins to view all meals
CREATE POLICY "Admins can view all meals" 
ON public.meals 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Add policy for admins to view all daily_stats
CREATE POLICY "Admins can view all daily_stats" 
ON public.daily_stats 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Add policy for admins to view all water_logs
CREATE POLICY "Admins can view all water_logs" 
ON public.water_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));