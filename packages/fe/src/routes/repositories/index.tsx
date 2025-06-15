import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/repositories/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome to repository!</h3>
    </div>
  );
}
