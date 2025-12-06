import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Search, User, Plus, History, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppDashboard from "@/components/app/AppDashboard";
import AppCamera from "@/components/app/AppCamera";
import AppSearch from "@/components/app/AppSearch";
import AppProfile from "@/components/app/AppProfile";

const AppPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AppDashboard />;
      case "camera":
        return <AppCamera />;
      case "search":
        return <AppSearch />;
      case "profile":
        return <AppProfile />;
      default:
        return <AppDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto z-50">
        <div className="flex items-end justify-around px-1 pt-1 pb-4">
          {/* Home */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-2"
          >
            <Home className={`w-6 h-6 ${activeTab === "home" ? "text-foreground" : "text-muted-foreground"}`} />
            <span className={`text-[11px] ${activeTab === "home" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Home
            </span>
          </button>

          {/* Agenda */}
          <button
            onClick={() => setActiveTab("search")}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-2"
          >
            <Calendar className={`w-6 h-6 ${activeTab === "search" ? "text-foreground" : "text-muted-foreground"}`} />
            <span className={`text-[11px] ${activeTab === "search" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Agenda
            </span>
          </button>

          {/* Central Floating Button */}
          <div className="flex flex-col items-center -mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("camera")}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-md flex items-center justify-center"
            >
              <Plus className="w-7 h-7" />
            </motion.button>
          </div>

          {/* Histórico */}
          <button
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-2"
          >
            <History className={`w-6 h-6 ${activeTab === "profile" ? "text-foreground" : "text-muted-foreground"}`} />
            <span className={`text-[11px] ${activeTab === "profile" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Histórico
            </span>
          </button>

          {/* Mais */}
          <button
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-2"
          >
            <MoreHorizontal className={`w-6 h-6 text-muted-foreground`} />
            <span className="text-[11px] text-muted-foreground">
              Mais
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppPage;
