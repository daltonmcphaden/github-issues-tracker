# GitHub Issues Tracker

A TypeScript CLI application for tracking completed GitHub tickets.

## Features

- Fetches closed GitHub issues assigned to you since Jan 1 2023.
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

1. To start the CLI application:

```bash
npm run dev
```

2. Follow the on-screen prompts to categorize your closed issues. You can stop at any point and your progress will be saved.

## Dependencies
- [axios](https://github.com/axios/axios) for making HTTP requests.
- [dotenv](https://github.com/motdotla/dotenv) for loading environment variables.
- [inquirer](https://github.com/SBoudrias/Inquirer.js) for interactive CLI interface.
- [lowdb](https://github.com/typicode/lowdb) for lightweight local database.


## Contributing
Feel free to submit pull requests.
