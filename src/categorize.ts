import { RawGithubIssue } from "./models"

const inquirer = require("inquirer")

export async function inquire(rawIssue: RawGithubIssue) {
  const response = await inquirer.prompt([
    {
      type: "list",
      name: "ticketCategory",
      message: `Categorize this issue: \n#${rawIssue.number} ${rawIssue.title} \nLabels: ${rawIssue.labels
        .map(label => label.name)
        .join(", ")}\nMilestone: ${rawIssue.milestone?.title}\nCreated at: ${rawIssue.created_at}\nClosed at: ${rawIssue.closed_at}\n`,
      choices: ["frontend", "backend", "database", "devops", "other"],
    },
  ])

  return response.ticketCategory
}
