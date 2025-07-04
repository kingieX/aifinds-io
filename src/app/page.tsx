import { mockTools } from "@/data/mockTools";
import ToolCard from "@/components/ToolCard";
import { AITool } from "@/types/tool";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const featuredTools = mockTools.filter((tool) => tool.isFeatured);

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Discover AI Tools That Matter
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the best AI tools, models, and projects curated for
            developers, creators, and curious minds.
          </p>
        </div>

        {/* Category Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Chatbot",
            "Image",
            "Productivity",
            "Code",
            "Audio",
            "Research",
          ].map((category) => (
            <span
              key={category}
              className="bg-muted text-sm px-4 py-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Featured Tools */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredTools.map((tool: AITool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
