import Link from "next/link";
import { LinkData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { FRONTEND_URL } from "@/lib/constants";
import { BarChart2, Calendar, ExternalLink, Trash2, Loader2 } from "lucide-react";

interface LinkCardProps {
  link: LinkData;
  onDelete: (code: string) => void;
  isDeleting: boolean;
}

export default function LinkCard({ link, onDelete, isDeleting }: LinkCardProps) {
  const shortLink = `${FRONTEND_URL}/${link.code}`;
  const statsLink = `/code/${link.code}`;

  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(link.code);
        }}
        disabled={isDeleting}
        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
        title="Delete Link"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>

      <div>
        <div className="mb-3 pr-8">
          <h3
            className="text-lg font-bold text-gray-900 break-all leading-tight line-clamp-2"
            title={link.target_url}
          >
            {link.target_url}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <a
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-mono rounded-lg border border-blue-100 flex items-center gap-2 hover:bg-blue-100 hover:border-blue-200 transition-all cursor-pointer"
          >
            /{link.code}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <BarChart2 className="w-3 h-3" /> {link.total_clicks} clicks
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(link.created_at)}
          </span>
        </div>

        <Link
          href={statsLink}
          className="text-blue-600 font-semibold hover:underline"
        >
          View Stats &rarr;
        </Link>
      </div>
    </div>
  );
}
