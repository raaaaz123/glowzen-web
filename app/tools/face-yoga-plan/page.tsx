import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import AiPlanBuilder from "@/components/tools/AiPlanBuilder";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";

const tool = toolBySlug("face-yoga-plan");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  // The page itself is still static — the model is only reached from the
  // client, through `app/api/plan/route.ts`, once someone actually asks.
  return (
    <ToolPage tool={tool}>
      <AiPlanBuilder />
    </ToolPage>
  );
}
