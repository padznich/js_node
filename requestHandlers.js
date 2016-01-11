
//var exec = require("child_process").exec;

var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response) {
	console.log("Request handler START was called.");

	var body = '<html>' +
				'<head>' +
					'<meta http-equiv="Content-Type" content="text/html; ' +
					'charset=UTF-8" />' +
				'</head>' +
				'<body>' +
					'<h1>Start page</h1>' +
					'<form action="/upload" method="post">' +
						'<textarea name="text" rows="20" cols="60"></textarea>' +
						'<input type="submit" value="Submit text" />' +
					'</form>' +
				'<body>' +
				'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
/*
	exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
*/
}

function upload(response, request) {
	console.log("Request handler UPLOAD was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done.");
		fs.rename(files.upload.path, "e:/DataPad/JS/code/tmp/test.jpg", function(err) {
			if (err) {
				fs.unlink("e:/DataPad/JS/code/tmp/test.jpg");
				fs.rename(files.upload.path, "e:/DataPad/JS/code/tmp/test.jpg");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received imade:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler SHOW was called.");
	fs.readFile("e:/DataPad/JS/code/tmp/test.jpg", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} 
		else {
			response.writeHead(200, {"Content-Type": "image/jpg"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;