import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set default language direction (Arabic RTL)
document.documentElement.dir = "rtl";
document.documentElement.lang = "ar";

createRoot(document.getElementById("root")!).render(<App />);
