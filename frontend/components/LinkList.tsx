"use client";
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLinks, deleteLink } from "@/lib/api";
import { Loader2, Clock, MousePointer2 } from "lucide-react";
import LinkCard from "./LinkCard";

type SortOption = "date" | "clicks";

export default function LinkList() {
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLink,
    onMutate: (code) => setDeletingId(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      setDeletingId(null);
    },
    onError: () => {
      alert("Failed to delete link.");
      setDeletingId(null);
    },
  });

  const handleDelete = (code: string) => {
    if (confirm("Are you sure you want to delete this link? This cannot be undone.")) {
      deleteMutation.mutate(code);
    }
  };

  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      if (sortBy === "clicks") {
        return Number(b.total_clicks) - Number(a.total_clicks);
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [data, sortBy]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-2xl text-red-600 border border-red-100">
        <p>Failed to load links.</p>
        <button onClick={() => refetch()} className="mt-2 underline font-semibold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Your Shortened Links
          <span className="text-sm font-normal text-gray-500 bg-gray-200 px-2 py-1 rounded-full text-xs">
            {data?.length || 0}
          </span>
        </h2>

        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm self-start sm:self-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Sort by:</span>

          <button
            onClick={() => setSortBy("date")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${sortBy === "date"
              ? "bg-blue-100 text-blue-700 shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            <Clock className="w-4 h-4" /> Time
          </button>

          <button
            onClick={() => setSortBy("clicks")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${sortBy === "clicks"
              ? "bg-blue-100 text-blue-700 shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            <MousePointer2 className="w-4 h-4" /> Clicks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((link) => (
          <LinkCard
            key={link.code}
            link={link}
            onDelete={handleDelete}
            isDeleting={deletingId === link.code}
          />
        ))}
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-400">No links created yet. Paste a URL above!</p>
        </div>
      )}
    </div>
  );
}
