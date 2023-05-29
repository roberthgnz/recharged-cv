import { Grid, Card } from '@tremor/react';

export default function Loading() {
  return (
    <Grid numColsMd={2} numColsLg={3} className="gap-6 mt-6 animation-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="h-[120px]" />
      ))}
    </Grid>
  );
}
