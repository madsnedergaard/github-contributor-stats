import { Octokit } from 'octokit';
import { writeFileSync } from 'fs';

// Adjust repository details here
const DEFAULT_DETAILS = {
    owner: 'electricitymaps',
    repo: 'electricitymaps-contrib',
    per_page: 100,
    state: 'all',
    headers: {
        'x-github-api-version': '2022-11-28',
    },
};

// Ensure GH token is set
if (!process.env.GITHUB_TOKEN) {
    console.error('Missing GITHUB_TOKEN env var!');
    process.exit(1);
}

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const getAllIssues = async () => {
    const issueData = await octokit.paginate(
        octokit.rest.issues.listForRepo,
        DEFAULT_DETAILS,
        (response, done) =>
            response.data.map((issue) => {
                if (issue.pull_request) {
                    return;
                }
                return issue.user.login;
            })
    );

    console.log(`Got ${issueData.length} issues`);
    writeFileSync('src/issues.json', JSON.stringify(issueData, null, 2));
};

const getAllPRs = async () => {
    const prData = await octokit.paginate(
        octokit.rest.pulls.list,
        DEFAULT_DETAILS,
        (response, done) =>
            response.data.map((issue) => {
                return issue.user.login;
            })
    );

    console.log(`Got ${prData.length} issues`);
    writeFileSync('src/prs.json', JSON.stringify(prData, null, 2));
};

const getAllComments = async () => {
    const commentsData = await octokit.paginate(
        octokit.rest.issues.listCommentsForRepo,
        DEFAULT_DETAILS,
        (response, done) =>
            response.data.map((issue) => {
                return issue.user.login;
            })
    );

    console.log(`Got ${commentsData.length} comments`);
    writeFileSync('src/comments.json', JSON.stringify(commentsData, null, 2));
};

const run = async () => {
    await getAllPRs();
    await getAllIssues();
    await getAllComments();
};

run();
