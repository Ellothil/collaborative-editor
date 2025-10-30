/**
 * Get and export the environment variables
 */
export const env = {
  // Backend API URL
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",

  // Socket.IO server URL
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",

  // Hocuspocus collaborative editing server URL
  HOCUSPOCUS_URL:
    import.meta.env.VITE_HOCUSPOCUS_URL || "http://localhost:1234",
};
