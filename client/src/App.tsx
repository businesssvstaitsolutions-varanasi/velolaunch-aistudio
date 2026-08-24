/**
 * Precision Field design reminder: site-wide context stays dark and technically composed.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebsiteChatbot } from "@/components/WebsiteChatbot";
import { SmoothHashScroll } from "@/components/SmoothHashScroll";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Operations from "./pages/Operations";
import Offers from "./pages/Offers";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import WhyVeloLaunch from "./pages/WhyVeloLaunch";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/offers" component={Offers} />
      <Route path="/why-velolaunch" component={WhyVeloLaunch} />
      <Route path="/about" component={About} />
      <Route path="/operations" component={Operations} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <SmoothHashScroll />
          <Router />
          {location !== "/operations" ? <WebsiteChatbot /> : null}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
