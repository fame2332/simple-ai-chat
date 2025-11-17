import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareLibraryTab } from "./ShareLibraryTab";
import { ManageLibrariesTab } from "./ManageLibrariesTab";
import { Library, SharedLink } from "@/types/library";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  libraries: Library[];
  sharedLinks: SharedLink[];
  onUpdateLibraries: (libraries: Library[]) => void;
  onUpdateSharedLinks: (links: SharedLink[]) => void;
}

export const SettingsDialog = ({
  open,
  onOpenChange,
  libraries,
  sharedLinks,
  onUpdateLibraries,
  onUpdateSharedLinks,
}: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share Library</TabsTrigger>
            <TabsTrigger value="manage">Manage Libraries</TabsTrigger>
          </TabsList>
          <TabsContent value="share" className="space-y-4">
            <ShareLibraryTab
              libraries={libraries}
              sharedLinks={sharedLinks}
              onUpdateSharedLinks={onUpdateSharedLinks}
            />
          </TabsContent>
          <TabsContent value="manage" className="space-y-4">
            <ManageLibrariesTab
              libraries={libraries}
              onUpdateLibraries={onUpdateLibraries}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
