import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// GitHub Pages serves this repo at a /guzmanfornewyork subpath rather than
// the production domain's root, so it needs its own site/base. The GitHub
// Pages workflow sets GITHUB_PAGES=true when building for that target.
const isGithubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
    site: isGithubPages ? "https://mealeyst.github.io" : "https://www.guzman4newyork.com",
    base: isGithubPages ? "/guzmanfornewyork/" : "/",
    integrations: [
        react(),
        tailwind(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
});
