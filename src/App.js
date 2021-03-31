
import { useEffect, useState, useCallback } from 'react';

import githubConfig from './config';
import { GITHUB_AUTH_TOKEN, GITHUB_USER_NAME } from './tokens';

import getReposQuery from './queries/GetRepos';
import RepoItem from './components/RepoItem';

const github = githubConfig(GITHUB_USER_NAME, GITHUB_AUTH_TOKEN);

function App() {
    const [userName, setUserName] = useState('');
    const [repos, setRepos] = useState([]);
    const [totalItems, setTotalItems] = useState(null);

    const fetchRepos = useCallback(() => {
        fetch(github.baseUrl, {
                method: "POST",
                headers: github.headers,
                body: JSON.stringify(getReposQuery)
            })
            .then(response => response.json())
            .then(response => {
                const {viewer, search} = response.data;
                console.log(viewer, search);
                setUserName(viewer.name);
                setRepos(search.nodes);
                setTotalItems(search.repositoryCount);
            })
            .catch(err => {
                console.error("Unable to fetch data from the server");
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

    const userNameFragment = (<p>Hello {userName}</p>);
    const reposFragment = 
        repos.map(repo => (<RepoItem key={repo.id} repo={repo} />));

    return (
        <div className="container mt-2">
            <h4 className="primary-text">
                <i className="bi bi-diagram-3-fill"></i>
                <span style={{ marginLeft: '4px' }}>Browse GitHub Repositories</span>
            </h4>
            { userNameFragment }
            <br />
            <p>
                <b>Total Results:</b> {totalItems}
            </p>
            <ul className="list-group">
                { reposFragment }
            </ul>
        </div>
    );
}

export default App;
