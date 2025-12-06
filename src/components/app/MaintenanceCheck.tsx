import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MaintenanceCheckProps {
  children: React.ReactNode;
}

const MaintenanceCheck = ({ children }: MaintenanceCheckProps) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("Estamos em manutenção. Voltaremos em breve!");
  const [estimatedTime, setEstimatedTime] = useState("30");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkMaintenanceStatus();
    checkIfAdmin();
  }, []);

  const checkIfAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user has admin role
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        setIsAdmin(!!roleData || user.email === "kartywillytdc@gmail.com");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const checkMaintenanceStatus = async () => {
    try {
      const { data: settings, error } = await supabase
        .from("app_settings")
        .select("key, value")
        .in("key", ["MAINTENANCE_MODE", "MAINTENANCE_MESSAGE", "MAINTENANCE_ESTIMATED_TIME"]);

      if (error) throw error;

      if (settings) {
        const maintenanceSetting = settings.find((s) => s.key === "MAINTENANCE_MODE");
        const messageSetting = settings.find((s) => s.key === "MAINTENANCE_MESSAGE");
        const timeSetting = settings.find((s) => s.key === "MAINTENANCE_ESTIMATED_TIME");

        if (maintenanceSetting) {
          setIsMaintenanceMode(maintenanceSetting.value === "true");
        }
        if (messageSetting) {
          setMaintenanceMessage(messageSetting.value || "Estamos em manutenção. Voltaremos em breve!");
        }
        if (timeSetting) {
          setEstimatedTime(timeSetting.value || "30");
        }
      }
    } catch (error) {
      console.error("Error checking maintenance status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    checkMaintenanceStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If in maintenance mode and user is not admin, show maintenance screen
  if (isMaintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center"
          >
            <AlertTriangle className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">Manutenção</h1>

          {/* Message */}
          <p className="text-muted-foreground text-lg mb-6">
            {maintenanceMessage}
          </p>

          {/* Estimated Time */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-6">
            <p className="text-sm text-muted-foreground mb-2">Tempo estimado</p>
            <p className="text-2xl font-bold">
              {parseInt(estimatedTime) >= 60 
                ? `${Math.floor(parseInt(estimatedTime) / 60)}h ${parseInt(estimatedTime) % 60}min`
                : `${estimatedTime} minutos`
              }
            </p>
          </div>

          {/* Progress Animation */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-6">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-1/3 h-full bg-primary rounded-full"
            />
          </div>

          {/* Refresh Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl bg-muted hover:bg-muted/70 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Verificar novamente</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MaintenanceCheck;
