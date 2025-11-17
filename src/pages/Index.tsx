import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ChatArea } from "@/components/ChatArea";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [promptSearchQuery, setPromptSearchQuery] = useState("");

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
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar isOpen={leftSidebarOpen} />
        <ChatArea onSearchPrompts={setPromptSearchQuery} />
        <RightSidebar
          isOpen={rightSidebarOpen}
          searchQuery={promptSearchQuery}
          onAddPrompt={() => {
            // Add prompt logic
          }}
        />
      </div>
    </div>
  );
};

export default Index;
