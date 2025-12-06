import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, HelpCircle, LogOut, Bell, Shield, Star, 
  MessageCircle, User, ChevronRight, Moon, Sun, 
  TrendingUp, Award, Target, Edit2, Save, X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, type Profile } from "@/services/appService";
import { checkIsAdmin, ADMIN_EMAIL } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import AdminPanel from "./admin/AdminPanel";

const AppMore = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Goals editing
  const [editingGoals, setEditingGoals] = useState(false);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 65,
    water: 8,
  });

  useEffect(() => {
    if (user) {
      loadProfile();
      loadAdminStatus();
    }
  }, [user]);

  const loadAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    
    // Check by email first (fastest)
    if (user.email === ADMIN_EMAIL) {
      setIsAdmin(true);
      return;
    }
    
    // Then check database role
    try {
      const adminStatus = await checkIsAdmin(user.id);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const loadProfile = async () => {
    if (!user) return;
    try {
      const data = await getProfile(user.id);
      if (data) {
        setProfile(data);
        setGoals({
          calories: data.daily_calorie_goal,
          protein: data.daily_protein_goal,
          carbs: data.daily_carbs_goal,
          fat: data.daily_fat_goal,
          water: data.daily_water_goal,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleSaveGoals = async () => {
    if (!user) return;
    try {
      await updateProfile(user.id, {
        daily_calorie_goal: goals.calories,
        daily_protein_goal: goals.protein,
        daily_carbs_goal: goals.carbs,
        daily_fat_goal: goals.fat,
        daily_water_goal: goals.water,
      });
      toast({ title: "Metas salvas!", description: "Suas metas foram atualizadas." });
      setEditingGoals(false);
      loadProfile();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const stats = [
    { label: "Dias seguidos", value: "12", icon: "🔥" },
    { label: "Refeições logadas", value: "156", icon: "🍽️" },
    { label: "Metas atingidas", value: "8", icon: "🎯" },
  ];

  const achievements = [
    { title: "Primeira Refeição", description: "Registrou sua primeira refeição", unlocked: true, icon: "🎉" },
    { title: "7 Dias Seguidos", description: "Use o app por 7 dias consecutivos", unlocked: true, icon: "🔥" },
    { title: "Meta Batida", description: "Atinja sua meta de calorias", unlocked: true, icon: "🎯" },
    { title: "Hidratado", description: "Beba 8 copos de água em um dia", unlocked: false, icon: "💧" },
    { title: "Mestre das Proteínas", description: "Atinja sua meta de proteína 5 dias seguidos", unlocked: false, icon: "💪" },
  ];


  // Render section content
  const renderSection = () => {
    switch (activeSection) {
      case "admin":
        return <AdminPanel onClose={() => setActiveSection(null)} />;
      case "profile":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Perfil</h2>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20">
                  <img src={logo} alt="Avatar" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{profile?.full_name || "Usuário"}</h3>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Metas Diárias</h2>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border space-y-4">
              {[
                { key: "calories", label: "Calorias", unit: "kcal" },
                { key: "protein", label: "Proteína", unit: "g" },
                { key: "carbs", label: "Carboidratos", unit: "g" },
                { key: "fat", label: "Gordura", unit: "g" },
                { key: "water", label: "Água", unit: "copos" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={goals[item.key as keyof typeof goals]}
                      onChange={(e) => setGoals({ ...goals, [item.key]: Number(e.target.value) })}
                      className="w-20 px-3 py-2 rounded-lg bg-muted text-right font-bold"
                    />
                    <span className="text-muted-foreground text-sm w-12">{item.unit}</span>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSaveGoals}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar Metas
              </button>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Progresso</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border text-center">
                  <span className="text-2xl block mb-1">{stat.icon}</span>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border">
              <h3 className="font-semibold mb-3">Resumo Semanal</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Média de calorias</span>
                  <span className="font-bold">1,850 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Dias dentro da meta</span>
                  <span className="font-bold">5/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total de refeições</span>
                  <span className="font-bold">21</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Conquistas</h2>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`bg-card rounded-2xl p-4 border ${
                    achievement.unlocked ? "border-primary/50" : "border-border opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        ✓ Desbloqueado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Configurações</h2>
            </div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span>Modo escuro</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <span>Notificações</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Ajuda e Suporte</h2>
            </div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {[
                { title: "Como usar o app?", content: "Tire fotos das suas refeições para registrar automaticamente as calorias." },
                { title: "Como definir metas?", content: "Acesse 'Metas Diárias' no menu para personalizar suas metas de nutrição." },
                { title: "Contato", content: "suporte@dogfittdc.com" },
              ].map((item, index) => (
                <div key={item.title} className={`p-4 ${index !== 2 ? "border-b border-border" : ""}`}>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Main menu
  if (activeSection) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4"
      >
        {renderSection()}
      </motion.div>
    );
  }


  const menuItems = [
    { icon: User, label: "Perfil", section: "profile", color: "text-blue-500" },
    { icon: Target, label: "Metas Diárias", section: "goals", color: "text-green-500" },
    { icon: TrendingUp, label: "Progresso", section: "progress", color: "text-purple-500" },
    { icon: Award, label: "Conquistas", section: "achievements", color: "text-yellow-500" },
    { icon: Settings, label: "Configurações", section: "settings", color: "text-gray-500" },
    { icon: HelpCircle, label: "Ajuda e Suporte", section: "help", color: "text-cyan-500" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border"
      >
        <div className="w-16 h-16">
          <img src={logo} alt="DogFitTdc Ai" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{profile?.full_name || "Usuário"}</h1>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-3 border border-border text-center">
            <span className="text-xl block">{stat.icon}</span>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Admin Panel Button */}
      {isAdmin && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => setActiveSection("admin")}
          className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl border border-primary/30"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="text-foreground font-semibold flex-1 text-left">Painel Admin</span>
          <ChevronRight className="w-5 h-5 text-primary" />
        </motion.button>
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
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="text-foreground font-medium flex-1 text-left">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={handleLogout}
        className="w-full flex items-center gap-4 p-4 bg-destructive/10 rounded-2xl hover:bg-destructive/20 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <span className="text-destructive font-medium">Sair da conta</span>
      </motion.button>
    </div>
  );
};

export default AppMore;
