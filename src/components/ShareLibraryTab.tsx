import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Library, SharedLink, Category } from "@/types/library";
import { Plus, Copy, Trash2, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareLibraryTabProps {
  libraries: Library[];
  sharedLinks: SharedLink[];
  onUpdateSharedLinks: (links: SharedLink[]) => void;
}

export const ShareLibraryTab = ({
  libraries,
  sharedLinks,
  onUpdateSharedLinks,
}: ShareLibraryTabProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const ownedLibrary = libraries.find((lib) => lib.isOwned);

  const getAllCategoryIds = (categories: Category[]): string[] => {
    let ids: string[] = [];
    categories.forEach((cat) => {
      ids.push(cat.id);
      if (cat.subcategories) {
        ids = ids.concat(getAllCategoryIds(cat.subcategories));
      }
    });
    return ids;
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const createShareLink = () => {
    if (!linkName.trim() || selectedCategories.size === 0) {
      toast({
        title: "Error",
        description: "Please provide a name and select at least one category",
        variant: "destructive",
      });
      return;
    }

    const newLink: SharedLink = {
      id: Date.now().toString(),
      url: `https://app.example.com/library/share/${Date.now()}`,
      name: linkName,
      createdAt: new Date().toISOString(),
      addedCount: Math.floor(Math.random() * 50), // Simulated count
      selectedCategories: Array.from(selectedCategories),
    };

    onUpdateSharedLinks([...sharedLinks, newLink]);
    setShowCreateDialog(false);
    setLinkName("");
    setSelectedCategories(new Set());

    toast({
      title: "Share link created",
      description: "Your library share link has been created successfully",
    });
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };

  const deleteLink = (id: string) => {
    onUpdateSharedLinks(sharedLinks.filter((link) => link.id !== id));
    toast({
      title: "Deleted",
      description: "Share link has been removed",
    });
  };

  const CategoryCheckbox = ({ category, level = 0 }: { category: Category; level?: number }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2" style={{ paddingLeft: `${level * 16}px` }}>
          <Checkbox
            id={category.id}
            checked={selectedCategories.has(category.id)}
            onCheckedChange={() => toggleCategory(category.id)}
          />
          <Label htmlFor={category.id} className="cursor-pointer">
            {category.name}
          </Label>
        </div>
        {category.subcategories?.map((sub) => (
          <CategoryCheckbox key={sub.id} category={sub} level={level + 1} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Create and manage share links for your prompt library
        </p>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Share Link
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {sharedLinks.map((link) => (
            <Card key={link.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{link.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyLink(link.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{link.addedCount} people added this library</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                  <ExternalLink className="h-4 w-4" />
                  <code className="flex-1 truncate">{link.url}</code>
                </div>

                <div className="text-xs text-muted-foreground">
                  Shared categories: {link.selectedCategories.length}
                </div>
              </div>
            </Card>
          ))}

          {sharedLinks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No share links created yet
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Create Share Link Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Share Link</DialogTitle>
            <DialogDescription>
              Select which categories you want to share
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-name">Link Name</Label>
              <Input
                id="link-name"
                placeholder="e.g., Marketing Prompts"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Categories</Label>
              <ScrollArea className="h-[200px] border rounded p-3">
                <div className="space-y-2">
                  {ownedLibrary?.categories.map((category) => (
                    <CategoryCheckbox key={category.id} category={category} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createShareLink}>Create Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
