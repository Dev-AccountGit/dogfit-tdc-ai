import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CreditCard, Search, Edit2, Check, Plus, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllSubscriptions, updateSubscription, createSubscription, getAllUsers } from "@/services/adminService";

interface AdminSubscriptionsSectionProps {
  onBack: () => void;
}

const AdminSubscriptionsSection = ({ onBack }: AdminSubscriptionsSectionProps) => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ plan: "", status: "", expires_at: "" });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ user_id: "", plan: "premium", expires_at: "" });

  useEffect(() => {
    loadData();
    // Timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subsData, usersData] = await Promise.all([
        getAllSubscriptions(),
        getAllUsers(),
      ]);
      setSubscriptions(subsData || []);
      setUsers(usersData || []);
    } catch (error) {
      console.error("Error loading subscriptions:", error);
      setSubscriptions([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.full_name || "Usuário";
  };

  const handleEdit = (subscription: any) => {
    setEditingId(subscription.id);
    setEditForm({
      plan: subscription.plan,
      status: subscription.status,
      expires_at: subscription.expires_at || "",
    });
  };

  const handleSave = async (id: string) => {
    try {
      await updateSubscription(id, {
        plan: editForm.plan,
        status: editForm.status,
        expires_at: editForm.expires_at || null,
      });
      toast({ title: "Sucesso", description: "Assinatura atualizada!" });
      setEditingId(null);
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível atualizar.", variant: "destructive" });
    }
  };

  const handleCreate = async () => {
    if (!createForm.user_id) {
      toast({ title: "Erro", description: "Selecione um usuário.", variant: "destructive" });
      return;
    }

    try {
      await createSubscription(createForm.user_id, createForm.plan, createForm.expires_at || undefined);
      toast({ title: "Sucesso", description: "Assinatura criada!" });
      setShowCreate(false);
      setCreateForm({ user_id: "", plan: "premium", expires_at: "" });
      loadData();
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível criar.", variant: "destructive" });
    }
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    getUserName(sub.user_id).toLowerCase().includes(search.toLowerCase()) ||
    sub.plan.toLowerCase().includes(search.toLowerCase())
  );

  const plans = ["free", "basic", "premium", "enterprise"];
  const statuses = ["active", "cancelled", "expired", "pending"];

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
        <h2 className="text-xl font-bold">Assinaturas</h2>
      </div>

      {/* Search and Add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="p-3 bg-primary text-primary-foreground rounded-xl"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-card rounded-xl p-4 border border-border space-y-4"
        >
          <h3 className="font-semibold">Nova Assinatura</h3>
          
          <div>
            <label className="text-sm text-muted-foreground">Usuário</label>
            <select
              value={createForm.user_id}
              onChange={(e) => setCreateForm({ ...createForm, user_id: e.target.value })}
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name || user.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Plano</label>
            <select
              value={createForm.plan}
              onChange={(e) => setCreateForm({ ...createForm, plan: e.target.value })}
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Expira em (opcional)</label>
            <input
              type="datetime-local"
              value={createForm.expires_at}
              onChange={(e) => setCreateForm({ ...createForm, expires_at: e.target.value })}
              className="w-full mt-1 p-3 bg-muted border border-border rounded-lg"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Criar
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="flex-1 py-3 bg-muted rounded-lg font-medium"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Subscriptions List */}
      <div className="space-y-2">
        {filteredSubscriptions.map((sub) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            {editingId === sub.id ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    value={editForm.plan}
                    onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                    className="flex-1 p-2 bg-muted rounded-lg"
                  >
                    {plans.map((plan) => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="flex-1 p-2 bg-muted rounded-lg"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="datetime-local"
                  value={editForm.expires_at}
                  onChange={(e) => setEditForm({ ...editForm, expires_at: e.target.value })}
                  className="w-full p-2 bg-muted rounded-lg"
                  placeholder="Data de expiração"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(sub.id)}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 bg-muted rounded-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{getUserName(sub.user_id)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="capitalize">{sub.plan}</span>
                    <span>•</span>
                    <span
                      className={`${
                        sub.status === "active"
                          ? "text-green-500"
                          : sub.status === "expired"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(sub)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ))}

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma assinatura encontrada
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptionsSection;
