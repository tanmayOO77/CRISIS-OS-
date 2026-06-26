import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import CommandCenter from "./pages/CommandCenter";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";

// Component to handle scrolling to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div id="crisis-os-app-root" className="relative min-h-screen flex flex-col bg-[#0c0c0c] text-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<CommandCenter />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
