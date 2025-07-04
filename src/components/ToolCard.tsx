import { AITool } from "@/types/tool";
import Image from "next/image";
import Link from "next/link";

export default function ToolCard({ tool }: { tool: AITool }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-3">
        <Image
          src={tool.image}
          alt={tool.name}
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{tool.name}</h3>
          <p className="text-xs text-muted-foreground">{tool.category}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {tool.description}
      </p>
      <Link
        href={tool.website}
        target="_blank"
        className="text-primary text-sm font-medium hover:underline"
      >
        Visit Website &rarr;
      </Link>
    </div>
  );
}
