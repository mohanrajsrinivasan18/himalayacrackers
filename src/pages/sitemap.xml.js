
import { supabaseAdmin } from "@/lib/supabaseClient";
const SITE_URL = "https://www.himalayacrackers.com";

export async function getServerSideProps({ res }) {
  const { data: products } = await supabaseAdmin.from("products").select("id");
  const urls = products.map(p => `<url><loc>${SITE_URL}/products/${p.id}</loc></url>`).join("");
  res.setHeader("Content-Type", "text/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?><urlset>${urls}</urlset>`);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }
