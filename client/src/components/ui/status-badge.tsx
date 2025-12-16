
import { cn } from "@/lib/utils";

type BadgeType = 'classification' | 'relationship' | 'status';

interface StatusBadgeProps {
  value: string;
  type?: BadgeType;
  className?: string;
}

export function StatusBadge({ value, type = 'status', className }: StatusBadgeProps) {
  const getStyles = (val: string, t: BadgeType) => {
    const v = val.toLowerCase();
    
    if (t === 'classification') {
      if (v === 'ouro') return "bg-amber-100 text-amber-700 border-amber-200";
      if (v === 'prata') return "bg-slate-100 text-slate-600 border-slate-200";
      if (v === 'bronze') return "bg-orange-100 text-orange-700 border-orange-200";
    }
    
    if (t === 'relationship') {
      if (v === 'frio') return "bg-blue-100 text-blue-700 border-blue-200";
      if (v === 'morno') return "bg-yellow-100 text-yellow-700 border-yellow-200";
      if (v === 'quente') return "bg-orange-100 text-orange-600 border-orange-200";
      if (v === 'estratégico') return "bg-purple-100 text-purple-700 border-purple-200";
    }

    if (t === 'status') {
      if (v === 'ativo') return "bg-emerald-100 text-emerald-700 border-emerald-200";
      if (v === 'inativo') return "bg-rose-100 text-rose-700 border-rose-200";
    }

    return "bg-secondary text-muted-foreground border-border";
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-semibold border inline-flex items-center justify-center min-w-[60px]",
      getStyles(value, type),
      className
    )}>
      {value}
    </span>
  );
}
