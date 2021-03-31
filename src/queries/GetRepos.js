const getReposQuery = {
    query: `
    {
        viewer {
          login
        }
        search(query: "user:dgaisan", type: REPOSITORY, first: 15) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    name
                    url
                    createdAt
                    description
                    licenseInfo {
                        spdxId
                    }
                }
            }
        }
    }`
};

export default getReposQuery;