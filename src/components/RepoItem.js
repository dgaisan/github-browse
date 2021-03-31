const RepoItem = ({repo}) => (
    <li className="list-group-item">
        <a href={repo.url} className="h4" target="_blank" rel="noreferrer">{repo.name}</a>
        <p className="small">{repo.description}</p>
    </li>
);

export default RepoItem;