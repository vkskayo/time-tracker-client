import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Day from "./pages/Day";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./index.css";

const client = new ApolloClient({
  uri: "https://time-tracker-server-production.up.railway.app/graphql",
  /*  uri: "http://localhost:4000/graphql", */
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/activity/:id",
    element: <Day />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </RecoilRoot>
  </React.StrictMode>
);
