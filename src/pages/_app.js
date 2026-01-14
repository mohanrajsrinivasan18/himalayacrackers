
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import "@/styles/globals.scss";
import StickyCartBar from "@/components/cart/StickyCartBar";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    const handleRoute = url => {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRoute);
    return () => router.events.off("routeChangeComplete", handleRoute);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <StickyCartBar />
    </>
  );
}
