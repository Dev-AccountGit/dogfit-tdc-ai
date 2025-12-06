import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, ExternalLink, Wifi, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const UpdateChecker = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateMode, setUpdateMode] = useState<"apk" | "live">("live");
  const [updateInfo, setUpdateInfo] = useState<{
    currentVersion: string;
    latestVersion: string;
    message: string;
    updateUrl: string;
    forceUpdate: boolean;
  } | null>(null);

  useEffect(() => {
    checkForUpdates();
  }, []);

  const compareVersions = (v1: string, v2: string): number => {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  };

  const checkForUpdates = async () => {
    try {
      const { data: settings, error } = await supabase
        .from("app_settings")
        .select("key, value")
        .in("key", ["UPDATE_MODE", "APP_VERSION", "LATEST_VERSION", "UPDATE_MESSAGE", "UPDATE_URL", "FORCE_UPDATE"]);

      if (error) throw error;

      if (settings) {
        const mode = settings.find((s) => s.key === "UPDATE_MODE")?.value as "apk" | "live" || "live";
        setUpdateMode(mode);

        // If in live mode, no update popup needed - updates happen automatically
        if (mode === "live") {
          return;
        }

        // APK mode - check for version updates
        const currentVersion = settings.find((s) => s.key === "APP_VERSION")?.value || "1.0.0";
        const latestVersion = settings.find((s) => s.key === "LATEST_VERSION")?.value || "1.0.0";
        const message = settings.find((s) => s.key === "UPDATE_MESSAGE")?.value || "Uma nova versão está disponível!";
        const updateUrl = settings.find((s) => s.key === "UPDATE_URL")?.value || "";
        const forceUpdate = settings.find((s) => s.key === "FORCE_UPDATE")?.value === "true";

        // Check if update is available
        if (compareVersions(latestVersion, currentVersion) > 0) {
          setUpdateInfo({
            currentVersion,
            latestVersion,
            message,
            updateUrl,
            forceUpdate,
          });
          setShowUpdateModal(true);
        }
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  };

  const handleUpdate = () => {
    if (updateInfo?.updateUrl) {
      window.open(updateInfo.updateUrl, "_blank");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    if (!updateInfo?.forceUpdate) {
      setShowUpdateModal(false);
    }
  };

  // In live mode, no update modal needed
  if (updateMode === "live") {
    return null;
  }

  if (!showUpdateModal || !updateInfo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-sm bg-background rounded-2xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 pb-4">
            {!updateInfo.forceUpdate && (
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Icon */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
            >
              <Download className="w-10 h-10 text-primary" />
            </motion.div>

            <h2 className="text-xl font-bold text-center mb-2">
              Nova Versão Disponível
            </h2>
            
            <p className="text-center text-muted-foreground text-sm">
              {updateInfo.message}
            </p>
          </div>

          {/* Version Info */}
          <div className="px-6 py-4 bg-muted/50">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Atual</p>
                <p className="font-mono font-bold">v{updateInfo.currentVersion}</p>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Nova</p>
                <p className="font-mono font-bold text-primary">v{updateInfo.latestVersion}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 flex gap-3">
            {!updateInfo.forceUpdate && (
              <button
                onClick={handleDismiss}
                className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors"
              >
                Depois
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdate}
              className={`${updateInfo.forceUpdate ? "w-full" : "flex-1"} py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2`}
            >
              <ExternalLink className="w-4 h-4" />
              Baixar APK
            </motion.button>
          </div>

          {updateInfo.forceUpdate && (
            <p className="text-xs text-center text-muted-foreground pb-4 px-6">
              Esta atualização é obrigatória para continuar usando o app.
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateChecker;
