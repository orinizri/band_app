export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    REHEARSAL: "/rehearsal",
    ADMIN_SESSION: "/admin/session",
    ADMIN_RESULTS: "/admin/results",
    ADMIN_LIVE: "/admin/live",
    NOT_FOUND: "*"
  } as const;
  
  export type AppRoute = typeof ROUTES[keyof typeof ROUTES];