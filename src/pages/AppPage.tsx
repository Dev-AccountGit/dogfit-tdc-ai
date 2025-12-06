import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Camera, Search, User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AppDashboard from "@/components/app/AppDashboard";
import AppCamera from "@/components/app/AppCamera";
import AppSearch from "@/components/app/AppSearch";
import AppProfile from "@/components/app/AppProfile";

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "camera", icon: Camera, label: "Scan" },
  { id: "search", icon: Search, label: "Search" },
  { id: "profile", icon: User, label: "Profile" },
];

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
        <div className="relative">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />
          
          {/* Navigation Items */}
          <div className="relative flex items-end justify-around px-2 pb-6 pt-2">
            {/* Left tabs */}
            <button
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all"
            >
              <Home className={`w-6 h-6 transition-colors ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium transition-colors ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`}>
                Home
              </span>
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all"
            >
              <Search className={`w-6 h-6 transition-colors ${activeTab === "search" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium transition-colors ${activeTab === "search" ? "text-primary" : "text-muted-foreground"}`}>
                Buscar
              </span>
            </button>

            {/* Central Floating Button */}
            <div className="flex flex-col items-center -mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("camera")}
                className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all ${
                  activeTab === "camera" 
                    ? "bg-primary text-primary-foreground shadow-primary/30" 
                    : "bg-primary text-primary-foreground shadow-primary/20"
                }`}
              >
                <Plus className="w-7 h-7" />
              </motion.button>
              <span className={`text-[10px] font-medium mt-1 transition-colors ${activeTab === "camera" ? "text-primary" : "text-muted-foreground"}`}>
                Scan
              </span>
            </div>

            {/* Right tabs */}
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all"
            >
              <User className={`w-6 h-6 transition-colors ${activeTab === "profile" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium transition-colors ${activeTab === "profile" ? "text-primary" : "text-muted-foreground"}`}>
                Perfil
              </span>
            </button>

            {/* More button placeholder for iOS style */}
            <button
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all opacity-0 pointer-events-none"
            >
              <User className="w-6 h-6" />
              <span className="text-[10px] font-medium">Mais</span>
            </button>
          </div>

          {/* iOS Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      </nav>
    </div>
  );
};

export default AppPage;
