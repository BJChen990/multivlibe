import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ServiceContext } from "./context/service_context";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createServices } from "./services";

const services = createServices();

const router = createRouter({ routeTree, context: { services } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ServiceContext.Provider value={services}>
        <RouterProvider router={router} />
      </ServiceContext.Provider>
    </StrictMode>,
  );
}
