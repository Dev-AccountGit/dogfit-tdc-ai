import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Settings, Bell, Moon, HelpCircle, 
  LogOut, ChevronRight, Target, TrendingUp, Award,
  Save
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, type Profile } from "@/services/appService";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const AppProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    }
  }, [user]);

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
      loadProfile();
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

  const stats = [
    { label: "Dias seguidos", value: "12", icon: "🔥" },
    { label: "Refeições logadas", value: "156", icon: "🍽️" },
    { label: "Metas atingidas", value: "8", icon: "🎯" },
  ];

  const menuItems = [
    { icon: TrendingUp, label: "Progresso", href: "#" },
    { icon: Award, label: "Conquistas", href: "#" },
    { icon: Bell, label: "Notificações", href: "#" },
    { icon: Settings, label: "Configurações", href: "#" },
    { icon: HelpCircle, label: "Ajuda e suporte", href: "#" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
        {stats.map((stat) => (
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
