import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, MapPin, Building2, Briefcase, Save, LogOut, ChevronRight, Lock, Eye, EyeOff, Check, X, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";

export default function AdminPerfil() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [formData, setFormData] = useState({
    nome: "Admin Master",
    email: "admin@thype.com.br",
    telefone: "(11) 98888-8888",
    cargo: "Administrador Master",
    departamento: "Gestão Estratégica",
    endereco: "São Paulo, SP"
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Erro", 
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowPasswordDialog(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast({
      title: "Senha alterada!",
      description: "Sua senha foi atualizada com sucesso.",
    });
  };

  const handleLogout = () => {
    setLocation("/login");
    toast({
      title: "Até logo!",
      description: "Você saiu da sua conta.",
    });
  };

  return (
    <MobileLayout role="admin">
      <div className="min-h-screen bg-background">
        <header className="px-6 pt-12 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-display font-bold text-white">Perfil Admin</h1>
          </div>
          <p className="text-sm text-white/50">Gerencie suas informações</p>
        </header>

        <div className="px-6 space-y-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div 
              onClick={handleImageClick}
              className="relative w-28 h-28 rounded-full bg-white/10 border-2 border-primary/50 flex items-center justify-center cursor-pointer group overflow-hidden"
              data-testid="button-upload-photo"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white/40" />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-white/40 mt-3">Toque para alterar a foto</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border-white/5 p-5 rounded-2xl space-y-4">
              <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Dados Pessoais</h2>
              
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <User className="w-3 h-3" /> Nome Completo
                </Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-nome"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> E-mail
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Telefone
                </Label>
                <Input
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-telefone"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-white/5 p-5 rounded-2xl space-y-4">
              <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Dados Profissionais</h2>
              
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Cargo
                </Label>
                <Input
                  value={formData.cargo}
                  onChange={(e) => handleInputChange("cargo", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-cargo"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Departamento
                </Label>
                <Input
                  value={formData.departamento}
                  onChange={(e) => handleInputChange("departamento", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-departamento"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Localização
                </Label>
                <Input
                  value={formData.endereco}
                  onChange={(e) => handleInputChange("endereco", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-endereco"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
              data-testid="button-save-profile"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>

            <Card className="bg-card border-white/5 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setShowPasswordDialog(true)}
                className="w-full flex items-center justify-between p-4 text-white/70 hover:bg-white/5 transition-colors"
                data-testid="button-change-password"
              >
                <span className="text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Alterar Senha
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="h-px bg-white/5" />
              <button 
                onClick={() => setShowLogoutDialog(true)}
                className="w-full flex items-center justify-between p-4 text-red-400 hover:bg-white/5 transition-colors" 
                data-testid="button-logout"
              >
                <span className="text-sm flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sair da Conta
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Card>
          </motion.div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-card border-white/10 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Alterar Senha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Senha Atual</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl pr-10"
                  data-testid="input-current-password"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Nova Senha</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl pr-10"
                  data-testid="input-new-password"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Confirmar Nova Senha</Label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-confirm-password"
              />
            </div>
            <Button 
              onClick={handlePasswordChange}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl mt-2"
              data-testid="button-confirm-password"
            >
              Confirmar Alteração
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-card border-white/10 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Sair da Conta</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <p className="text-white/70 text-sm mb-6">Tem certeza que deseja sair da sua conta?</p>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowLogoutDialog(false)}
                variant="outline"
                className="flex-1 h-11 border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                <X className="w-4 h-4 mr-2" /> Cancelar
              </Button>
              <Button 
                onClick={handleLogout}
                className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl"
                data-testid="button-confirm-logout"
              >
                <Check className="w-4 h-4 mr-2" /> Sair
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
