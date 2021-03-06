var fs = require('fs');

module.exports = {

    readInfo: function (filename, callback) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            callback(data);
        })
    },
    
    writeInfo: function (filename, data) {
        fs.writeFile(filename, data, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("saved file: ", filename);
        });
    }
};