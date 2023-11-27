export function TitleCard({ text }: { text: string }) {
  return (
    <div className="rounded-card bg-card p-4 md:col-span-2 lg:col-span-3">
      <p className="text-xl font-bold">{text}</p>
    </div>
  );
}
