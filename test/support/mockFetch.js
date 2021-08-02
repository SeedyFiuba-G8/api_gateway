module.exports = function mockFetch(
    url,
    { method = 'GET', body, headers = {} } = {},
    context = {}
) {

    switch (url) {
        default:
            console.log('Unhandled url:', url);
            break;
    }

};
