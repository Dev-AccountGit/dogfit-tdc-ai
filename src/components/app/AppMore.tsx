import { Settings, HelpCircle, LogOut, Bell, Shield, Star, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AppMore = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: Bell, label: "Notificações", onClick: () => {} },
    { icon: Settings, label: "Configurações", onClick: () => {} },
    { icon: Shield, label: "Privacidade", onClick: () => {} },
    { icon: Star, label: "Avaliar App", onClick: () => {} },
    { icon: MessageCircle, label: "Suporte", onClick: () => {} },
    { icon: HelpCircle, label: "Ajuda", onClick: () => {} },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Mais</h1>
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
              index !== menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <item.icon className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-foreground font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-4 p-4 bg-destructive/10 rounded-2xl hover:bg-destructive/20 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <span className="text-destructive font-medium">Sair da conta</span>
      </button>
    </div>
  );
};

export default AppMore;
