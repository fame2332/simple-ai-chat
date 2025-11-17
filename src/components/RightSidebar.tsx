import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prompt {
  id: string;
  title: string;
  content: string;
}

interface Category {
  id: string;
  name: string;
  prompts: Prompt[];
  subcategories?: Category[];
}

export const RightSidebar = ({
  isOpen,
  searchQuery,
  onAddPrompt,
}: {
  isOpen: boolean;
  searchQuery?: string;
  onAddPrompt?: () => void;
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["marketing"])
  );

  const categories: Category[] = [
    {
      id: "marketing",
      name: "Marketing",
      prompts: [
        { id: "m1", title: "Social Media Post", content: "Create an engaging social media post about..." },
        { id: "m2", title: "Email Campaign", content: "Write a compelling email campaign for..." },
      ],
      subcategories: [
        {
          id: "seo",
          name: "SEO",
          prompts: [
            { id: "s1", title: "Meta Description", content: "Generate SEO meta description for..." },
            { id: "s2", title: "Blog Outline", content: "Create an SEO-optimized blog outline for..." },
          ],
        },
      ],
    },
    {
      id: "development",
      name: "Development",
      prompts: [
        { id: "d1", title: "Code Review", content: "Review this code and suggest improvements..." },
        { id: "d2", title: "Bug Fix", content: "Help me debug this issue..." },
      ],
    },
    {
      id: "writing",
      name: "Writing",
      prompts: [
        { id: "w1", title: "Blog Post", content: "Write a blog post about..." },
        { id: "w2", title: "Product Description", content: "Create a product description for..." },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const filterPrompts = (query: string) => {
    if (!query) return categories;
    const lowerQuery = query.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        prompts: cat.prompts.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.content.toLowerCase().includes(lowerQuery)
        ),
        subcategories: cat.subcategories
          ?.map((sub) => ({
            ...sub,
            prompts: sub.prompts.filter(
              (p) =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.content.toLowerCase().includes(lowerQuery)
            ),
          }))
          .filter((sub) => sub.prompts.length > 0),
      }))
      .filter((cat) => cat.prompts.length > 0 || (cat.subcategories && cat.subcategories.length > 0));
  };

  const displayCategories = filterPrompts(searchQuery || searchInput);

  const CategoryNode = ({ category, level = 0 }: { category: Category; level?: number }) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasContent = category.prompts.length > 0 || (category.subcategories && category.subcategories.length > 0);

    return (
      <div className="mb-2">
        <button
          onClick={() => toggleCategory(category.id)}
          className="flex items-center w-full px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors"
          style={{ paddingLeft: `${8 + level * 12}px` }}
        >
          {hasContent && (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
            </>
          )}
          {category.name}
        </button>

        {isExpanded && (
          <div>
            {category.prompts.map((prompt) => (
              <button
                key={prompt.id}
                className="w-full px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors text-left"
                style={{ paddingLeft: `${20 + level * 12}px` }}
              >
                <p className="font-medium truncate">{prompt.title}</p>
                <p className="text-xs text-muted-foreground truncate">{prompt.content}</p>
              </button>
            ))}
            {category.subcategories?.map((sub) => (
              <CategoryNode key={sub.id} category={sub} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "h-full bg-sidebar border-l border-sidebar-border transition-all duration-200",
        isOpen ? "w-72" : "w-0"
      )}
    >
      <div className={cn("h-full overflow-hidden", !isOpen && "invisible")}>
        <div className="p-3 border-b border-sidebar-border space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={onAddPrompt}>
            <Plus className="h-4 w-4 mr-2" />
            Add Prompt
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {displayCategories.map((category) => (
              <CategoryNode key={category.id} category={category} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
