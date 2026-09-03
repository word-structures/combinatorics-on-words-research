const http = require('http');
http.get('http://export.arxiv.org/api/query?search_query=all:%22abelian+square-free%22&max_results=50', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        let match;
        let regex = /<title>(.*?)<\/title>/g;
        while ((match = regex.exec(data)) !== null) {
            console.log(match[1].trim());
        }
    });
});
