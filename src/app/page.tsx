"use client";

import { useEffect, useState } from "react";
import type { ApiResponse } from "@/types";
import { ClassGroupCard } from "@/components/class-group-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://livedatanexttopper.vercel.app/api/live/eleak');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSkeletons = () => (
    Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="bg-card border-border/50 shadow-lg rounded-lg p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    ))
  );

  return (
    <main className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight bg-gradient-to-r from-accent to-primary text-transparent bg-clip-text">
            StudyVerse Live Classes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your daily schedule of live sessions.
          </p>
        </header>

        {loading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderSkeletons()}
           </div>
        )}

        {error && (
          <div className="text-center text-destructive bg-destructive/10 p-4 rounded-md">
            <p className="font-semibold">Failed to load class schedule: {error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(data).map(([key, classInfo]) => (
              <ClassGroupCard key={key} classInfo={classInfo} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
