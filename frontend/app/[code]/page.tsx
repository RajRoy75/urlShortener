import { redirect } from "next/navigation";
import { BACKEND_API } from "@/lib/constants";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const backendUrl = `${BACKEND_API}/${code}`;

  try {
    const res = await fetch(backendUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
    });

    if (res.status >= 300 && res.status < 400) {
      const destination = res.headers.get("location");

      if (destination) {
        redirect(destination);
      }
    }

    if (res.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl">Link not found.</p>
            <a href="/" className="text-blue-600 hover:underline mt-4 block">Go Home</a>
          </div>
        </div>
      );
    }

  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Redirect logic error:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Error processing link.</p>
    </div>
  );
}

function isRedirectError(error: any) {
  return error?.digest?.startsWith('NEXT_REDIRECT');
}
