const getNameQuery = {
    query: `
    {
        viewer {
            name
            login
            email
        }
    }
    `
};

export default getNameQuery;