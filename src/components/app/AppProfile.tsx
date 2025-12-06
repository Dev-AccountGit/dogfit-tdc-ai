import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Settings, Bell, Moon, HelpCircle, 
  LogOut, ChevronRight, Target, TrendingUp, Award 
} from "lucide-react";

const stats = [
  { label: "Dias seguidos", value: "12", icon: "🔥" },
  { label: "Refeições logadas", value: "156", icon: "🍽️" },
  { label: "Metas atingidas", value: "8", icon: "🎯" },
];

const menuItems = [
  { icon: Target, label: "Metas e objetivos", href: "#" },
  { icon: TrendingUp, label: "Progresso", href: "#" },
  { icon: Award, label: "Conquistas", href: "#" },
  { icon: Bell, label: "Notificações", href: "#" },
  { icon: Moon, label: "Modo escuro", href: "#", toggle: true },
  { icon: Settings, label: "Configurações", href: "#" },
  { icon: HelpCircle, label: "Ajuda e suporte", href: "#" },
];

const AppProfile = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl">
          🐕
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Usuário</h1>
          <p className="text-muted-foreground text-sm">usuario@email.com</p>
          <button className="text-primary text-sm font-medium mt-1">
            Editar perfil
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {stats.map((stat, index) => (
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

      {/* Goals Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 border border-primary/20"
      >
        <h2 className="font-semibold mb-3">Suas metas diárias</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Calorias</p>
            <p className="text-lg font-bold">2.000 kcal</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Proteína</p>
            <p className="text-lg font-bold">120g</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Carboidratos</p>
            <p className="text-lg font-bold">250g</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gordura</p>
            <p className="text-lg font-bold">65g</p>
          </div>
        </div>
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
            {item.toggle ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDarkMode(!darkMode);
                }}
                className={`w-12 h-7 rounded-full transition-colors ${
                  darkMode ? "bg-primary" : "bg-secondary"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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
