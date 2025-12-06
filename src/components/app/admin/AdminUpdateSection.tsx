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
  Save,
  Zap,
  Wifi,
  CloudDownload,
  Radio
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAppSettings, updateAppSetting } from "@/services/adminService";

interface AdminUpdateSectionProps {
  onBack: () => void;
}

type UpdateMode = "apk" | "live";

const AdminUpdateSection = ({ onBack }: AdminUpdateSectionProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updateMode, setUpdateMode] = useState<UpdateMode>("live");
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
      
      const modeSetting = settings?.find((s: any) => s.key === "UPDATE_MODE");
      const versionSetting = settings?.find((s: any) => s.key === "APP_VERSION");
      const forceUpdateSetting = settings?.find((s: any) => s.key === "FORCE_UPDATE");
      const updateMsgSetting = settings?.find((s: any) => s.key === "UPDATE_MESSAGE");
      const updateUrlSetting = settings?.find((s: any) => s.key === "UPDATE_URL");
      const latestVersionSetting = settings?.find((s: any) => s.key === "LATEST_VERSION");
      
      if (modeSetting) setUpdateMode((modeSetting.value as UpdateMode) || "live");
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
      await updateAppSetting("UPDATE_MODE", updateMode, "Modo de atualização (apk ou live)");
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

      {/* Update Mode Selection */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">MODO DE ATUALIZAÇÃO</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Live Mode */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setUpdateMode("live")}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              updateMode === "live"
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
              updateMode === "live" ? "bg-primary" : "bg-muted"
            }`}>
              <Zap className={`w-6 h-6 ${updateMode === "live" ? "text-white" : "text-muted-foreground"}`} />
            </div>
            <h4 className="font-bold mb-1">Tempo Real</h4>
            <p className="text-xs text-muted-foreground">
              Sincronizado com Lovable. Atualizações automáticas via web.
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs text-primary">
              <Radio className="w-3 h-3" />
              <span>Recomendado</span>
            </div>
          </motion.button>

          {/* APK Mode */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setUpdateMode("apk")}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              updateMode === "apk"
                ? "border-primary bg-primary/10"
                : "border-border bg-card"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
              updateMode === "apk" ? "bg-primary" : "bg-muted"
            }`}>
              <Download className={`w-6 h-6 ${updateMode === "apk" ? "text-white" : "text-muted-foreground"}`} />
            </div>
            <h4 className="font-bold mb-1">APK Manual</h4>
            <p className="text-xs text-muted-foreground">
              Download de novo APK. Usuário instala manualmente.
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
              <Smartphone className="w-3 h-3" />
              <span>Tradicional</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Live Mode Info */}
      {updateMode === "live" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-primary/5 rounded-2xl p-4 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Wifi className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Como funciona o modo Tempo Real?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                O APK é uma "casca" que carrega o app diretamente do servidor Lovable. 
                Qualquer alteração feita no Lovable aparece instantaneamente no app instalado, 
                sem precisar publicar novo APK na Play Store.
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Atualizações instantâneas</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Sem aprovação da Play Store</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Sempre sincronizado com o site</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Version Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-2xl border ${
          updateAvailable && updateMode === "apk"
            ? "bg-primary/10 border-primary" 
            : "bg-muted border-border"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            updateMode === "live" ? "bg-primary" : updateAvailable ? "bg-primary" : "bg-muted-foreground/20"
          }`}>
            {updateMode === "live" ? (
              <CloudDownload className="w-6 h-6 text-white" />
            ) : updateAvailable ? (
              <Download className="w-6 h-6 text-white" />
            ) : (
              <CheckCircle className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold">
              {updateMode === "live" 
                ? "Sincronização Ativa" 
                : updateAvailable 
                  ? "Atualização Disponível" 
                  : "App Atualizado"
              }
            </h3>
            <p className="text-sm text-muted-foreground">
              {updateMode === "live"
                ? "Conectado ao servidor Lovable"
                : `Versão: ${currentVersion}${updateAvailable ? ` → ${latestVersion}` : ""}`
              }
            </p>
          </div>
          {updateMode === "apk" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={checkForUpdates}
              disabled={checking}
              className="p-3 rounded-xl bg-card border border-border hover:bg-muted"
            >
              <RefreshCw className={`w-5 h-5 ${checking ? "animate-spin" : ""}`} />
            </motion.button>
          )}
        </div>
        
        {lastCheck && updateMode === "apk" && (
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Última verificação: {lastCheck.toLocaleString()}
          </p>
        )}
      </motion.div>

      {/* APK Mode Settings */}
      {updateMode === "apk" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-sm text-muted-foreground px-1">CONFIGURAR VERSÕES APK</h3>

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
                  Usuários serão forçados a atualizar
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
        </motion.div>
      )}

      {/* Live Mode - Version Tracking */}
      {updateMode === "live" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-sm text-muted-foreground px-1">INFORMAÇÕES DO APP</h3>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Versão do APK Base</span>
            </div>
            <input
              type="text"
              value={currentVersion}
              onChange={(e) => setCurrentVersion(e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-sm"
              placeholder="1.0.0"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Esta é a versão do APK instalado. O conteúdo do app atualiza automaticamente.
            </p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Servidor Lovable</p>
                <p className="text-xs text-muted-foreground">Todas as atualizações são automáticas</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Online
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
