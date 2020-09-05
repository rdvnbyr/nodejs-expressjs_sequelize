const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type"submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();// burada func bitirir!
    };

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            // console.log(parseBody);// output -> message=(input Value)
            const message = parseBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            /* Sync olmas bu kisim bitmeden gecmez.Dosyanin olusturulmasini bekler.{writeFile} den farki!!, Alt taraftaki standart yol. Dosya yazilinca func callback edilir, error var ise yakalanir. */ 
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    /**
     * Ustteki 'on' func async calisir{Callback func}. Buna dikkat edilmeli, ust kisim bitmeden asagiya gecer ve nodeJs stedigimiz sonucu vermeyebilir. 
     */
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Respond NodeJs</title></head>');
    res.write('<body><h1>Hello from NodeJs Server!</h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
