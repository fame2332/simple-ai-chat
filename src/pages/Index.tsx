import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Settings } from "lucide-react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SettingsDialog } from "@/components/SettingsDialog";
import { Library, SharedLink } from "@/types/library";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [promptSearchQuery, setPromptSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [libraries, setLibraries] = useState<Library[]>([
    {
      id: "1",
      name: "My Library",
      isOwned: true,
      isActive: true,
      categories: [
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
      ],
    },
  ]);

  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-12 border-b border-border bg-background flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          >
            {leftSidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-lg font-semibold">ChatGPT</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          >
            {rightSidebarOpen ? (
              <PanelRightClose className="h-5 w-5" />
            ) : (
              <PanelRightOpen className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar isOpen={leftSidebarOpen} />
        <ChatArea onSearchPrompts={setPromptSearchQuery} />
        <RightSidebar
          isOpen={rightSidebarOpen}
          searchQuery={promptSearchQuery}
          libraries={libraries}
          onAddPrompt={() => {
            // Add prompt logic
          }}
        />
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        libraries={libraries}
        sharedLinks={sharedLinks}
        onUpdateLibraries={setLibraries}
        onUpdateSharedLinks={setSharedLinks}
      />
    </div>
  );
};

export default Index;
