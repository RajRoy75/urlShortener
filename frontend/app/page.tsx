import UrlForm from "@/components/UrlForm";
import LinkList from "@/components/LinkList";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6] text-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-gray-900">
            Link<span className="text-blue-600">Shrink</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            A powerful tool to shorten your long URLs, track clicks, and manage your links in one dashboard.
          </p>
        </div>

        <div className="relative z-10 -mb-8">
          <UrlForm />
        </div>

        <LinkList />
      </div>
    </main>
  );
}
