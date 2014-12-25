;define("page/commonweal/model", function(require, exports, module) {

    var model = require("core/mvc/model");

    module.exports = model.extend({
        name: "",
        smallImgUrl: "",
        bigImgUrl: "",

        open: function() {
            alert("open");
        }
    });

});