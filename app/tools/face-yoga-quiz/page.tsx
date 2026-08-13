import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import GoalQuiz from "@/components/tools/GoalQuiz";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";
import { routineZones } from "@/lib/routine-source";

const tool = toolBySlug("face-yoga-quiz");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  return (
    <ToolPage tool={tool}>
      <GoalQuiz zones={routineZones()} />
    </ToolPage>
  );
}
