import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { Send, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatArea = ({ onSearchPrompts }: { onSearchPrompts?: (query: string) => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [promptToSave, setPromptToSave] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a simulated response. In a real application, this would be powered by an AI model.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInput("");
    onSearchPrompts?.("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Trigger search in prompt library as user types
    if (value.length > 2) {
      onSearchPrompts?.(value);
    } else {
      onSearchPrompts?.("");
    }
  };

  const handleSavePrompt = (content: string) => {
    setPromptToSave(content);
    setShowSaveDialog(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-1">
        {messages.length === 1 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-2xl px-4">
              <h1 className="text-4xl font-semibold mb-4 text-foreground">What can I help with?</h1>
              <p className="text-muted-foreground">
                Start a conversation or use the prompt library to get started
              </p>
            </div>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                onSave={message.role === "user" ? () => handleSavePrompt(message.content) : undefined}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message ChatGPT..."
              className="min-h-[60px] pr-12 resize-none"
            />
            <Button
              size="icon"
              className="absolute bottom-2 right-2"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {input.trim() && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => handleSavePrompt(input)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save prompt
            </Button>
          )}
        </div>
      </div>

      {/* Save Prompt Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Prompt</DialogTitle>
            <DialogDescription>Choose a category to save this prompt to.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {["Marketing", "Development", "Writing", "SEO"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Save logic here
                  setShowSaveDialog(false);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
