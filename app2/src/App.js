import React from "react";
import SharedButton from './SharedButton';
const ColorSlides = React.lazy(() => import("app1/ColorSlides"));

const App = () => (
  <div>
    <h2 style={{ textAlign: 'center' }}>Local Button, Remote Slides</h2>
    <React.Suspense fallback="Loading Slides">
      <ColorSlides />
    </React.Suspense>
    <SharedButton />
  </div>
);

export default App;