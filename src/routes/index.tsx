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
    ],
  }),
});
