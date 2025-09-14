import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import NetworkNavigation from "./NetworkNavigation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

// Mock user data - in a real app, this would come from authentication context
const mockUser = {
  name: "Sarah Johnson",
  role: "admin" as const,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isNetworkRoute = location.pathname.startsWith("/network");
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  const [notificationCount] = useState(3); // Mock notification count

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const commonNavProps = {
    darkMode,
    toggleDarkMode,
    user: mockUser,
    notificationCount,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isNetworkRoute ? (
        <NetworkNavigation {...commonNavProps} />
      ) : (
        <Navigation {...commonNavProps} />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;