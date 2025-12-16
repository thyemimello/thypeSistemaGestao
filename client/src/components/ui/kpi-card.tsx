
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: LucideIcon;
  className?: string;
}

export function KPICard({ title, value, subValue, trend, trendValue, icon: Icon, className }: KPICardProps) {
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl relative overflow-hidden group hover:bg-card/80 transition-all duration-300",
      className
    )}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {Icon && <Icon className="w-16 h-16 text-primary" />}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
          {Icon && <Icon className="w-5 h-5 text-primary/80" />}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-foreground">{value}</span>
          {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
        </div>

        {(trend || trendValue) && (
          <div className="mt-4 flex items-center gap-2 text-xs font-medium">
            {trend === 'up' && (
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                ↑ {trendValue}
              </span>
            )}
            {trend === 'down' && (
              <span className="text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                ↓ {trendValue}
              </span>
            )}
            {trend === 'neutral' && (
              <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                → {trendValue}
              </span>
            )}
            <span className="text-muted-foreground/60 ml-1">vs. mês anterior</span>
          </div>
        )}
      </div>
    </div>
  );
}
