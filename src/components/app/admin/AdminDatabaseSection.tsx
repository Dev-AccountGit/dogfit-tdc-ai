import { useState } from "react";
import { motion } from "framer-motion";
import { X, Database, Download, Upload, Table, RefreshCw, FileJson, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportTableData } from "@/services/adminService";

interface AdminDatabaseSectionProps {
  onBack: () => void;
  stats: any;
}

const AdminDatabaseSection = ({ onBack, stats }: AdminDatabaseSectionProps) => {
  const { toast } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);

  const tables = [
    { name: "profiles", label: "Perfis", count: stats?.profiles || 0 },
    { name: "meals", label: "Refeições", count: stats?.meals || 0 },
    { name: "daily_stats", label: "Estatísticas Diárias", count: stats?.daily_stats || 0 },
    { name: "water_logs", label: "Registros de Água", count: stats?.water_logs || 0 },
    { name: "subscriptions", label: "Assinaturas", count: stats?.subscriptions || 0 },
    { name: "user_roles", label: "Roles de Usuários", count: 0 },
    { name: "app_settings", label: "Configurações", count: 0 },
  ];

  const handleExport = async (tableName: string) => {
    setExporting(tableName);
    try {
      const data = await exportTableData(tableName);
      
      // Create and download JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tableName}_export_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: "Sucesso", description: `${tableName} exportado com sucesso!` });
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível exportar.", variant: "destructive" });
    } finally {
      setExporting(null);
    }
  };

  const handleExportAll = async () => {
    setExporting("all");
    try {
      const allData: Record<string, any> = {};
      
      for (const table of tables) {
        try {
          const data = await exportTableData(table.name);
          allData[table.name] = data;
        } catch (e) {
          allData[table.name] = { error: "Não foi possível exportar" };
        }
      }

      const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `database_full_export_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: "Sucesso", description: "Banco de dados exportado com sucesso!" });
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível exportar.", variant: "destructive" });
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Banco de Dados</h2>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20"
      >
        <div className="flex items-center gap-3 mb-3">
          <Database className="w-6 h-6 text-primary" />
          <h3 className="font-semibold">Visão Geral</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Total de Registros</p>
            <p className="text-2xl font-bold">
              {stats ? (Object.values(stats) as number[]).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0) : 0}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Tabelas</p>
            <p className="text-2xl font-bold">{tables.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Export All Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onClick={handleExportAll}
        disabled={exporting === "all"}
        className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50"
      >
        {exporting === "all" ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        Exportar Todo o Banco
      </motion.button>

      {/* Tables List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground px-1">TABELAS</h3>
        {tables.map((table, index) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Table className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{table.label}</p>
                <p className="text-xs text-muted-foreground">{table.name}</p>
              </div>
              <span className="bg-muted px-2 py-1 rounded-full text-xs">
                {table.count} registros
              </span>
              <button
                onClick={() => handleExport(table.name)}
                disabled={exporting === table.name}
                className="p-2 hover:bg-muted rounded-lg disabled:opacity-50"
              >
                {exporting === table.name ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <FileJson className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Os dados são exportados em formato JSON. Para importar dados, utilize as funções do Supabase diretamente.
        </p>
      </div>
    </div>
  );
};

export default AdminDatabaseSection;
