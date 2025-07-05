import { AITool } from "@/types/tool";
import ToolCard from "./ToolCard";

interface RelatedToolsProps {
  currentTool: AITool;
  tools: AITool[];
}

export default function RelatedTools({
  currentTool,
  tools,
}: RelatedToolsProps) {
  const related = tools.filter(
    (tool) =>
      tool.id !== currentTool.id &&
      (tool.categoryId === currentTool.categoryId ||
        tool.tags.some((tag) => currentTool.tags.includes(tag)))
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.slice(0, 6).map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
