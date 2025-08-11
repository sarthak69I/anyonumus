import type { ClassInfo } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassCard } from "./class-card";
import { BookOpen } from "lucide-react";

interface ClassGroupCardProps {
  classInfo: ClassInfo;
}

export function ClassGroupCard({ classInfo }: ClassGroupCardProps) {
  return (
    <Card className="bg-card border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-accent">
          <BookOpen className="text-primary w-7 h-7"/>
          {classInfo.pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        {classInfo.class1Visible && (
          <ClassCard
            subject={classInfo.class1Subject}
            timeLabel={classInfo.classTimeLabel}
            liveStreamUrl={classInfo.class1LiveStreamUrl}
            startTime={classInfo.class1Times.startTime}
            endTime={classInfo.class1Times.endTime}
          />
        )}
        {classInfo.class2Visible && (
          <ClassCard
            subject={classInfo.class2Subject}
            timeLabel={classInfo.classTimeLabel2}
            liveStreamUrl={classInfo.class2LiveStreamUrl}
            startTime={classInfo.class2Times.startTime}
            endTime={classInfo.class2Times.endTime}
          />
        )}
      </CardContent>
    </Card>
  );
}
