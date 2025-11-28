"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "@/lib/api";
import { FRONTEND_URL } from "@/lib/constants";
import { ArrowLeft, Calendar, Globe, MousePointer2, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function LinkStatsPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const { data: links, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  const link = links?.find((l) => l.code === code);

  const shortUrl = `${FRONTEND_URL}/${code}`;

  if (isLoading) return <div className="p-10 text-center">Loading stats...</div>;

  if (!link) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Stats not found</h1>
        <button onClick={() => router.push("/")} className="text-blue-600 hover:underline">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 p-8 text-white">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Original Destination</p>
            <h1 className="text-xl md:text-2xl font-bold break-all leading-snug text-blue-300">
              {link.target_url}
            </h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <MousePointer2 className="w-5 h-5" /> Total Clicks
                </div>
                <p className="text-4xl font-bold text-gray-900">{link.total_clicks}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Globe className="w-5 h-5" /> Code
                </div>
                <p className="text-3xl font-bold text-gray-800">{link.code}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Calendar className="w-5 h-5" /> Created
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatDate(link.created_at)}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Public Short Link</h3>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-xl font-mono font-bold text-blue-600 hover:underline truncate"
                >
                  {shortUrl}
                </a>
                <a
                  href={shortUrl}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Visit <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
