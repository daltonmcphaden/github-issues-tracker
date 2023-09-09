import { RawGithubIssue } from "./models"
const inquirer = require("inquirer")

const TICKET_CATEGORIES = ["frontend", "backend", "database", "devops", "other"]

export async function inquire(rawIssue: RawGithubIssue): Promise<string> {
  const { number, title, labels, milestone, created_at, closed_at } = rawIssue
  const formattedLabels = labels.map(label => label.name).join(", ")

  const promptMessage = `
Categorize this issue:
#${number} ${title}
Labels: ${formattedLabels}
Milestone: ${milestone?.title ?? "N/A"}
Created at: ${created_at}
Closed at: ${closed_at ?? "N/A"}
`

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "ticketCategory",
      message: promptMessage,
      choices: TICKET_CATEGORIES,
    },
  ])

  return response.ticketCategory
}
