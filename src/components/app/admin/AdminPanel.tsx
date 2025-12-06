import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  CreditCard,
  Database,
  Key,
  Settings,
  Download,
  Upload,
  ChevronRight,
  X,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { checkIsAdmin, getDatabaseStats, ADMIN_EMAIL } from "@/services/adminService";
import AdminUsersSection from "./AdminUsersSection";
import AdminSubscriptionsSection from "./AdminSubscriptionsSection";
import AdminDatabaseSection from "./AdminDatabaseSection";
import AdminApiKeysSection from "./AdminApiKeysSection";
import AdminSettingsSection from "./AdminSettingsSection";

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dbStats, setDbStats] = useState<any>(null);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      loadStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }

    try {
      // Check if user email matches admin email first (fastest check)
      if (user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        setLoading(false);
        return;
      }

      // Then check database role
      const isAdminRole = await checkIsAdmin(user.id);
      setIsAdmin(isAdminRole);
    } catch (error) {
      console.error("Error checking admin status:", error);
      // If email matches, grant access anyway
      if (user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const stats = await getDatabaseStats();
      setDbStats(stats);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  // Show admin content if email matches OR if isAdmin is true
  const hasAdminAccess = isAdmin || user?.email === ADMIN_EMAIL;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAdminAccess) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Painel Administrativo</h2>
        </div>
        <div className="bg-destructive/10 rounded-2xl p-6 text-center">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Acesso Negado</h3>
          <p className="text-muted-foreground text-sm">
            Você não tem permissão para acessar esta área.
          </p>
        </div>
      </div>
    );
  }

  // Render section content
  if (activeSection) {
    const sections: Record<string, JSX.Element> = {
      users: <AdminUsersSection onBack={() => setActiveSection(null)} />,
      subscriptions: <AdminSubscriptionsSection onBack={() => setActiveSection(null)} />,
      database: <AdminDatabaseSection onBack={() => setActiveSection(null)} stats={dbStats} />,
      apikeys: <AdminApiKeysSection onBack={() => setActiveSection(null)} />,
      settings: <AdminSettingsSection onBack={() => setActiveSection(null)} />,
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4"
      >
        {sections[activeSection]}
      </motion.div>
    );
  }

  const menuItems = [
    { icon: Users, label: "Gerenciar Usuários", section: "users", count: dbStats?.profiles || 0 },
    { icon: CreditCard, label: "Assinaturas", section: "subscriptions", count: dbStats?.subscriptions || 0 },
    { icon: Database, label: "Banco de Dados", section: "database", count: null },
    { icon: Key, label: "API Keys de IA", section: "apikeys", count: null },
    { icon: Settings, label: "Configurações do App", section: "settings", count: null },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Painel Admin
        </h2>
      </div>

      {/* Admin Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Administrador</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      {dbStats && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold">{dbStats.profiles}</p>
            <p className="text-xs text-muted-foreground">Usuários</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold">{dbStats.meals}</p>
            <p className="text-xs text-muted-foreground">Refeições</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold">{dbStats.subscriptions}</p>
            <p className="text-xs text-muted-foreground">Assinaturas</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold">{dbStats.daily_stats}</p>
            <p className="text-xs text-muted-foreground">Registros Diários</p>
          </div>
        </motion.div>
      )}

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border overflow-hidden"
      >
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.section)}
            className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
              index !== menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-foreground font-medium flex-1 text-left">{item.label}</span>
            {item.count !== null && (
              <span className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground">
                {item.count}
              </span>
            )}
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      {/* Refresh Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={loadStats}
        className="w-full flex items-center justify-center gap-2 p-3 bg-muted rounded-xl hover:bg-muted/70 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span className="text-sm">Atualizar dados</span>
      </motion.button>
    </div>
  );
};

export default AdminPanel;
