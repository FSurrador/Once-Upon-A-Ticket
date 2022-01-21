function scriptToDatabase() {
    var pg = require('pg');

    var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";

    var pgClient = new pg.Client(connectionString);

    pgClient.connect();

    var query = pgClient.query("SELECT * from profile");

    query.on("row", function (row, result) {

        result.addRow(row);

    });
}