var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }

  if(data[0] === '/multiplicacion') {
    var multiplicacion = 1
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        multiplicacion *= number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:multiplicacion}))
  }

  if(data[0] === '/fibonacci') 
  {
    var fibonacci = ['1']
    var input = data[1].split('=')[1]
    var n = input.split('&')[0]
    if(isNumeric(n))
    {
      for (i=1; i<Number(n);i++)
      {
        if(fibonacci.length===1)
        {
          fibonacci.push('1')
        }
        else
        {
          fibonacci.push(((Number(fibonacci[i-1])+Number(fibonacci[i-2]))).toString())
        }
      }
    }
    else 
    {
      //It's not a number, so we show an error message and sends to the client
      response.writeHead(400, {'Content-Type': 'application/json'})
      response.end(JSON.stringify({result:'error, el input debe ser numerico',n}))
    }
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:fibonacci}))
  }
})

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)
