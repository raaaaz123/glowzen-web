import { notFound } from "next/navigation";

import ToolPage from "@/components/tools/ToolPage";
import PhotoComparer from "@/components/tools/PhotoComparer";
import { toolBySlug, toolMetadata } from "@/lib/content/tools";

const tool = toolBySlug("progress-photo-comparison");

export const metadata = tool ? toolMetadata(tool) : {};

export default function Page() {
  if (!tool) notFound();

  return (
    <ToolPage tool={tool}>
      <PhotoComparer />
    </ToolPage>
  );
}
