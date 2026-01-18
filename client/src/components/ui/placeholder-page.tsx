
import MobileLayout from "@/components/layout/MobileLayout";

export default function PlaceholderPage() {
  return (
    <MobileLayout>
      <div className="h-[80vh] flex flex-col items-center justify-center p-6 text-center opacity-50">
        <h2 className="text-xl font-display font-bold text-white mb-2">Em Breve</h2>
        <p className="text-sm text-muted-foreground">Esta funcionalidade estará disponível na próxima atualização.</p>
      </div>
    </MobileLayout>
  );
}
