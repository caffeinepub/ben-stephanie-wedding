import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AdminPage } from "./pages/AdminPage";
import { WeddingPage } from "./pages/WeddingPage";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isAdmin = currentPath === "/admin" || currentPath.startsWith("/admin/");

  return (
    <>
      {/* Admin nav hint on public site */}
      {!isAdmin && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-end px-6 py-3 pointer-events-none">
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/admin");
              setCurrentPath("/admin");
            }}
            className="pointer-events-auto font-sans text-xs text-muted-foreground/50 hover:text-sage transition-colors tracking-widest uppercase"
          >
            Admin
          </a>
        </div>
      )}

      {isAdmin ? (
        <>
          {/* Admin back to site link */}
          <div className="fixed top-4 left-4 z-50">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/");
                setCurrentPath("/");
              }}
              className="font-sans text-xs text-muted-foreground hover:text-sage transition-colors tracking-widest uppercase bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sage/20"
            >
              ← Back to site
            </a>
          </div>
          <AdminPage />
        </>
      ) : (
        <WeddingPage />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "font-sans border-sage/20 bg-white/90 backdrop-blur-sm shadow-petal",
            description: "text-muted-foreground",
          },
        }}
      />
    </>
  );
}

export default App;
