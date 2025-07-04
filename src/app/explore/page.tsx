"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { mockTools } from "@/data/mockTools";
import { categories } from "@/data/categories";
import { tags } from "@/data/tags";
import ToolCard from "@/components/ToolCard";
import { AITool } from "@/types/tool";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");
  const selectedTags = searchParams.getAll("tag");
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";

  const filteredTools = useMemo(() => {
    return mockTools.filter((tool) => {
      const matchesCategory =
        !selectedCategory ||
        tool.categoryId?.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          tool.tags.map((t) => t.toLowerCase()).includes(tag)
        );

      const matchesSearch =
        !searchTerm ||
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesTags && matchesSearch;
    });
  }, [selectedCategory, selectedTags, searchTerm]);

  const updateQuery = (key: string, value: string, multi = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (multi) {
      const values = params.getAll(key);
      if (values.includes(value)) {
        params.delete(key);
        values.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
              Search
            </h3>
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (value) {
                  params.set("search", value);
                } else {
                  params.delete("search");
                }
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="w-full rounded border border-input px-3 py-2 text-sm bg-background"
              placeholder="Search tools..."
            />
          </div>

          {/* // Category and Tags Filters */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
              Category
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateQuery("category", cat.id)}
                  className={`text-sm text-left rounded px-3 py-1.5 transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tag */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => updateQuery("tag", tag.id, true)}
                  className={`text-xs rounded-full px-3 py-1 border ${
                    selectedTags.includes(tag.id)
                      ? "bg-primary text-primary-foreground border-transparent"
                      : "text-muted-foreground hover:bg-muted border-border"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Filtered Tools */}
        <main>
          <h1 className="text-2xl font-bold mb-6">Explore Tools</h1>
          {filteredTools.length === 0 ? (
            <p className="text-muted-foreground">
              No tools match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool: AITool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
