import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  AlertTriangle, 
  Power, 
  Clock, 
  MessageSquare,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAppSettings, updateAppSetting } from "@/services/adminService";

interface AdminMaintenanceSectionProps {
  onBack: () => void;
}

const AdminMaintenanceSection = ({ onBack }: AdminMaintenanceSectionProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("Estamos em manutenção. Voltaremos em breve!");
  const [estimatedTime, setEstimatedTime] = useState("30");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const settings = await getAppSettings();
      const maintenanceSetting = settings?.find((s: any) => s.key === "MAINTENANCE_MODE");
      const messageSetting = settings?.find((s: any) => s.key === "MAINTENANCE_MESSAGE");
      const timeSetting = settings?.find((s: any) => s.key === "MAINTENANCE_ESTIMATED_TIME");
      
      if (maintenanceSetting) {
        setMaintenanceMode(maintenanceSetting.value === "true");
      }
      if (messageSetting) {
        setMaintenanceMessage(messageSetting.value || "Estamos em manutenção. Voltaremos em breve!");
      }
      if (timeSetting) {
        setEstimatedTime(timeSetting.value || "30");
      }
    } catch (error) {
      console.error("Error loading maintenance settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAppSetting("MAINTENANCE_MODE", maintenanceMode ? "true" : "false", "Modo de manutenção do app");
      await updateAppSetting("MAINTENANCE_MESSAGE", maintenanceMessage, "Mensagem exibida durante manutenção");
      await updateAppSetting("MAINTENANCE_ESTIMATED_TIME", estimatedTime, "Tempo estimado de manutenção (minutos)");
      
      toast({
        title: maintenanceMode ? "Modo Manutenção Ativado" : "App Online",
        description: maintenanceMode 
          ? "O aplicativo está agora em modo de manutenção."
          : "O aplicativo está funcionando normalmente.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Modo Manutenção</h2>
      </div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border-2 ${
          maintenanceMode 
            ? "bg-destructive/10 border-destructive" 
            : "bg-primary/10 border-primary"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            maintenanceMode ? "bg-destructive" : "bg-primary"
          }`}>
            {maintenanceMode ? (
              <AlertTriangle className="w-8 h-8 text-white" />
            ) : (
              <CheckCircle className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">
              {maintenanceMode ? "Em Manutenção" : "App Online"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {maintenanceMode 
                ? "Os usuários não conseguem acessar o app"
                : "O aplicativo está funcionando normalmente"
              }
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMaintenance}
            className={`p-4 rounded-xl ${
              maintenanceMode 
                ? "bg-primary text-primary-foreground" 
                : "bg-destructive text-white"
            }`}
          >
            <Power className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Maintenance Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">CONFIGURAÇÕES</h3>

        {/* Message */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Mensagem para usuários</span>
          </div>
          <textarea
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
            rows={3}
            className="w-full p-3 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Mensagem exibida durante a manutenção..."
          />
        </div>

        {/* Estimated Time */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Tempo estimado (minutos)</span>
          </div>
          <div className="flex gap-2">
            {["15", "30", "60", "120"].map((time) => (
              <button
                key={time}
                onClick={() => setEstimatedTime(time)}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                  estimatedTime === time
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                {time}min
              </button>
            ))}
          </div>
          <input
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            className="w-full p-3 bg-muted border border-border rounded-lg"
            placeholder="Tempo personalizado em minutos"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">PREVIEW</h3>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-bold mb-2">Manutenção</h4>
            <p className="text-muted-foreground text-sm mb-4">{maintenanceMessage}</p>
            <p className="text-xs text-muted-foreground">
              Tempo estimado: {estimatedTime} minutos
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={saving}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Salvar Configurações
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AdminMaintenanceSection;
