import { FRONTEND_URL } from "@/lib/constants";
import { LinkData } from "@/lib/types";
import { Copy, Scissors, Check } from "lucide-react";
import { useState } from "react";


export default function SuccessModal({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: LinkData | null;
}) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !data) return null;

  const shortUrl = data ? `${FRONTEND_URL}/${data.code}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-500 mb-6">Your URL has been shortened.</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3 mb-6">
          <span className="flex-1 font-mono text-gray-700 truncate">{shortUrl}</span>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all ${copied ? "bg-green-500 text-white" : "bg-white border hover:bg-gray-100"
              }`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
          Done
        </button>
      </div>
    </div>
  );
}
