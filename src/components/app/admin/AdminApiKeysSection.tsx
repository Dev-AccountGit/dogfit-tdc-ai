import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Key, Plus, Edit2, Trash2, Eye, EyeOff, Save, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAppSettings, updateAppSetting, deleteAppSetting } from "@/services/adminService";

interface AdminApiKeysSectionProps {
  onBack: () => void;
}

const AdminApiKeysSection = ({ onBack }: AdminApiKeysSectionProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newKey, setNewKey] = useState({ key: "", value: "", description: "" });

  const predefinedKeys = [
    { key: "OPENAI_API_KEY", label: "OpenAI API Key", description: "Chave da API OpenAI para GPT" },
    { key: "ANTHROPIC_API_KEY", label: "Anthropic API Key", description: "Chave da API Anthropic para Claude" },
    { key: "GOOGLE_AI_API_KEY", label: "Google AI API Key", description: "Chave da API Google AI para Gemini" },
    { key: "LOVABLE_AI_ENABLED", label: "Lovable AI Habilitado", description: "Usar Lovable AI Gateway" },
  ];

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
      // Filter only API key related settings
      const apiSettings = (data || []).filter((s: any) => 
        s.key.includes("API_KEY") || s.key.includes("_AI_") || s.key.includes("AI_")
      );
      setSettings(apiSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      setSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string) => {
    try {
      await updateAppSetting(key, editValue);
      toast({ title: "Sucesso", description: "API Key atualizada!" });
      setEditingKey(null);
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteAppSetting(key);
      toast({ title: "Sucesso", description: "API Key removida!" });
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  const handleAdd = async () => {
    if (!newKey.key || !newKey.value) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }

    try {
      await updateAppSetting(newKey.key, newKey.value, newKey.description);
      toast({ title: "Sucesso", description: "API Key adicionada!" });
      setShowAdd(false);
      setNewKey({ key: "", value: "", description: "" });
      loadSettings();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível adicionar.", variant: "destructive" });
    }
  };

  const handleQuickAdd = async (preset: typeof predefinedKeys[0]) => {
    setShowAdd(true);
    setNewKey({ key: preset.key, value: "", description: preset.description });
  };

  const maskValue = (value: string) => {
    if (value.length <= 8) return "••••••••";
    return value.substring(0, 4) + "••••" + value.substring(value.length - 4);
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
        <h2 className="text-xl font-bold">API Keys de IA</h2>
      </div>

      {/* Lovable AI Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="font-semibold">Lovable AI Gateway</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          O app usa o Lovable AI Gateway por padrão, que não requer configuração de API Key. 
          Configure chaves personalizadas apenas se necessário.
        </p>
        <div className="bg-primary/10 rounded-lg p-2 text-xs text-primary">
          ✓ Google Gemini, OpenAI GPT disponíveis via Gateway
        </div>
      </motion.div>

      {/* Quick Add Presets */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">ADICIONAR RAPIDAMENTE</h3>
        <div className="grid grid-cols-2 gap-2">
          {predefinedKeys.filter(p => !settings.find(s => s.key === p.key)).map((preset) => (
            <button
              key={preset.key}
              onClick={() => handleQuickAdd(preset)}
              className="p-3 bg-card border border-border rounded-xl text-left hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-sm">{preset.label}</p>
              <p className="text-xs text-muted-foreground truncate">{preset.description}</p>
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
          <h3 className="font-semibold">Nova API Key</h3>
          
          <div>
            <label className="text-sm text-muted-foreground">Nome da Chave</label>
            <input
              type="text"
              value={newKey.key}
              onChange={(e) => setNewKey({ ...newKey, key: e.target.value.toUpperCase().replace(/\s/g, "_") })}
              placeholder="EX: OPENAI_API_KEY"
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Valor</label>
            <input
              type="password"
              value={newKey.value}
              onChange={(e) => setNewKey({ ...newKey, value: e.target.value })}
              placeholder="sk-..."
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Descrição (opcional)</label>
            <input
              type="text"
              value={newKey.description}
              onChange={(e) => setNewKey({ ...newKey, description: e.target.value })}
              placeholder="Descrição da chave"
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
              onClick={() => { setShowAdd(false); setNewKey({ key: "", value: "", description: "" }); }}
              className="flex-1 py-3 bg-muted rounded-lg font-medium"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Existing Keys */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-sm text-muted-foreground">CHAVES CONFIGURADAS</h3>
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
            <Key className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma API Key configurada</p>
            <p className="text-xs text-muted-foreground mt-1">O Lovable AI Gateway está ativo</p>
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
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-2 bg-muted rounded-lg font-mono text-sm"
                    placeholder="Novo valor"
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
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{setting.key}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {showValues[setting.key] ? setting.value : maskValue(setting.value || "")}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowValues({ ...showValues, [setting.key]: !showValues[setting.key] })}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    {showValues[setting.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setEditingKey(setting.key); setEditValue(setting.value || ""); }}
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

      {/* Security Warning */}
      <div className="bg-destructive/10 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm text-destructive">
          Mantenha suas API Keys seguras. Nunca compartilhe ou exponha essas chaves publicamente.
        </p>
      </div>
    </div>
  );
};

export default AdminApiKeysSection;
