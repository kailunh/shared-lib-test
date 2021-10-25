import React from "react";
import ColorSlides from './ColorSlides';
const SharedButton = React.lazy(() => import("app2/SharedButton"));

const App = () => (
  <div>
    <h2 style={{ textAlign: 'center' }}>App1, Shared Slides</h2>
    <ColorSlides />
    <React.Suspense fallback="Loading Button">
      <SharedButton />
    </React.Suspense>
  </div>
);

export default App;
