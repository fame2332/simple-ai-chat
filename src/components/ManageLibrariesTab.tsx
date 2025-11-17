import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Library, Category } from "@/types/library";
import { Plus, Library as LibraryIcon, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManageLibrariesTabProps {
  libraries: Library[];
  onUpdateLibraries: (libraries: Library[]) => void;
}

export const ManageLibrariesTab = ({
  libraries,
  onUpdateLibraries,
}: ManageLibrariesTabProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [libraryUrl, setLibraryUrl] = useState("");
  const { toast } = useToast();

  const addLibrary = () => {
    if (!libraryUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid library URL",
        variant: "destructive",
      });
      return;
    }

    // Simulate adding a library from URL
    const libraryNames = [
      "Community Marketing Pack",
      "Developer Toolkit",
      "Creative Writing Suite",
      "Business Templates",
    ];
    const randomName =
      libraryNames[Math.floor(Math.random() * libraryNames.length)];

    const newLibrary: Library = {
      id: Date.now().toString(),
      name: randomName,
      isOwned: false,
      isActive: true,
      categories: [
        {
          id: `ext-${Date.now()}-1`,
          name: "Sample Category",
          prompts: [
            {
              id: `p-${Date.now()}`,
              title: "Sample Prompt",
              content: "This is a sample prompt from an external library",
            },
          ],
        },
      ],
    };

    onUpdateLibraries([...libraries, newLibrary]);
    setShowAddDialog(false);
    setLibraryUrl("");

    toast({
      title: "Library added",
      description: `${randomName} has been added to your libraries`,
    });
  };

  const toggleLibrary = (libraryId: string) => {
    onUpdateLibraries(
      libraries.map((lib) =>
        lib.id === libraryId ? { ...lib, isActive: !lib.isActive } : lib
      )
    );
  };

  const removeLibrary = (libraryId: string) => {
    onUpdateLibraries(libraries.filter((lib) => lib.id !== libraryId));
    toast({
      title: "Library removed",
      description: "The library has been removed from your account",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Add and manage your prompt libraries
        </p>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Library
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {libraries.map((library) => (
            <Card key={library.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <LibraryIcon className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{library.name}</h4>
                      {library.isOwned && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Your Library
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {library.categories.length} categories
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={library.isActive}
                      onCheckedChange={() => toggleLibrary(library.id)}
                    />
                    <Label className="text-sm">
                      {library.isActive ? "Active" : "Inactive"}
                    </Label>
                  </div>
                  {!library.isOwned && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLibrary(library.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Add Library Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Library</DialogTitle>
            <DialogDescription>
              Paste a share link to add a library to your account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="library-url">Library Share Link</Label>
              <Input
                id="library-url"
                placeholder="https://app.example.com/library/share/..."
                value={libraryUrl}
                onChange={(e) => setLibraryUrl(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addLibrary}>Add Library</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
