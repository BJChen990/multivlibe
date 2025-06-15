import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
// import './App.css'; // This import is no longer needed

function App() {
  const [count, setCount] = useState(0);

  return (
    // Styles previously in #root
    <div className="max-w-screen-xl mx-auto p-8 text-center">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            // Styles from .logo and .logo:hover
            // Added inline-block for proper sizing/padding and to respect text-align:center from parent
            className="h-24 p-6 inline-block transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            // Styles from .logo, .logo.react:hover, and animation
            // Added inline-block for proper sizing/padding and to respect text-align:center from parent
            // The `animate-[logo-spin_20s_linear_infinite]` class requires 'logo-spin' keyframes
            // to be defined in your tailwind.config.js. For example:
            // theme: {
            //   extend: {
            //     keyframes: {
            //       'logo-spin': {
            //         'from': { transform: 'rotate(0deg)' },
            //         'to': { transform: 'rotate(360deg)' },
            //       }
            //     }
            //   }
            // }
            // Alternatively, use Tailwind's built-in `animate-spin` (1s duration) if the exact 20s duration isn't critical.
            className="h-24 p-6 inline-block transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[logo-spin_20s_linear_infinite]"
            alt="React logo"
          />
        </a>
      </div>
      {/* The h1 is centered by the parent's text-center class */}
      <h1 className="text-3xl font-bold my-6 md:text-5xl md:my-8">
        Vite + React
      </h1>{" "}
      {/* Added some responsive text size and margin */}
      {/* Styles from .card */}
      <div className="p-8">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* Styles from .read-the-docs */}
      <p className="text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
