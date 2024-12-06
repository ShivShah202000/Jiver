"use client";
import { toast } from "sonner";
import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import CardSkeleton from "./ui/cardSkeleton";
import SpacesCard from "./SpacesCard";
import { Music2, Plus } from "lucide-react";

interface Space {
  endTime?: Date | null;
  hostId: string;
  id: string;
  isActive: boolean;
  name: string;
  startTime: Date | null;
}

export default function HomeView() {
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/spaces", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch spaces");
        }

        const fetchedSpaces: Space[] = data.spaces;
        setSpaces(fetchedSpaces);
      } catch (error) {
        toast.error("Error fetching spaces");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  const handleCreateSpace = async () => {
    if (!spaceName.trim()) {
      toast.error("Please enter a space name");
      return;
    }

    setIsCreateSpaceOpen(false);
    try {
      const response = await fetch(`/api/spaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spaceName: spaceName,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create space");
      }

      const newSpace = data.space;
      setSpaces((prev) => {
        const updatedSpaces: Space[] = prev ? [...prev, newSpace] : [newSpace];
        return updatedSpaces;
      });
      toast.success(data.message);
      setSpaceName("");
    } catch (error: any) {
      toast.error(error.message || "Error Creating Space");
    }
  };

  const handleDeleteSpace = async (spaceId: string) => {
    try {
      const response = await fetch(`/api/spaces/?spaceId=${spaceId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete space");
      }
      setSpaces((prev) => {
        const updatedSpaces: Space[] = prev
          ? prev.filter((space) => space.id !== spaceId)
          : [];
        return updatedSpaces;
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message || "Error Deleting Space");
    }
  };

  const renderSpaces = useMemo(() => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="w-full">
              <CardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (!spaces?.length) {
      return (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Music2 className="h-16 w-16 text-pink-500/50" />
          <h3 className="text-xl font-semibold text-pink-200">No Spaces Yet</h3>
          <p className="text-pink-200/70">Create your first space to get started!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {spaces.map((space) => (
          <SpacesCard
            key={space.id}
            space={space}
            handleDeleteSpace={handleDeleteSpace}
          />
        ))}
      </div>
    );
  }, [loading, spaces, handleDeleteSpace]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-fuchsia-950 to-purple-950">
      <Appbar />
      <div className="mt-20 flex flex-grow flex-col items-center px-4 py-8">
        <div className="relative">
          <h1 className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-7xl font-bold text-transparent md:text-8xl">
            Spaces
          </h1>
          <div className="absolute -inset-1 -z-10 animate-pulse blur-2xl">
            <div className="h-full w-full bg-gradient-to-r from-pink-500/30 via-fuchsia-500/30 to-purple-500/30" />
          </div>
        </div>

        <Button
          onClick={() => setIsCreateSpaceOpen(true)}
          className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-6 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_8px_rgba(236,72,153,0.3)]"
        >
          <Plus className="h-5 w-5" />
          Create a new Space
        </Button>

        <div className="mt-20 w-full max-w-7xl px-4">
          {renderSpaces}
        </div>
      </div>

      <Dialog open={isCreateSpaceOpen} onOpenChange={setIsCreateSpaceOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-pink-200">
              Create New Space
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <label
              className="mb-2 block text-sm font-medium text-pink-200"
              htmlFor="spaceName"
            >
              Space Name
            </label>
            <Input
              id="spaceName"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="border-pink-500/30 bg-white/5 text-pink-200 placeholder:text-pink-200/50 focus:border-pink-500 focus:ring-pink-500"
              placeholder="Enter space name..."
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateSpaceOpen(false);
                setSpaceName("");
              }}
              className="border-pink-500/30 text-pink-200 hover:bg-pink-500/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateSpace}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.3)]"
            >
              Create Space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}