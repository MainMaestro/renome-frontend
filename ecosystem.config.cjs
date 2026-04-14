module.exports = {
  apps: [
    {
      name: "renome-frontend",
      script: ".output/server/index.mjs",
      cwd: "C:/Apps/Sources/renome-frontend",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
  ],
};
