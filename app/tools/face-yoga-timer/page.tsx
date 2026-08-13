import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import SessionTimer from "@/components/tools/SessionTimer";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";
import { timerPresets } from "@/lib/routine-source";

const tool = toolBySlug("face-yoga-timer");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  return (
    <ToolPage tool={tool}>
      <SessionTimer presets={timerPresets()} />
    </ToolPage>
  );
}
