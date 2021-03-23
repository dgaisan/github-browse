const githubConfig = (userName = '', token = '') => ({
    baseUrl: "https://api.github.com/graphql",
    username: userName,
    headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
    }
});

export default githubConfig;