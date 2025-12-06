import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Settings, Plus, Edit2, Trash2, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAppSettings, updateAppSetting, deleteAppSetting } from "@/services/adminService";

interface AdminSettingsSectionProps {
  onBack: () => void;
}

const AdminSettingsSection = ({ onBack }: AdminSettingsSectionProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ value: "", description: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [newSetting, setNewSetting] = useState({ key: "", value: "", description: "" });

  useEffect(() => {
    loadSettings();
    // Timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getAppSettings();
      // Filter out API key settings (handled in another section)
      const appSettings = (data || []).filter((s: any) => 
        !s.key.includes("API_KEY") && !s.key.includes("_AI_")
      );
      setSettings(appSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      setSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key);
    setEditForm({ value: setting.value || "", description: setting.description || "" });
  };

  const handleSave = async (key: string) => {
    try {
      await updateAppSetting(key, editForm.value, editForm.description);
      toast({ title: "Sucesso", description: "Configuração atualizada!" });
      setEditingKey(null);
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteAppSetting(key);
      toast({ title: "Sucesso", description: "Configuração removida!" });
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  const handleAdd = async () => {
    if (!newSetting.key) {
      toast({ title: "Erro", description: "O nome da configuração é obrigatório.", variant: "destructive" });
      return;
    }

    try {
      await updateAppSetting(newSetting.key, newSetting.value, newSetting.description);
      toast({ title: "Sucesso", description: "Configuração adicionada!" });
      setShowAdd(false);
      setNewSetting({ key: "", value: "", description: "" });
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível adicionar.", variant: "destructive" });
    }
  };

  const commonSettings = [
    { key: "APP_NAME", label: "Nome do App", defaultValue: "DogFitTdc Ai" },
    { key: "APP_VERSION", label: "Versão", defaultValue: "1.0.0" },
    { key: "MAINTENANCE_MODE", label: "Modo Manutenção", defaultValue: "false" },
    { key: "MAX_DAILY_MEALS", label: "Máx. Refeições/Dia", defaultValue: "10" },
    { key: "DEFAULT_CALORIE_GOAL", label: "Meta Calorias Padrão", defaultValue: "2000" },
    { key: "DEFAULT_WATER_GOAL", label: "Meta Água Padrão", defaultValue: "8" },
  ];

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
        <h2 className="text-xl font-bold">Configurações do App</h2>
      </div>

      {/* Quick Add Presets */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">CONFIGURAÇÕES COMUNS</h3>
        <div className="grid grid-cols-2 gap-2">
          {commonSettings.filter(c => !settings.find(s => s.key === c.key)).slice(0, 4).map((preset) => (
            <button
              key={preset.key}
              onClick={() => {
                setShowAdd(true);
                setNewSetting({ key: preset.key, value: preset.defaultValue, description: preset.label });
              }}
              className="p-3 bg-card border border-border rounded-xl text-left hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-sm">{preset.label}</p>
              <p className="text-xs text-muted-foreground">{preset.defaultValue}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add New Form */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-card rounded-xl p-4 border border-border space-y-4"
        >
          <h3 className="font-semibold">Nova Configuração</h3>
          
          <div>
            <label className="text-sm text-muted-foreground">Nome</label>
            <input
              type="text"
              value={newSetting.key}
              onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value.toUpperCase().replace(/\s/g, "_") })}
              placeholder="EX: APP_VERSION"
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Valor</label>
            <input
              type="text"
              value={newSetting.value}
              onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
              placeholder="Valor da configuração"
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Descrição</label>
            <input
              type="text"
              value={newSetting.description}
              onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
              placeholder="Descrição da configuração"
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Adicionar
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewSetting({ key: "", value: "", description: "" }); }}
              className="flex-1 py-3 bg-muted rounded-lg font-medium"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Existing Settings */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-sm text-muted-foreground">CONFIGURAÇÕES ATUAIS</h3>
          <button
            onClick={() => setShowAdd(true)}
            className="text-primary text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        {settings.length === 0 ? (
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma configuração personalizada</p>
            <p className="text-xs text-muted-foreground mt-1">Clique em "Adicionar" para criar uma</p>
          </div>
        ) : (
          settings.map((setting) => (
            <motion.div
              key={setting.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-4 border border-border"
            >
              {editingKey === setting.key ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.value}
                    onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                    className="w-full p-2 bg-muted rounded-lg"
                    placeholder="Valor"
                  />
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full p-2 bg-muted rounded-lg"
                    placeholder="Descrição"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(setting.key)}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingKey(null)}
                      className="flex-1 py-2 bg-muted rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{setting.key}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">{setting.value || "-"}</span>
                      {setting.description && <span>• {setting.description}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(setting)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(setting.key)}
                    className="p-2 hover:bg-destructive/20 rounded-lg text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={loadSettings}
        className="w-full flex items-center justify-center gap-2 p-3 bg-muted rounded-xl hover:bg-muted/70 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span className="text-sm">Atualizar configurações</span>
      </motion.button>
    </div>
  );
};

export default AdminSettingsSection;
