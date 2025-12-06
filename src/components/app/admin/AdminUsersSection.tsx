import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, User, Shield, Search, UserCog, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllUsers, getAllUserRoles, assignUserRole, removeUserRole } from "@/services/adminService";

interface AdminUsersSectionProps {
  onBack: () => void;
}

const AdminUsersSection = ({ onBack }: AdminUsersSectionProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([
        getAllUsers(),
        getAllUserRoles(),
      ]);
      setUsers(usersData);
      setUserRoles(rolesData);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = (userId: string) => {
    const roleEntry = userRoles.find((r) => r.user_id === userId);
    return roleEntry?.role || "user";
  };

  const handleAssignRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      await assignUserRole(userId, role);
      toast({ title: "Sucesso", description: "Role atualizado com sucesso!" });
      loadData();
      setSelectedUser(null);
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível atualizar o role.", variant: "destructive" });
    }
  };

  const handleRemoveRole = async (userId: string) => {
    try {
      await removeUserRole(userId);
      toast({ title: "Sucesso", description: "Role removido com sucesso!" });
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover o role.", variant: "destructive" });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">Gerenciar Usuários</h2>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nome ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.full_name || "Sem nome"}</p>
                <p className="text-xs text-muted-foreground truncate">{user.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getUserRole(user.id) === "admin"
                      ? "bg-primary/20 text-primary"
                      : getUserRole(user.id) === "moderator"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {getUserRole(user.id)}
                </span>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <UserCog className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Role Editor */}
            {selectedUser?.id === user.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-border space-y-3"
              >
                <p className="text-sm text-muted-foreground">Selecione o role:</p>
                <div className="flex gap-2">
                  {(["user", "moderator", "admin"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => handleAssignRole(user.id, role)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        getUserRole(user.id) === role
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/70"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersSection;
