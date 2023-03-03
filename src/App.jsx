import { useState } from 'react';
import './App.css';
import issues from './issues.json';
import prs from './prs.json';
import comments from './comments.json';
import { IssueIcon, CommentIcon, PullRequestIcon } from './Icons';

const Stat = ({ title, value, description, textColorClass = '', icon = null }) => (
    <div className="stat">
        {icon && <div className={`stat-figure mt-3 ${textColorClass}`}>{icon}</div>}
        <div className="stat-title">{title}</div>
        <div className={`stat-value ${textColorClass}`}>{value.toLocaleString('da')}</div>
    </div>
);

function App() {
    const actualIssues = issues.filter((issue) => issue !== null);
    const amountOfIssues = actualIssues.length;
    const uniqueIssueCreators = new Set(actualIssues).size;

    const amountOfComments = comments.length;
    const uniqueCommentCreators = new Set(comments).size;

    const amountOfPrs = prs.length;
    const uniquePRCreators = new Set(prs).size;

    const uniqueContributors = new Set([...actualIssues, ...comments]).size;

    return (
        <div>
            <div className="prose text-center m-auto">
                <h1>GitHub Repository Stats</h1>
                <div className="stats shadow-2xl">
                    <Stat
                        title="Total Issues"
                        textColorClass="text-primary"
                        value={amountOfIssues}
                        icon={<IssueIcon textClass="w-5 h-5" />}
                    />
                    <Stat
                        title="Total Comments"
                        textColorClass="text-secondary"
                        value={amountOfComments}
                        icon={<CommentIcon textClass="w-6 h-6" />}
                    />
                    <Stat
                        title="Total PRs"
                        textColorClass="text-accent"
                        value={amountOfPrs}
                        icon={<PullRequestIcon textClass="w-5 h-5" />}
                    />
                </div>
                <h2>Unique Contributors</h2>
                <div className="stats shadow-2xl mb-20">
                    <Stat title="Issue Authors" value={uniqueIssueCreators} />
                    <Stat title="Comment Authors" value={uniqueCommentCreators} />
                    <div className="stat">
                        <div className="stat-title font-bold text-black">
                            Total Non-Code Contributors
                        </div>
                        <div className="stat-value animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
                            {uniqueContributors.toLocaleString('da')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
