import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface GPT {
  id: string;
  name: string;
  description: string;
}

export const LeftSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const [chatsExpanded, setChatsExpanded] = useState(true);
  const [gptsExpanded, setGptsExpanded] = useState(false);

  const recentChats: Chat[] = [
    { id: "1", title: "Marketing strategy discussion", timestamp: "2 hours ago" },
    { id: "2", title: "Code review assistance", timestamp: "Yesterday" },
    { id: "3", title: "Content ideas brainstorm", timestamp: "2 days ago" },
  ];

  const customGPTs: GPT[] = [
    { id: "1", name: "Marketing Pro", description: "Expert in digital marketing" },
    { id: "2", name: "Code Assistant", description: "Programming help" },
    { id: "3", name: "Content Writer", description: "Creative writing aid" },
  ];

  return (
    <div
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border transition-all duration-200",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className={cn("h-full overflow-hidden", !isOpen && "invisible")}>
        <div className="p-3 border-b border-sidebar-border">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-60px)]">
          <div className="p-2">
            {/* Recent Chats Section */}
            <div className="mb-4">
              <button
                onClick={() => setChatsExpanded(!chatsExpanded)}
                className="flex items-center w-full px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors"
              >
                {chatsExpanded ? (
                  <ChevronDown className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1" />
                )}
                Recent Chats
              </button>
              {chatsExpanded && (
                <div className="mt-1 space-y-1">
                  {recentChats.map((chat) => (
                    <button
                      key={chat.id}
                      className="flex items-start w-full px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors text-left"
                    >
                      <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{chat.title}</p>
                        <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom GPTs Section */}
            <div>
              <button
                onClick={() => setGptsExpanded(!gptsExpanded)}
                className="flex items-center w-full px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors"
              >
                {gptsExpanded ? (
                  <ChevronDown className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1" />
                )}
                Custom GPTs
              </button>
              {gptsExpanded && (
                <div className="mt-1 space-y-1">
                  {customGPTs.map((gpt) => (
                    <button
                      key={gpt.id}
                      className="flex flex-col items-start w-full px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors text-left"
                    >
                      <p className="font-medium">{gpt.name}</p>
                      <p className="text-xs text-muted-foreground">{gpt.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
