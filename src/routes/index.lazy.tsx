import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../components/university/Home";
export const Route = createLazyFileRoute("/")({ component: Home });
