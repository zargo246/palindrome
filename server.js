const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer(function (req, res) {

    const page = url.parse(req.url).pathname
    const params = querystring.parse(url.parse(req.url).query)

    console.log(page)

    if (page == '/') {

        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })

    }

    else if (page == '/api') {

        const userInput = params['input']

        // Remove spaces and make everything lowercase
        const cleanString = userInput
            .toLowerCase()
            .replace(/\s/g, '')

        // Reverse the string
        const reversedString = cleanString
            .split('')
            .reverse()
            .join('')

        // Check if both strings are the same
        const isPalindrome = cleanString === reversedString

        const objToJson = {
            input: userInput,
            palindrome: isPalindrome,
            message: isPalindrome
                ? `${userInput} is a palindrome!`
                : `${userInput} is not a palindrome.`
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(objToJson))

    }

    else if (page == '/css/style.css') {

        fs.readFile('css/style.css', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            res.write(data)
            res.end()
        })

    }

    else if (page == '/js/main.js') {

        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.write(data)
            res.end()
        })

    }

    else {

        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 - Page Not Found')

    }
})

server.listen(8000)

console.log('Server running on port 8000')