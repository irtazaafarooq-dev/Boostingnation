"use client";

import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.$crisp = [];
      // @ts-ignore
      window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = true;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }
  }, []);

  return null; 
}