import { Router, createAsync } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

import { clientOnly } from "@solidjs/start";
import { getCookie } from "vinxi/http";

const CookieBanner = clientOnly(() => import("./components/CookieBanner"));

export async function getConsent(): Promise<boolean | undefined> {
  "use server";
  const cookie = getCookie("consent");
  return cookie === undefined ? undefined : cookie === "true";
}

export default function App() {
  const consent = createAsync(() => getConsent());

  return (
    <>
      <Router
        root={(props) => (
          <>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
      <CookieBanner consent={consent()} />
    </>
  );
}
