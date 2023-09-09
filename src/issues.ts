import axios from "axios"
import { RawGithubIssue } from "./models"

export async function fetchGithubIssues() {
  const rawGithubIssues: RawGithubIssue[] = []

  let issues = [] as RawGithubIssue[]
  let page = 1
  do {
    const { data } = await axios.get<RawGithubIssue[]>(`https://api.github.com/orgs/${process.env.GITHUB_ORGANIZATION_NAME}/issues`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      params: {
        filter: "assigned",
        state: "closed",
        since: new Date("2023-01-01T00:00:00.000Z").toISOString(),
        per_page: 100,
        page: page++,
      },
    })
    issues = data
    rawGithubIssues.push(...issues)
  } while (issues.length === 100)

  const sortedIssues = rawGithubIssues.sort((a, b) => new Date(a.closed_at).getTime() - new Date(b.closed_at).getTime())

  return sortedIssues
}
