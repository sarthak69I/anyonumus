"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Video } from 'lucide-react';
import { toZonedTime, format } from 'date-fns-tz';
import { isWithinInterval } from 'date-fns';

interface ClassCardProps {
  subject: string;
  timeLabel: string;
  liveStreamUrl: string;
  startTime: string;
  endTime: string;
}

export function ClassCard({ subject, timeLabel, liveStreamUrl, startTime, endTime }: ClassCardProps) {
  const [isLive, setIsLive] = useState(false);
  
  useEffect(() => {
    const checkTime = () => {
      try {
        const timeZone = 'Asia/Kolkata';
        
        const now = new Date();
        const zonedNow = toZonedTime(now, timeZone);
        
        const start = new Date(startTime);
        const end = new Date(endTime);
        
        const isCurrentlyLive = isWithinInterval(zonedNow, { start, end });

        if (isCurrentlyLive !== isLive) {
          setIsLive(isCurrentlyLive);
        }
      } catch (error) {
        console.error("Error checking time:", error);
      }
    };

    checkTime(); 
    const interval = setInterval(checkTime, 1000); 

    return () => clearInterval(interval);
  }, [startTime, endTime, isLive]);

  const CardContent = (
    <div
      className={cn(
        "p-4 rounded-lg border flex flex-col gap-2 transition-all duration-300",
        isLive
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 ring-2 ring-primary"
          : "border-border bg-background/50",
        isLive ? "cursor-pointer" : "cursor-not-allowed opacity-70"
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-foreground pr-2">{subject}</h3>
        {isLive && (
          <Badge variant="destructive" className="animate-pulse bg-red-500 text-white border-red-500 shrink-0">
            LIVE
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Clock className="w-4 h-4" />
        <span>{timeLabel}</span>
      </div>
      <div className="flex items-center gap-2 text-sm mt-2">
        <Video className={cn("w-4 h-4", isLive ? "text-primary" : "text-muted-foreground")} />
        <span className={cn(isLive ? "text-primary font-medium" : "text-muted-foreground")}>
          {isLive ? 'Join Now' : 'Class is not live'}
        </span>
      </div>
    </div>
  );

  if (isLive) {
    return (
      <a href={liveStreamUrl} target="_blank" rel="noopener noreferrer" className="no-underline text-inherit transform hover:-translate-y-1 transition-transform duration-300 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-lg">
        {CardContent}
      </a>
    );
  }

  return (
    <div className="transform transition-transform duration-300">
        {CardContent}
    </div>
  );
}
