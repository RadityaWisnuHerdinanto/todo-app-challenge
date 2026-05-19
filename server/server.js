import "dotenv/config";
import { createApp } from "./src/app.js";

const app = createApp();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ API Health: http://localhost:${PORT}/api/health`);
  console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
