
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
      <Card className="w-full max-w-md mx-4 bg-white/5 border-white/10">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <AlertCircle className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-2xl font-bold font-display mb-2">Página não encontrada</h1>
          <p className="text-sm text-muted-foreground">
            O recurso que você procura não está disponível.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
