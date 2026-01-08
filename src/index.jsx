import { createRoot } from 'react-dom/client';

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventuall use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Find the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to rencder your app in the root Dom element
root.render(<MyFlixApplication />); 