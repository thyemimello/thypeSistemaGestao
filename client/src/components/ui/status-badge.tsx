
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
      if (v === 'ouro') return "bg-amber-400/10 text-amber-400 border-amber-400/20";
      if (v === 'prata') return "bg-slate-300/10 text-slate-300 border-slate-300/20";
      if (v === 'bronze') return "bg-orange-700/10 text-orange-600 border-orange-700/20";
    }
    
    if (t === 'relationship') {
      if (v === 'frio') return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      if (v === 'morno') return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      if (v === 'quente') return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      if (v === 'estratégico') return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    }

    if (t === 'status') {
      if (v === 'ativo') return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      if (v === 'inativo') return "bg-destructive/10 text-destructive border-destructive/20";
    }

    return "bg-muted text-muted-foreground border-border";
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
