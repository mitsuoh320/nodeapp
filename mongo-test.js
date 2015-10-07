var mongo = require('mongodb');
var db = new mongo.Db('testDB',new mongo.Server('localhost', mongo.Connection.('27017'), {}), {});

db.open(function() {

    db.collection('teacherCollection', function(err, collection) {

        doc = {
            "firstname" : "Taro",
            "familyname" : "Yamada",
            "age" : 42,
            "work" : ["professor", "writer", "TV Caster"]
        };

        collection.insert(doc, function() {

            console.log("insert success");

            db.close();

        });

    });

});

