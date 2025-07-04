"use client";
import { mockTools } from "@/data/mockTools";
import ToolCard from "@/components/ToolCard";
import { AITool } from "@/types/tool";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { categories } from "@/data/categories";
import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // const filteredTools = selectedCategory
  //   ? mockTools.filter(
  //       (tool) => tool.categoryId?.toLowerCase() === selectedCategory
  //     )
  //   : mockTools;

  const filteredTools = useMemo(() => {
    if (!selectedCategory) return mockTools;
    return mockTools.filter(
      (tool) =>
        tool.categoryId?.toLowerCase().replace(/\s+/g, "-") === selectedCategory
    );
  }, [selectedCategory]);

  // const handleCategoryClick = (id: string) => {
  //   setSelectedCategory((prev) => (prev === id ? null : id));
  // };

  const handleCategoryClick = (categoryId: string) => {
    const isSelected = selectedCategory === categoryId;
    const params = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

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
        {/* Category Filter Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`text-sm px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
          {selectedCategory && (
            <button
              // onClick={() => setSelectedCategory(null)}
              onClick={() => handleCategoryClick(selectedCategory)}
              className="text-sm px-4 py-2 rounded-full bg-destructive text-white hover:opacity-90 transition"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Featured Tools */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCategory
              ? `Tools in "${
                  categories.find((c) => c.id === selectedCategory)?.name
                }"`
              : "Featured Tools"}
          </h2>
          {filteredTools.length === 0 ? (
            <p className="text-muted-foreground">
              No tools found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredTools.map((tool: AITool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
