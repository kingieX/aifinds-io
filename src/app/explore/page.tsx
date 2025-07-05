"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { mockTools } from "@/data/mockTools";
import { categories } from "@/data/categories";
import { tags } from "@/data/tags";
import ToolCard from "@/components/ToolCard";
import { AITool } from "@/types/tool";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ToolCardSkeleton from "@/components/ToolCardSkeleton";

const TOOLS_PER_PAGE = 6;

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");
  const selectedTags = searchParams.getAll("tag");
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";
  const sort = searchParams.get("sort") || "name";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate 1s delay

    return () => clearTimeout(timeout);
  }, []);

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

  const sortedTools = useMemo(() => {
    switch (sort) {
      case "newest":
        return [...filteredTools].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
      case "popular":
        return [...filteredTools].sort(
          (a, b) => (b.upvotes || 0) - (a.upvotes || 0)
        );
      case "name":
      default:
        return [...filteredTools].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredTools, sort]);

  const totalPages = Math.ceil(sortedTools.length / TOOLS_PER_PAGE);
  const paginatedTools = sortedTools.slice(
    (page - 1) * TOOLS_PER_PAGE,
    page * TOOLS_PER_PAGE
  );

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

    // Reset to first page when filters change
    params.delete("page");

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
                params.delete("page");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="w-full rounded border border-input px-3 py-2 text-sm bg-background"
              placeholder="Search tools..."
            />
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
              Category
            </h3>
            <div className="flex flex-col gap-2">
              {/* All category */}
              <button
                onClick={() => updateQuery("category", "")}
                className={`text-sm text-left rounded px-3 py-1.5 transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                All Categories
              </button>
              {/* other catgories */}
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

          {/* Tag Filter */}
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
          {/* Header + Sort */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h1 className="text-2xl font-bold">Explore Tools</h1>
            <select
              value={sort}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", e.target.value);
                params.delete("page");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="px-3 py-2 border rounded text-sm bg-background"
            >
              <option value="name">Sort: Name</option>
              <option value="newest">Sort: Newest</option>
              <option value="popular">Sort: Popular</option>
            </select>
          </div>

          {paginatedTools.length === 0 ? (
            <p className="text-muted-foreground">
              No tools match your filters.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? [...Array(6)].map((_, i) => <ToolCardSkeleton key={i} />)
                  : paginatedTools.map((tool: AITool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}

                {/* {paginatedTools.map((tool: AITool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))} */}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", String(page - 1));
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                    className="text-sm px-4 py-2 rounded border bg-muted text-muted-foreground disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", String(page + 1));
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                    className="text-sm px-4 py-2 rounded border bg-muted text-muted-foreground disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
