// Function createRoot from React-DOM : create react root element (React-DOM reconciles vDOM with real DOM)
import { createRoot } from 'react-dom/client';

// Root Component
import App from 'src/components/App';

// == Render
const rootReactElement = <App />;

// Targets where the structure should be in the DOM
const rootReactContainer = createRoot(document.getElementById('root'));

// Triggers the rendering of React : reconciles vDOM with DOM
rootReactContainer.render(rootReactElement);
