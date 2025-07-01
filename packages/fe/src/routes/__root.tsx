import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { Services } from "@/services";
import { Heading } from "./-components/heading";

export const Route = createRootRouteWithContext<{ services: Services }>()({
  component: () => (
    <>
      <Heading />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
