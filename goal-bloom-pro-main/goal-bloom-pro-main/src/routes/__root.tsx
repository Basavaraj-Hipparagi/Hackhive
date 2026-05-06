import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FocusFlow AI — Your AI-Powered Study Companion" },
      { name: "description", content: "AI-powered student productivity tracker. Tasks, focus timers, analytics, and goals — built for college students." },
      { name: "author", content: "FocusFlow AI" },
      { property: "og:title", content: "FocusFlow AI — Your AI-Powered Study Companion" },
      { property: "og:description", content: "AI-powered student productivity tracker. Tasks, focus timers, analytics, and goals — built for college students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "FocusFlow AI — Your AI-Powered Study Companion" },
      { name: "twitter:description", content: "AI-powered student productivity tracker. Tasks, focus timers, analytics, and goals — built for college students." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65ae3d2b-f015-4dbd-bb8a-e40b7f97ff27/id-preview-afdbebe9--8a92ce20-20d3-4578-83bc-795e1811a88d.lovable.app-1778052798791.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65ae3d2b-f015-4dbd-bb8a-e40b7f97ff27/id-preview-afdbebe9--8a92ce20-20d3-4578-83bc-795e1811a88d.lovable.app-1778052798791.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
