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

      {/* Bottom Navigation - iOS Style */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        {/* Glass Effect Background */}
        <div className="relative bg-background/70 backdrop-blur-2xl border-t border-border/30 shadow-[0_-2px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-end justify-around px-2 pt-2 pb-8">
            {/* Home */}
            <button
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-200 active:scale-95"
            >
              <div className={`p-1 rounded-xl transition-all duration-200 ${activeTab === "home" ? "bg-primary/10" : ""}`}>
                <Home 
                  className={`w-6 h-6 transition-all duration-200 ${
                    activeTab === "home" ? "text-primary" : "text-muted-foreground"
                  }`} 
                  strokeWidth={activeTab === "home" ? 2.5 : 1.5}
                />
              </div>
              <span className={`text-[10px] tracking-tight transition-all duration-200 ${
                activeTab === "home" ? "text-primary font-semibold" : "text-muted-foreground font-medium"
              }`}>
                Home
              </span>
            </button>

            {/* Agenda */}
            <button
              onClick={() => setActiveTab("search")}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-200 active:scale-95"
            >
              <div className={`p-1 rounded-xl transition-all duration-200 ${activeTab === "search" ? "bg-primary/10" : ""}`}>
                <Calendar 
                  className={`w-6 h-6 transition-all duration-200 ${
                    activeTab === "search" ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={activeTab === "search" ? 2.5 : 1.5}
                />
              </div>
              <span className={`text-[10px] tracking-tight transition-all duration-200 ${
                activeTab === "search" ? "text-primary font-semibold" : "text-muted-foreground font-medium"
              }`}>
                Agenda
              </span>
            </button>

            {/* Central Floating Button */}
            <div className="flex flex-col items-center -mt-6">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveTab("camera")}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  activeTab === "camera" 
                    ? "bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(var(--primary),0.4)]" 
                    : "bg-primary text-primary-foreground shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                }`}
                style={{
                  boxShadow: activeTab === "camera" 
                    ? "0 4px 20px hsl(var(--primary) / 0.4)" 
                    : "0 4px 16px rgba(0,0,0,0.12)"
                }}
              >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Histórico */}
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-200 active:scale-95"
            >
              <div className={`p-1 rounded-xl transition-all duration-200 ${activeTab === "profile" ? "bg-primary/10" : ""}`}>
                <History 
                  className={`w-6 h-6 transition-all duration-200 ${
                    activeTab === "profile" ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={activeTab === "profile" ? 2.5 : 1.5}
                />
              </div>
              <span className={`text-[10px] tracking-tight transition-all duration-200 ${
                activeTab === "profile" ? "text-primary font-semibold" : "text-muted-foreground font-medium"
              }`}>
                Histórico
              </span>
            </button>

            {/* Mais */}
            <button
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-200 active:scale-95"
            >
              <div className="p-1 rounded-xl">
                <MoreHorizontal className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] tracking-tight text-muted-foreground font-medium">
                Mais
              </span>
            </button>
          </div>

          {/* iOS Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/15 rounded-full" />
        </div>
      </nav>
    </div>
  );
};

export default AppPage;
