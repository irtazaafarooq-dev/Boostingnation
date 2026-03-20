"use client";

import { useEffect } from "react";

export default function ForceDarkMode({ children }) {
  useEffect(() => {
    // Force the HTML attribute to dark mode
    document.documentElement.setAttribute("data-theme", "dark");
    
    // Override local storage so Payload remembers to keep it dark
    window.localStorage.setItem("payload-theme", '"dark"'); 
  }, []);

  // We just return the children so it doesn't interrupt the rest of the dashboard
  return <>{children}</>;
}