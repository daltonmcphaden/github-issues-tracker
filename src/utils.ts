import "dotenv/config"

const requiredEnvs = ["GITHUB_API_TOKEN", "GITHUB_ORGANIZATION_NAME"]

export function loadEnvironmentVariables() {
  requiredEnvs.forEach(env => {
    if (!process.env[env]) {
      throw new Error(`Missing required environment variable ${env}`)
    }
  })
  console.log("Environment variables loaded and validated\n")
}
