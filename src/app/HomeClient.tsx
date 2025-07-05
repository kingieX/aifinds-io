/* eslint-disable @next/next/no-img-element */
"use client";
import { mockTools } from "@/data/mockTools";
import ToolCard from "@/components/ToolCard";
import { AITool } from "@/types/tool";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { categories } from "@/data/categories";
import { useMemo, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ToolCardSkeleton from "@/components/ToolCardSkeleton";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  // loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate 1s delay

    return () => clearTimeout(timeout);
  }, []);

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
      <section className="max-w-8xl  py-0 space-y-12">
        <section className="relative text-center space-y-6 px-4 py-20 md:py-32 overflow-hidden">
          <img
            src="/bg/ai-hero1.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              data-aos="fade-up"
            >
              Discover AI Tools That Matter
            </h1>
            <p
              className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Explore the best AI tools, models, and projects curated for
              developers, creators, and curious minds.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <a
                href="/explore"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium"
              >
                Explore Tools →
              </a>
              <a
                href="/submit"
                className="border border-border px-6 py-3 rounded-md text-sm font-medium"
              >
                Submit a Tool
              </a>
            </div>
          </div>
        </section>

        {/* Category Section */}
        {/* Category Filter Section */}
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-3">
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
        <div className="max-w-6xl mx-auto px-4">
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
              {loading
                ? [...Array(6)].map((_, i) => <ToolCardSkeleton key={i} />)
                : filteredTools.map((tool: AITool) => (
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
