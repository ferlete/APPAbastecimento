var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'abastecimento'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('DB Connected..!');
	}
});

module.exports = connection;
