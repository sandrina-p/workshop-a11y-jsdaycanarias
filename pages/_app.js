import React from "react";
import "wicg-inert";

import "../styles/globals.css";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  import("react-dom").then((ReactDOM) => {
    import("@axe-core/react").then((axe) => {
      axe.default(React, ReactDOM, 1000, {});
    });
  });
}

export default App;
