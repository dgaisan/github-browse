
import { useEffect, useState } from 'react';

import githubConfig from './config';
import { GITHUB_AUTH_TOKEN, GITHUB_USER_NAME } from './tokens';
import getReposQuery from './queries/GetRepos';


const github = githubConfig(GITHUB_USER_NAME, GITHUB_AUTH_TOKEN);

function App() {
    let [userName, setUserName] = useState('');
    let [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch(github.baseUrl, {
            method: "POST",
            headers: github.headers,
            body: JSON.stringify(getReposQuery)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
            setUserName(response.data.viewer.name);
            setRepos(response.data.viewer.repositories.nodes);
        })
        .catch(err => {
            console.error("Unable to fetch data from the server");
            console.log(err);
        });
    });

    return (
        <div className="container mt-2">
            <h4 className="primary-text">
                <i className="bi bi-diagram-3-fill"></i>
                <span style={{ marginLeft: '4px' }}>Browse GitHub Repositories</span>
            </h4>
            <p>Hello {userName}</p>
            <br />
            <ul className="list-group">
                {
                    repos.map(repo => (
                        <li className="list-group-item">
                            <p className="h4">{repo.name}</p>
                            <p className="small">{repo.description}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
