import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import StreakTracker from "@/components/tools/StreakTracker";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";

const tool = toolBySlug("face-yoga-tracker");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  return (
    <ToolPage tool={tool}>
      <StreakTracker />
    </ToolPage>
  );
}
