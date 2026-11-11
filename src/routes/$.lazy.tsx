import { createLazyFileRoute } from "@tanstack/react-router";
import { DetailPage } from "../components/university/Pages";
export const Route = createLazyFileRoute("/$")({ component: UniversityPage });
function UniversityPage() {
  const { _splat } = Route.useParams();
  return <DetailPage key={_splat} path={_splat || ""} />;
}
