import type { MetadataRoute } from "next";

const pages = ["", "/karte", "/menu", "/catering", "/contact", "/imprint", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `https://schuknecht.net${path}` }));
}
