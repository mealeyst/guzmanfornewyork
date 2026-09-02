import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

export default defineConfig({
    site: "https://www.guzman4newyork.com",
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
