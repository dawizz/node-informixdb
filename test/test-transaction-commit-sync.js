let common = require("./common"), odbc = require("../"), db = new odbc.Database(), assert = require("assert"),
    exitCode = 0;


db.openSync(common.connectionString);

common.createTables(db, function (err, data) {
    try {
        db.beginTransactionSync();

        let results = db.querySync("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)");

        db.rollbackTransactionSync();

        results = db.querySync("select * from " + common.tableName);

        assert.deepEqual(results, []);
    } catch (e) {
        console.log("Failed when rolling back");
        console.log(e);
        exitCode = 1
    }

    try {
        //Start a new transaction
        db.beginTransactionSync();

        let result = db.querySync("insert into " + common.tableName + " (COLINT, COLDATETIME, COLTEXT) VALUES (42, null, null)");

        db.commitTransactionSync(); //commit

        result = db.querySync("select * from " + common.tableName);

        assert.deepEqual(result, [{colint: 42, coldatetime: null, coltext: null}]);
    } catch (e) {
        console.log("Failed when committing");
        console.log(e);

        exitCode = 2;
    }

    common.dropTables(db, function (err) {
        db.closeSync();
        process.exit(exitCode);
    });
});


