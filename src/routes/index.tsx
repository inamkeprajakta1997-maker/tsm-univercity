import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "T.S. Mishra University, Lucknow | Shape Your Future" },
      {
        name: "description",
        content:
          "Explore eight schools, academic programs, campus life, and admissions at T.S. Mishra University, Lucknow.",
      },
      {
        property: "og:title",
        content: "T.S. Mishra University | Shape your future. Inspire the world.",
      },
      {
        property: "og:description",
        content: "A place for curious minds and bold ambitions. Discover TSM University, Lucknow.",
      },
      {
        property: "og:image",
        content:
          "https://raw.githubusercontent.com/inamkeprajakta1997-maker/tsm-univercity/main/public/og-university.jpg",
      },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "T.S. Mishra University campus in Lucknow with the university logo.",
      },
      {
        name: "twitter:image",
        content:
          "https://raw.githubusercontent.com/inamkeprajakta1997-maker/tsm-univercity/main/public/og-university.jpg",
      },
      {
        name: "twitter:image:alt",
        content: "T.S. Mishra University campus in Lucknow with the university logo.",
      },
    ],
  }),
});
