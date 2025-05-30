const { execSync } = require("child_process");

if (process.env.CI !== "true") {
    execSync("npx husky install", { stdio: "inherit" });
}
