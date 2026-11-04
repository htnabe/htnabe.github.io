import autoprefixer from "autoprefixer";
import purgeCSSPlugin from "@fullhuman/postcss-purgecss";

const purgecss = purgeCSSPlugin({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  // Keep Bootstrap runtime and layout classes that may be composed dynamically.
  safelist: {
    standard: [
      "show",
      "showing",
      "hiding",
      "modal-backdrop",
      "offcanvas-backdrop",
      "modal-open",
      "collapse",
      "collapsing",
      "fade",
    ],
    greedy: [/[data-bs-theme=dark]/],
  },
});

export default {
  plugins: [process.env.HUGO_ENVIRONMENT !== "development" ? purgecss : null, autoprefixer],
};
