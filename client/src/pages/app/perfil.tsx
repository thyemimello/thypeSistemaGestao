import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, MapPin, Building2, Briefcase, Save, LogOut, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MobileLayout from "@/components/layout/MobileLayout";

export default function Perfil() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    creci: "123456-F",
    imobiliaria: "Imobiliária Premium",
    endereco: "São Paulo, SP",
    cargo: "Corretor Senior"
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

  const handleSave = () => {
    console.log("Saving profile:", formData);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        <header className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-display font-bold text-white">Meu Perfil</h1>
          <p className="text-sm text-white/50 mt-1">Gerencie suas informações</p>
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
                  <Briefcase className="w-3 h-3" /> CRECI
                </Label>
                <Input
                  value={formData.creci}
                  onChange={(e) => handleInputChange("creci", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-creci"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Imobiliária
                </Label>
                <Input
                  value={formData.imobiliaria}
                  onChange={(e) => handleInputChange("imobiliaria", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-imobiliaria"
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

              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-2">
                  <User className="w-3 h-3" /> Cargo
                </Label>
                <Input
                  value={formData.cargo}
                  onChange={(e) => handleInputChange("cargo", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                  data-testid="input-cargo"
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
              className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
              data-testid="button-save-profile"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>

            <Card className="bg-card border-white/5 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 text-white/70 hover:bg-white/5 transition-colors">
                <span className="text-sm">Alterar Senha</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="h-px bg-white/5" />
              <button className="w-full flex items-center justify-between p-4 text-red-400 hover:bg-white/5 transition-colors" data-testid="button-logout">
                <span className="text-sm flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sair da Conta
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Card>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
}
