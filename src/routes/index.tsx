import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <p className="text-3xl font-bold underline text-red-500">Welcome Home!</p>
    </div>
  );
}
