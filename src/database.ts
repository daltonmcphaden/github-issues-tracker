import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import { StoredGithubIssue } from "./models"

type Schema = {
  githubIssues: StoredGithubIssue[]
}

let db: low.LowdbSync<Schema>

export const createConnection = () => {
  const adapter = new FileSync<Schema>("db.json")
  db = low(adapter)
  db.defaults({ githubIssues: [] }).write()
}

export const getConnection = () => db
