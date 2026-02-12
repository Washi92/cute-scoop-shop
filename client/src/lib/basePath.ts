// Helper to get the base path for routing
export const getBasePath = () => {
    return import.meta.env.PROD ? "/cute-scoop-shop" : "";
};

// Helper to create full path with base
export const withBasePath = (path: string) => {
    const base = getBasePath();
    // Ensure path starts with /
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
};
