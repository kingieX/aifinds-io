import { mockTools } from "@/data/mockTools";
import { AITool } from "@/types/tool";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";

export default async function ToolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tool: AITool | undefined = mockTools.find((t) => t.id === params.id);

  if (!tool) return notFound();

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
          <div className="relative w-20 h-20 rounded-xl bg-muted overflow-hidden">
            <Image
              src={tool.image}
              alt={tool.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {tool.category}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-6">
          <p className="text-muted-foreground text-base leading-relaxed">
            {tool.description}
          </p>

          {Array.isArray(tool.features) && tool.features.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {tool.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(tool.useCases) && tool.useCases.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {tool.useCases.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-muted text-xs px-3 py-1 rounded-full text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              Created on: {format(new Date(tool.createdAt), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight size={16} />
              {tool.upvotes} upvotes
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Link
            href={tool.website}
            target="_blank"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            Visit Website →
          </Link>
          {tool.github && (
            <Link
              href={tool.github}
              target="_blank"
              className="border border-border px-5 py-2 rounded-md text-sm font-medium hover:bg-muted flex items-center gap-2"
            >
              <Github size={16} />
              GitHub Repo
            </Link>
          )}
        </div>

        {/* Related Tools */}
        <RelatedTools currentTool={tool} tools={mockTools} />
      </div>
      <Footer />
    </>
  );
}
