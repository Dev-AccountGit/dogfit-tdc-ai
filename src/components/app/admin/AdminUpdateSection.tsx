import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Globe,
  Clock,
  FileCode,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAppSettings, updateAppSetting } from "@/services/adminService";

interface AdminUpdateSectionProps {
  onBack: () => void;
}

const AdminUpdateSection = ({ onBack }: AdminUpdateSectionProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("1.0.0");
  const [latestVersion, setLatestVersion] = useState("1.0.0");
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("Uma nova versão está disponível!");
  const [updateUrl, setUpdateUrl] = useState("");
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const settings = await getAppSettings();
      
      const versionSetting = settings?.find((s: any) => s.key === "APP_VERSION");
      const forceUpdateSetting = settings?.find((s: any) => s.key === "FORCE_UPDATE");
      const updateMsgSetting = settings?.find((s: any) => s.key === "UPDATE_MESSAGE");
      const updateUrlSetting = settings?.find((s: any) => s.key === "UPDATE_URL");
      const latestVersionSetting = settings?.find((s: any) => s.key === "LATEST_VERSION");
      
      if (versionSetting) setCurrentVersion(versionSetting.value || "1.0.0");
      if (latestVersionSetting) setLatestVersion(latestVersionSetting.value || "1.0.0");
      if (forceUpdateSetting) setForceUpdate(forceUpdateSetting.value === "true");
      if (updateMsgSetting) setUpdateMessage(updateMsgSetting.value || "Uma nova versão está disponível!");
      if (updateUrlSetting) setUpdateUrl(updateUrlSetting.value || "");
      
      // Check if update is available
      if (latestVersionSetting && versionSetting) {
        const current = versionSetting.value || "1.0.0";
        const latest = latestVersionSetting.value || "1.0.0";
        setUpdateAvailable(compareVersions(latest, current) > 0);
      }
    } catch (error) {
      console.error("Error loading update settings:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const checkForUpdates = () => {
    setChecking(true);
    // Simulate checking for updates
    setTimeout(() => {
      setLastCheck(new Date());
      setChecking(false);
      toast({
        title: "Verificação concluída",
        description: updateAvailable 
          ? "Uma nova versão está disponível!"
          : "Você está usando a versão mais recente.",
      });
    }, 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAppSetting("APP_VERSION", currentVersion, "Versão atual do app");
      await updateAppSetting("LATEST_VERSION", latestVersion, "Última versão disponível");
      await updateAppSetting("FORCE_UPDATE", forceUpdate ? "true" : "false", "Forçar atualização obrigatória");
      await updateAppSetting("UPDATE_MESSAGE", updateMessage, "Mensagem de atualização");
      await updateAppSetting("UPDATE_URL", updateUrl, "URL para download da atualização");
      
      setUpdateAvailable(compareVersions(latestVersion, currentVersion) > 0);
      
      toast({
        title: "Sucesso",
        description: "Configurações de atualização salvas!",
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
        <h2 className="text-xl font-bold">Atualizações do App</h2>
      </div>

      {/* Version Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border-2 ${
          updateAvailable 
            ? "bg-primary/10 border-primary" 
            : "bg-muted border-border"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            updateAvailable ? "bg-primary" : "bg-muted-foreground/20"
          }`}>
            {updateAvailable ? (
              <Download className="w-8 h-8 text-white" />
            ) : (
              <CheckCircle className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">
              {updateAvailable ? "Atualização Disponível" : "App Atualizado"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Versão atual: {currentVersion} 
              {updateAvailable && ` → ${latestVersion}`}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={checkForUpdates}
            disabled={checking}
            className="p-3 rounded-xl bg-muted hover:bg-muted/70"
          >
            <RefreshCw className={`w-5 h-5 ${checking ? "animate-spin" : ""}`} />
          </motion.button>
        </div>
        
        {lastCheck && (
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Última verificação: {lastCheck.toLocaleString()}
          </p>
        )}
      </motion.div>

      {/* Version Configuration */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">CONFIGURAR VERSÕES</h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Current Version */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Smartphone className="w-4 h-4" />
              <span className="text-xs font-medium">Versão Atual</span>
            </div>
            <input
              type="text"
              value={currentVersion}
              onChange={(e) => setCurrentVersion(e.target.value)}
              className="w-full p-2 bg-muted border border-border rounded-lg text-sm"
              placeholder="1.0.0"
            />
          </div>

          {/* Latest Version */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">Última Versão</span>
            </div>
            <input
              type="text"
              value={latestVersion}
              onChange={(e) => setLatestVersion(e.target.value)}
              className="w-full p-2 bg-muted border border-border rounded-lg text-sm"
              placeholder="1.1.0"
            />
          </div>
        </div>

        {/* Update URL */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileCode className="w-4 h-4" />
            <span className="text-sm font-medium">URL de Download (APK)</span>
          </div>
          <input
            type="url"
            value={updateUrl}
            onChange={(e) => setUpdateUrl(e.target.value)}
            className="w-full p-3 bg-muted border border-border rounded-lg text-sm"
            placeholder="https://exemplo.com/app-v1.1.0.apk"
          />
          <p className="text-xs text-muted-foreground">
            Link direto para o arquivo APK ou página de download
          </p>
        </div>

        {/* Update Message */}
        <div className="bg-card rounded-xl p-4 border border-border space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Mensagem de Atualização</span>
          </div>
          <textarea
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            rows={2}
            className="w-full p-3 bg-muted border border-border rounded-lg resize-none text-sm"
            placeholder="Descreva as novidades desta versão..."
          />
        </div>

        {/* Force Update Toggle */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Atualização Obrigatória</p>
              <p className="text-xs text-muted-foreground mt-1">
                Usuários serão forçados a atualizar para continuar usando
              </p>
            </div>
            <button
              onClick={() => setForceUpdate(!forceUpdate)}
              className={`w-14 h-8 rounded-full transition-colors ${
                forceUpdate ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: forceUpdate ? 24 : 4 }}
                className="w-6 h-6 rounded-full bg-white shadow"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">PREVIEW DO POPUP</h3>
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-bold mb-2">Nova Versão Disponível</h4>
            <p className="text-muted-foreground text-sm mb-2">{updateMessage}</p>
            <p className="text-xs text-muted-foreground mb-4">
              v{currentVersion} → v{latestVersion}
            </p>
            <div className="flex gap-2">
              {!forceUpdate && (
                <button className="flex-1 py-2 rounded-lg border border-border text-sm">
                  Depois
                </button>
              )}
              <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
                Atualizar Agora
              </button>
            </div>
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

export default AdminUpdateSection;
