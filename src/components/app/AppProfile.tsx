import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Settings, Bell, Moon, Sun, HelpCircle, 
  LogOut, ChevronRight, Target, TrendingUp, Award,
  Save, X, ArrowLeft
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, getTodayStats, type Profile, type DailyStats } from "@/services/appService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const AppProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingGoals, setEditingGoals] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [totalMeals, setTotalMeals] = useState(0);
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 65,
    water: 8,
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [profileData, statsData] = await Promise.all([
        getProfile(user.id),
        getTodayStats(user.id),
      ]);
      
      // Count total meals
      const { count } = await supabase
        .from("meals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      setTotalMeals(count || 0);
      
      if (profileData) {
        setProfile(profileData);
        setGoals({
          calories: profileData.daily_calorie_goal,
          protein: profileData.daily_protein_goal,
          carbs: profileData.daily_carbs_goal,
          fat: profileData.daily_fat_goal,
          water: profileData.daily_water_goal,
        });
      }
      if (statsData) {
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGoals = async () => {
    if (!user) return;
    setSaving(true);
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
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const quickStats = [
    { label: "Dias seguidos", value: "12", icon: "🔥" },
    { label: "Refeições", value: String(totalMeals), icon: "🍽️" },
    { label: "Metas atingidas", value: "8", icon: "🎯" },
  ];

  const achievements = [
    { title: "Primeira Refeição", description: "Registrou sua primeira refeição", unlocked: totalMeals >= 1, icon: "🎉" },
    { title: "Iniciante", description: "Registre 10 refeições", unlocked: totalMeals >= 10, icon: "⭐" },
    { title: "Consistente", description: "Registre 50 refeições", unlocked: totalMeals >= 50, icon: "🏆" },
    { title: "Meta Batida", description: "Atinja sua meta de calorias", unlocked: (stats?.total_calories || 0) >= goals.calories, icon: "🎯" },
    { title: "Hidratado", description: "Beba 8 copos de água em um dia", unlocked: (stats?.water_glasses || 0) >= 8, icon: "💧" },
    { title: "Mestre das Proteínas", description: "Atinja sua meta de proteína", unlocked: (stats?.total_protein || 0) >= goals.protein, icon: "💪" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Sub-sections rendering
  const renderSection = () => {
    switch (activeSection) {
      case "progress":
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Progresso</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border text-center">
                  <span className="text-2xl block mb-1">{stat.icon}</span>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border">
              <h3 className="font-semibold mb-3">Resumo de Hoje</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Calorias consumidas</span>
                  <span className="font-bold">{stats?.total_calories || 0} / {goals.calories} kcal</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, ((stats?.total_calories || 0) / goals.calories) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Proteína</span>
                  <span className="font-bold">{stats?.total_protein?.toFixed(0) || 0}g / {goals.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Carboidratos</span>
                  <span className="font-bold">{stats?.total_carbs?.toFixed(0) || 0}g / {goals.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Gordura</span>
                  <span className="font-bold">{stats?.total_fat?.toFixed(0) || 0}g / {goals.fat}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Água</span>
                  <span className="font-bold">{stats?.water_glasses || 0} / {goals.water} copos</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border">
              <h3 className="font-semibold mb-3">Estatísticas Gerais</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total de refeições</span>
                  <span className="font-bold">{totalMeals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Conquistas desbloqueadas</span>
                  <span className="font-bold">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Conquistas</h2>
            </div>
            
            <p className="text-muted-foreground text-sm">
              {achievements.filter(a => a.unlocked).length} de {achievements.length} desbloqueadas
            </p>
            
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`bg-card rounded-2xl p-4 border ${
                    achievement.unlocked ? "border-primary/50 bg-primary/5" : "border-border opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Notificações</h2>
            </div>
            
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <p className="font-medium">Lembretes de refeição</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes para registrar</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <p className="font-medium">Lembrete de água</p>
                  <p className="text-sm text-muted-foreground">Notificações para beber água</p>
                </div>
                <button
                  className="w-12 h-6 rounded-full bg-primary transition-colors"
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow translate-x-6" />
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Resumo diário</p>
                  <p className="text-sm text-muted-foreground">Receba seu resumo às 21h</p>
                </div>
                <button
                  className="w-12 h-6 rounded-full bg-muted transition-colors"
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <ArrowLeft className="w-5 h-5" />
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
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="p-4 border-b border-border">
                <p className="font-medium">Unidades</p>
                <p className="text-sm text-muted-foreground">kcal, gramas</p>
              </div>
              <div className="p-4 border-b border-border">
                <p className="font-medium">Idioma</p>
                <p className="text-sm text-muted-foreground">Português (Brasil)</p>
              </div>
              <div className="p-4">
                <p className="font-medium">Versão do app</p>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <button className="w-full p-4 text-left border-b border-border hover:bg-muted/50">
                <p className="font-medium">Exportar dados</p>
                <p className="text-sm text-muted-foreground">Baixar seus dados em CSV</p>
              </button>
              <button className="w-full p-4 text-left text-destructive hover:bg-destructive/10">
                <p className="font-medium">Excluir conta</p>
                <p className="text-sm opacity-70">Esta ação não pode ser desfeita</p>
              </button>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-muted rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Ajuda e Suporte</h2>
            </div>
            
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold mb-1">Como usar o app?</h3>
                <p className="text-sm text-muted-foreground">
                  Tire fotos das suas refeições usando o botão + central. O app irá analisar automaticamente 
                  as calorias e nutrientes. Você também pode adicionar manualmente.
                </p>
              </div>
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold mb-1">Como definir metas?</h3>
                <p className="text-sm text-muted-foreground">
                  Na tela Mais, clique em "Editar" no card de metas diárias para personalizar 
                  suas metas de calorias, proteína, carboidratos e gordura.
                </p>
              </div>
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold mb-1">Como ver o histórico?</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse a aba "Histórico" na navegação inferior para ver todas as refeições 
                  registradas em dias anteriores.
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Contato</h3>
                <p className="text-sm text-muted-foreground">
                  suporte@dogfittdc.com
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-4">
              <h3 className="font-semibold mb-2">Links úteis</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-primary text-sm">Termos de uso</button>
                <button className="w-full text-left text-primary text-sm">Política de privacidade</button>
                <button className="w-full text-left text-primary text-sm">Avaliar o app</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If in a sub-section, render it
  if (activeSection) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {renderSection()}
      </motion.div>
    );
  }

  const menuItems = [
    { icon: TrendingUp, label: "Progresso", section: "progress" },
    { icon: Award, label: "Conquistas", section: "achievements" },
    { icon: Bell, label: "Notificações", section: "notifications" },
    { icon: Settings, label: "Configurações", section: "settings" },
    { icon: HelpCircle, label: "Ajuda e suporte", section: "help" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-24 h-24">
          <img src={logo} alt="DogFitTdc Ai" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{profile?.full_name || "Usuário"}</h1>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl p-4 border border-border text-center"
          >
            <span className="text-2xl block mb-1">{stat.icon}</span>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Suas metas diárias</h2>
          <button
            onClick={() => editingGoals ? handleSaveGoals() : setEditingGoals(true)}
            disabled={saving}
            className="flex items-center gap-1 text-sm text-primary font-medium"
          >
            {editingGoals ? (
              <>
                <Save className="w-4 h-4" />
                {saving ? "Salvando..." : "Salvar"}
              </>
            ) : (
              <>
                <Target className="w-4 h-4" />
                Editar
              </>
            )}
          </button>
        </div>
        
        {editingGoals ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Calorias</label>
              <input
                type="number"
                value={goals.calories}
                onChange={(e) => setGoals({ ...goals, calories: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Proteína (g)</label>
              <input
                type="number"
                value={goals.protein}
                onChange={(e) => setGoals({ ...goals, protein: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Carbos (g)</label>
              <input
                type="number"
                value={goals.carbs}
                onChange={(e) => setGoals({ ...goals, carbs: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Gordura (g)</label>
              <input
                type="number"
                value={goals.fat}
                onChange={(e) => setGoals({ ...goals, fat: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Calorias</p>
              <p className="text-lg font-bold">{goals.calories} kcal</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proteína</p>
              <p className="text-lg font-bold">{goals.protein}g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carboidratos</p>
              <p className="text-lg font-bold">{goals.carbs}g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gordura</p>
              <p className="text-lg font-bold">{goals.fat}g</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => setActiveSection(item.section)}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={handleSignOut}
        className="w-full flex items-center gap-4 p-4 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
          <LogOut className="w-5 h-5" />
        </div>
        <span className="font-medium">Sair da conta</span>
      </motion.button>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground pt-4">
        DogFitTdc Ai v1.0.0
      </p>
    </div>
  );
};

export default AppProfile;
