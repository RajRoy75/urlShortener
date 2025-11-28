"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "@/lib/api";
import { isValidUrl } from "@/lib/utils";
import { LinkData } from "@/lib/types";
import { Loader2, Link as LinkIcon, AlertCircle } from "lucide-react";
import SuccessModal from "./SuccessModal";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [modalData, setModalData] = useState<LinkData | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLink,
    onSuccess: (data) => {
      setModalData(data);
      setUrl("");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => setError("Failed to shorten URL. Try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidUrl(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    mutation.mutate(url);
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <LinkIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Paste long URL (https://...)"
              className={`w-full pl-12 pr-4 py-4 text-lg rounded-xl focus:outline-none focus:ring-2 bg-gray-50/50 text-gray-800 placeholder-gray-400 transition-all ${error ? "focus:ring-red-500 ring-1 ring-red-200" : "focus:ring-blue-500"
                }`}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" /> : "Shorten"}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mt-3 flex items-center gap-2 text-red-500 text-sm font-medium animate-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <SuccessModal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </>
  );
}
