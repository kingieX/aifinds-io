import { AITool } from "@/types/tool";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

export default function ToolCard({ tool }: { tool: AITool }) {
  return (
    <Link
      href={`/tools/${tool.id}`} // assuming you’ll use this route format
      className="group block bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="w-full h-40 bg-muted relative">
        <Image
          src={tool.image}
          alt={tool.name}
          fill
          className="object-contain p-4 transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-muted-foreground">{tool.category}</p>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {tool.description}
        </p>

        <div className="flex justify-between items-center text-xs text-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <ArrowUpRight size={14} className="text-primary" />
            <span>{tool.upvotes} upvotes</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{format(new Date(tool.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
