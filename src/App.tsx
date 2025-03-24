
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import layouts
import AppLayout from "./components/layout/AppLayout";
import Footer from "./components/layout/Footer";
import ZoomDisableScript from "./components/ZoomDisableScript";

// Import pages
import Home from "./pages/Home";
import TodaysMoon from "./pages/TodaysMoon";
import YourMoon from "./pages/YourMoon";
import MoonPhases from "./pages/MoonPhases";
import SpaceEvents from "./pages/SpaceEvents";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ZoomDisableScript />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/today" element={<TodaysMoon />} />
            <Route path="/your-moon" element={<YourMoon />} />
            <Route path="/phases" element={<MoonPhases />} />
            <Route path="/events" element={<SpaceEvents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
