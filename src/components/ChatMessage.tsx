import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSave?: () => void;
}

export const ChatMessage = ({ role, content, onSave }: ChatMessageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group py-6 px-4 ${
        role === "user" ? "bg-chat-user" : "bg-chat-assistant"
      } transition-colors`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-3xl mx-auto relative">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {role === "user" ? "U" : "A"}
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
        {isHovered && onSave && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        )}
      </div>
    </div>
  );
};
