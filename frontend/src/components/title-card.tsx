import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function TitleCard({ text }: { text: string }) {
  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
    </Card>
  );
}
