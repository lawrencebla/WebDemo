;define("page/takagism/takagism_router", function(require, exports, module) {

    var router = require("core/router");

    var home = require("page/home/home");

    module.exports = router.extend({
        routes: {
            "": "indexRoute",
            "home": "indexRoute",
            "subject": "subjectRoute",
            "art": "artRoute",
            "commonweal": "commonwealRoute",
            "summary": "summaryRoute",
            "comment": "commentRoute"
        },

        indexRoute: function(actions) {
            new home($(".j-right-content")).render();
        },

        subjectRoute: function(actions) {
            alert("subjectRoute");
        },

        artRoute: function(actions) {
            alert("artRoute");
        },

        commonwealRoute: function(actions) {
            alert("commonwealRoute");
        },

        summaryRoute: function(actions) {
            alert("summaryRoute");
        },

        commentRoute: function(actions) {
            alert("commentRoute");
        }
    });
});