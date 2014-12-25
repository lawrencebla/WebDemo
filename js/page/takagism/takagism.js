;define("page/takagism/takagism", function(require, exports, module) {

    var history = require("core/history");

    var view = require("page/takagism/view");
    var service = require("service/service");

    module.exports =  {
        start: function() {
            service.start();
            new view({el: $(".j-takagism-wrapper")});
            history.start();
        }
    }
});