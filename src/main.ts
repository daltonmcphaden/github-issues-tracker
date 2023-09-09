import { createConnection, getConnection } from "./database"
import { loadEnvironmentVariables } from "./utils"
import { StoredGithubIssue, RawGithubIssue } from "./models"
import { fetchGithubIssues } from "./issues"
import { inquire } from "./categorize"

async function getStoredIssues() {
  const db = getConnection()
  return db.get("githubIssues").value()
}

async function storeNewIssues(newIssues: StoredGithubIssue[]) {
  const db = getConnection()
  db.get("githubIssues")
    .push(...newIssues)
    .write()
}

async function categorizeNewIssues(storedIssues: StoredGithubIssue[], rawIssues: RawGithubIssue[]): Promise<StoredGithubIssue[]> {
  const newIssues: StoredGithubIssue[] = []

  for (const rawIssue of rawIssues) {
    const existingIssue = storedIssues.find(storedIssue => storedIssue.id === rawIssue.id)
    if (!existingIssue) {
      const category = await inquire(rawIssue)
      const categorizedIssue = { ...rawIssue, category } as StoredGithubIssue
      newIssues.push(categorizedIssue)
      console.log(`Issue ${rawIssue.number} categorized and stored`)
    }
  }

  return newIssues
}

function countAndLogIssues(categorizedIssues: StoredGithubIssue[]) {
  const categories = ["frontend", "backend", "database", "devops", "other"]
  const counts: { [key: string]: number } = {}

  for (const category of categories) {
    counts[category] = categorizedIssues.filter(issue => issue.category === category).length
    console.log(
      `${category.charAt(0).toUpperCase() + category.slice(1)} issues: ${counts[category]} (${Math.round(
        (counts[category] / categorizedIssues.length) * 100
      )}%)`
    )
  }

  console.log(`Total issues completed: ${categorizedIssues.length}`)
}

async function main() {
  loadEnvironmentVariables()
  createConnection()

  const storedIssues = await getStoredIssues()
  const rawGithubIssues = await fetchGithubIssues()

  console.log(`Found ${rawGithubIssues.length} issues`)
  console.log(`${storedIssues.length} issues already categorized and stored\n`)

  const newIssues = await categorizeNewIssues(storedIssues, rawGithubIssues)
  await storeNewIssues(newIssues)

  countAndLogIssues([...storedIssues, ...newIssues])
}

main()
