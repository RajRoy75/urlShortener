"use client";

import { useState, useEffect } from "react";
import { BACKEND_API } from "@/lib/constants";
import { Activity, CheckCircle, XCircle, RefreshCw, Loader2, Home } from "lucide-react";
import Link from "next/link";

export default function HealthCheckPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("loading");
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const checkHealth = async () => {
    setStatus("loading");
    setResponseTime(null);
    const start = performance.now();

    try {
      const apiOrigin = new URL(BACKEND_API).origin;
      console.log(apiOrigin);

      const res = await fetch(`${apiOrigin}/healthz`, {
        cache: "no-store",
        method: "GET"
      });

      const end = performance.now();
      setResponseTime(Math.round(end - start));

      if (res.status === 200 || res.status === 304) {
        setStatus("ok");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Health check failed:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        <div className="bg-gray-900 p-6 flex items-center gap-3">
          <Activity className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-white">System Status</h1>
        </div>

        <div className="p-8 flex flex-col items-center text-center">

          {status === "loading" && (
            <div className="py-8">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4 mx-auto" />
              <p className="text-gray-500 font-medium">Pinging Backend...</p>
            </div>
          )}

          {status === "ok" && (
            <div className="py-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">All Systems Operational</h2>
              <p className="text-gray-500 mb-6">
                Backend is responding with <span className="font-mono bg-green-50 text-green-700 px-2 py-1 rounded">200 OK</span>
              </p>
              {responseTime && (
                <div className="text-sm text-gray-400 font-mono">
                  Latency: {responseTime}ms
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="py-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Unavailable</h2>
              <p className="text-gray-500 mb-6">
                Could not connect to backend endpoint <br />
                <code className="text-xs bg-gray-100 p-1 rounded mt-2 block break-all">
                  {new URL(BACKEND_API).origin}/healtz
                </code>
              </p>
            </div>
          )}

        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
          <button
            onClick={checkHealth}
            disabled={status === "loading"}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${status === "loading" ? "animate-spin" : ""}`} />
            Re-check Status
          </button>
        </div>
        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-xl transition-all shadow-sm active:scale-95"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </main>
  );
}
