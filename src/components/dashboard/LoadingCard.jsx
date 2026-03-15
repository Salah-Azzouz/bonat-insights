import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard({ type = 'kpi' }) {
  if (type === 'kpi') {
    return (
      <Card className="bg-[#1B2A4A] border-white/10">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-32 mb-4 bg-white/10" />
          <Skeleton className="h-10 w-40 mb-4 bg-white/10" />
          <Skeleton className="h-4 w-24 bg-white/10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1B2A4A] border-white/10">
      <CardContent className="p-6">
        <Skeleton className="h-64 w-full bg-white/10" />
      </CardContent>
    </Card>
  );
}