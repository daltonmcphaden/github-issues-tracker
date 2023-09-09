# GitHub Issues Tracker

A TypeScript CLI application that fetches GitHub issues assigned to you that are closed and allows you to categorize them.

## Features

- Fetches closed GitHub issues assigned to you.
- Interactive CLI interface to categorize each issue as "backend", "frontend", "devops", etc.
- Provides a summary of how many of each type of ticket you've completed.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/github-issues.git
    ```

2. Navigate to the project directory:
    ```bash
    cd github-issues-tracker
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of your project and add your GitHub personal access token and organization name:
    ```plaintext
    GITHUB_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN
    GITHUB_ORGANIZATION_NAME=YOUR_GITHUB_ORGANIZATION_NAME
    ```

## Usage

To start the CLI application:

```bash
npm run dev
```
