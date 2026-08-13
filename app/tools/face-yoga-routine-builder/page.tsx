import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import RoutineBuilder from "@/components/tools/RoutineBuilder";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";
import { routinePool, routineZones } from "@/lib/routine-source";

const tool = toolBySlug("face-yoga-routine-builder");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  // The catalogue is trimmed here, on the server, so the widget receives six
  // fields per exercise instead of the whole prose entry.
  return (
    <ToolPage tool={tool}>
      <RoutineBuilder pool={routinePool()} zones={routineZones()} />
    </ToolPage>
  );
}
