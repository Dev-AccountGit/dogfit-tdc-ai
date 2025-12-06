import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>}>
      <App />
    </Suspense>
  );
}
