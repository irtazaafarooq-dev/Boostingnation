import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that require the user to be logged in (like a dashboard or cart)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/cart(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and Payload's admin panel
    '/((?!_next|admin|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};