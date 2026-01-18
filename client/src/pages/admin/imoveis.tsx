import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Building2, MapPin, Users, TrendingUp, X, Upload, Image, Calendar, DollarSign, Home, Layers, FileText, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/layout/MobileLayout";

interface Imovel {
  id: number;
  name: string;
  location: string;
  units: number;
  sold: number;
  status: string;
  price: string;
}

export default function AdminImoveis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showCadastro, setShowCadastro] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "SP",
    status: "Lançamento",
    tipo: "Residencial",
    totalUnidades: "",
    precoMinimo: "",
    previsaoEntrega: "",
    descricao: "",
    dormitorios: "",
    metragemMin: "",
    metragemMax: "",
    vagas: "",
    diferenciais: ""
  });

  const [imoveis, setImoveis] = useState<Imovel[]>([
    { id: 1, name: "POSH Residence", location: "Jardins, SP", units: 48, sold: 32, status: "Lançamento", price: "R$ 4.2M" },
    { id: 2, name: "Aurum Tower", location: "Vila Nova, SP", units: 120, sold: 98, status: "Em obras", price: "R$ 2.4M" },
    { id: 3, name: "Legacy Mansion", location: "Morumbi, SP", units: 24, sold: 24, status: "Pronto", price: "R$ 5.8M" },
    { id: 4, name: "VPR Corporate", location: "Faria Lima, SP", units: 200, sold: 145, status: "Em obras", price: "Sob Consulta" },
    { id: 5, name: "Sky Blue Tower", location: "Pinheiros, SP", units: 80, sold: 15, status: "Lançamento", price: "R$ 1.8M" },
  ]);

  const filteredImoveis = imoveis.filter(im => {
    const matchesSearch = im.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         im.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || im.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Lançamento": return "bg-primary/20 text-primary border-primary/30";
      case "Em obras": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Pronto": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).slice(0, 5).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === Math.min(files.length, 5)) {
            setImagesPreview(prev => [...prev, ...newPreviews].slice(0, 10));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.endereco || !formData.cidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, endereço e cidade.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newImovel: Imovel = {
      id: imoveis.length + 1,
      name: formData.nome,
      location: `${formData.cidade}, ${formData.estado}`,
      units: parseInt(formData.totalUnidades) || 0,
      sold: 0,
      status: formData.status,
      price: formData.precoMinimo ? `R$ ${formData.precoMinimo}` : "Sob Consulta"
    };

    setImoveis(prev => [newImovel, ...prev]);
    setSaving(false);
    setShowCadastro(false);
    setFormData({
      nome: "", endereco: "", cidade: "", estado: "SP", status: "Lançamento",
      tipo: "Residencial", totalUnidades: "", precoMinimo: "", previsaoEntrega: "",
      descricao: "", dormitorios: "", metragemMin: "", metragemMax: "", vagas: "", diferenciais: ""
    });
    setLogoPreview(null);
    setImagesPreview([]);

    toast({
      title: "Empreendimento cadastrado!",
      description: `${newImovel.name} foi adicionado com sucesso.`,
    });
  };

  const resetForm = () => {
    setShowCadastro(false);
    setFormData({
      nome: "", endereco: "", cidade: "", estado: "SP", status: "Lançamento",
      tipo: "Residencial", totalUnidades: "", precoMinimo: "", previsaoEntrega: "",
      descricao: "", dormitorios: "", metragemMin: "", metragemMax: "", vagas: "", diferenciais: ""
    });
    setLogoPreview(null);
    setImagesPreview([]);
  };

  return (
    <MobileLayout role="admin">
      <div className="min-h-screen bg-background pb-8">
        <header className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-display font-bold text-white">Imóveis</h1>
            <Button 
              size="sm" 
              className="h-9 bg-primary hover:bg-primary/90 text-black"
              onClick={() => setShowCadastro(true)}
              data-testid="button-novo-imovel"
            >
              <Plus className="w-4 h-4 mr-1" /> Novo
            </Button>
          </div>
          <p className="text-sm text-white/50">Gestão de empreendimentos</p>
        </header>

        <div className="px-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Buscar imóvel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white h-11 rounded-xl"
              data-testid="input-search-imoveis"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={filterStatus === null ? "default" : "ghost"}
              className={`text-xs ${filterStatus === null ? "bg-primary text-black" : "text-white/60"}`}
              onClick={() => setFilterStatus(null)}
            >
              Todos
            </Button>
            {["Lançamento", "Em obras", "Pronto"].map(status => (
              <Button
                key={status}
                size="sm"
                variant={filterStatus === status ? "default" : "ghost"}
                className={`text-xs ${filterStatus === status ? "bg-primary text-black" : "text-white/60"}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{imoveis.length}</p>
                <p className="text-[10px] text-primary/80 uppercase">Empreendimentos</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">
                  {Math.round(imoveis.reduce((acc, im) => acc + (im.sold / im.units) * 100, 0) / imoveis.length)}%
                </p>
                <p className="text-[10px] text-white/50 uppercase">Média Vendas</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {filteredImoveis.map((imovel, index) => (
              <motion.div
                key={imovel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card border-white/5 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{imovel.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {imovel.location}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(imovel.status)} text-[10px] border`}>
                        {imovel.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white/50">
                          <Users className="w-3 h-3 inline mr-1" />
                          {imovel.sold}/{imovel.units} unidades
                        </span>
                      </div>
                      <span className="text-primary font-semibold">{imovel.price}</span>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(imovel.sold / imovel.units) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/40 mt-1 text-right">
                      {Math.round((imovel.sold / imovel.units) * 100)}% vendido
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
        <DialogContent className="bg-card border-white/10 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Cadastrar Empreendimento
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 pt-2">
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-white/30 mb-2" />
                  <p className="text-xs text-white/40">Logo do Empreendimento</p>
                </>
              )}
              <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
            </div>

            <Card className="bg-white/5 border-white/10 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Dados Principais</h3>
              
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Nome do Empreendimento *
                </Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Ex: POSH Residence"
                  className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  data-testid="input-nome-imovel"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Status</Label>
                  <Select value={formData.status} onValueChange={(v) => handleInputChange("status", v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-10 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="Lançamento">Lançamento</SelectItem>
                      <SelectItem value="Em obras">Em obras</SelectItem>
                      <SelectItem value="Pronto">Pronto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(v) => handleInputChange("tipo", v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-10 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="Residencial">Residencial</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Loteamento">Loteamento</SelectItem>
                      <SelectItem value="Misto">Misto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Localização</h3>
              
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Endereço *
                </Label>
                <Input
                  value={formData.endereco}
                  onChange={(e) => handleInputChange("endereco", e.target.value)}
                  placeholder="Rua, número, bairro"
                  className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  data-testid="input-endereco-imovel"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Cidade *</Label>
                  <Input
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    placeholder="São Paulo"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                    data-testid="input-cidade-imovel"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Estado</Label>
                  <Select value={formData.estado} onValueChange={(v) => handleInputChange("estado", v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-10 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      {["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "GO", "DF", "ES", "PE", "CE"].map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Características</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-white/50 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Total Unidades
                  </Label>
                  <Input
                    type="number"
                    value={formData.totalUnidades}
                    onChange={(e) => handleInputChange("totalUnidades", e.target.value)}
                    placeholder="48"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-white/50 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Preço Mínimo
                  </Label>
                  <Input
                    value={formData.precoMinimo}
                    onChange={(e) => handleInputChange("precoMinimo", e.target.value)}
                    placeholder="1.500.000"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-white/50 flex items-center gap-1">
                    <Home className="w-3 h-3" /> Dormitórios
                  </Label>
                  <Input
                    value={formData.dormitorios}
                    onChange={(e) => handleInputChange("dormitorios", e.target.value)}
                    placeholder="2 a 4"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-white/50 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Previsão Entrega
                  </Label>
                  <Input
                    value={formData.previsaoEntrega}
                    onChange={(e) => handleInputChange("previsaoEntrega", e.target.value)}
                    placeholder="Dez/2026"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Metragem (m²)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.metragemMin}
                      onChange={(e) => handleInputChange("metragemMin", e.target.value)}
                      placeholder="Min"
                      className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                    />
                    <Input
                      value={formData.metragemMax}
                      onChange={(e) => handleInputChange("metragemMax", e.target.value)}
                      placeholder="Max"
                      className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-white/50">Vagas</Label>
                  <Input
                    value={formData.vagas}
                    onChange={(e) => handleInputChange("vagas", e.target.value)}
                    placeholder="2 a 4"
                    className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Descrição</h3>
              
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Sobre o Empreendimento
                </Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => handleInputChange("descricao", e.target.value)}
                  placeholder="Descreva os principais atrativos do empreendimento..."
                  className="bg-white/5 border-white/10 text-white rounded-lg min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-white/50">Diferenciais</Label>
                <Input
                  value={formData.diferenciais}
                  onChange={(e) => handleInputChange("diferenciais", e.target.value)}
                  placeholder="Piscina, Academia, Salão de Festas..."
                  className="bg-white/5 border-white/10 text-white h-10 rounded-lg"
                />
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <Image className="w-3 h-3" /> Galeria de Imagens
              </h3>
              
              <div 
                onClick={() => imagesInputRef.current?.click()}
                className="w-full py-4 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Upload className="w-5 h-5 text-white/30 mb-1" />
                <p className="text-xs text-white/40">Adicionar imagens (até 10)</p>
                <input ref={imagesInputRef} type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
              </div>

              {imagesPreview.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {imagesPreview.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden relative group">
                      <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setImagesPreview(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={resetForm}
                variant="outline"
                className="flex-1 h-11 border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
                data-testid="button-salvar-imovel"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Cadastrar
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
