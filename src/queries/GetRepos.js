const getReposQuery = {
    query: `
    {
        viewer {
            name
            repositories(first: 15) {
            totalCount
            nodes {
                id
                name
                url
                description
                createdAt
            }
            }
        }
          
    }
    `
};

export default getReposQuery;