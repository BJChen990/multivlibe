import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Heading } from "./-components/heading";

export const Route = createRootRoute({
	component: () => (
		<>
			<Heading />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
