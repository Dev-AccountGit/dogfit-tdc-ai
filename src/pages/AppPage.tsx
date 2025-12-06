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
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/40">
          <div className="flex items-center justify-around px-4 py-3">
            {/* Home */}
            <button
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-0.5 min-w-[48px] transition-colors"
            >
              <Home 
                className={`w-6 h-6 ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`} 
                strokeWidth={activeTab === "home" ? 2.5 : 1.5}
              />
              <span className={`text-[10px] ${activeTab === "home" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                Home
              </span>
            </button>

            {/* Agenda */}
            <button
              onClick={() => setActiveTab("search")}
              className="flex flex-col items-center gap-0.5 min-w-[48px] transition-colors"
            >
              <Calendar 
                className={`w-6 h-6 ${activeTab === "search" ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={activeTab === "search" ? 2.5 : 1.5}
              />
              <span className={`text-[10px] ${activeTab === "search" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                Agenda
              </span>
            </button>

            {/* Central Button */}
            <button
              onClick={() => setActiveTab("camera")}
              className="w-12 h-12 -mt-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
            >
              <Plus className="w-6 h-6" strokeWidth={2.5} />
            </button>

            {/* Histórico */}
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-0.5 min-w-[48px] transition-colors"
            >
              <History 
                className={`w-6 h-6 ${activeTab === "profile" ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={activeTab === "profile" ? 2.5 : 1.5}
              />
              <span className={`text-[10px] ${activeTab === "profile" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                Histórico
              </span>
            </button>

            {/* Mais */}
            <button className="flex flex-col items-center gap-0.5 min-w-[48px] transition-colors">
              <MoreHorizontal className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-[10px] text-muted-foreground">
                Mais
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppPage;
