import { createConnection, getConnection } from "./database"
import { loadEnvironmentVariables } from "./utils"
import { StoredGithubIssue, RawGithubIssue } from "./models"
import { fetchGithubIssues } from "./issues"
import { inquire } from "./categorize"
import test from "node:test"

async function main() {
  loadEnvironmentVariables()
  createConnection()

  const db = getConnection()

  const storedIssues = db.get("githubIssues").value()
  const rawGithubIssues = await fetchGithubIssues()

  console.log(`Found ${rawGithubIssues.length} issues`)
  console.log(`${storedIssues.length} issues already categorized and stored\n`)
  for (const rawIssue of rawGithubIssues) {
    const existingIssue = storedIssues.find(storedIssue => storedIssue.number === rawIssue.number)
    if (!existingIssue) {
      const category = await inquire(rawIssue)
      const categorizedIssue = { ...rawIssue, category } as StoredGithubIssue
      db.get("githubIssues").push(categorizedIssue).write()
      console.log(`Issue ${rawIssue.number} categorized and stored\n`)
    }
  }

  const categorizedIssues = db.get("githubIssues").value()
  const frontendIssues = categorizedIssues.filter(issue => issue.category === "frontend")
  const backendIssues = categorizedIssues.filter(issue => issue.category === "backend")
  const databaseIssues = categorizedIssues.filter(issue => issue.category === "database")
  const devopsIssues = categorizedIssues.filter(issue => issue.category === "devops")
  const otherIssues = categorizedIssues.filter(issue => issue.category === "other")

  console.log(`Total issues completed: ${categorizedIssues.length}`)
  console.log(`Frontend issues: ${frontendIssues.length} (${Math.round((frontendIssues.length / categorizedIssues.length) * 100)}%)`)
  console.log(`Backend issues: ${backendIssues.length} (${Math.round((backendIssues.length / categorizedIssues.length) * 100)}%)`)
  console.log(`Database issues: ${databaseIssues.length} (${Math.round((databaseIssues.length / categorizedIssues.length) * 100)}%)`)
  console.log(`Devops issues: ${devopsIssues.length} (${Math.round((devopsIssues.length / categorizedIssues.length) * 100)}%)`)
  console.log(`Other issues: ${otherIssues.length} (${Math.round((otherIssues.length / categorizedIssues.length) * 100)}%)`)
}

main()
