
import Head from "next/head";

export default function SEO({
  title = "Himalaya Crackers | Sivakasi Fireworks",
  description = "Premium Sivakasi crackers. Retail & bulk orders.",
  url = "https://www.himalayacrackers.com"
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Head>
  );
}
