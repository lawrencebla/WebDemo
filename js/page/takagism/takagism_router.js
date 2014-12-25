;define("page/takagism/takagism_router", function(require, exports, module) {

    var router = require("core/router");

    var home = require("page/home/home");
    var art = require("page/art/art");
    var commonweal = require("page/commonweal/commonweal");
    var summary = require("page/summary/summary");
    var comment = require("page/comment/comment");

    module.exports = router.extend({
        routes: {
            "": "indexRoute",
            "home_page": "indexRoute",
            "subject_page": "subjectRoute",
            "art_page": "artRoute",
            "commonweal_page": "commonwealRoute",
            "summary_page": "summaryRoute",
            "comment_page": "commentRoute"
        },

        indexRoute: function(actions) {
            new home($(".j-home-content")).render();
        },

        subjectRoute: function(actions) {
            alert("subjectRoute");
        },

        artRoute: function(actions) {
            new art($(".j-art-content")).render();
        },

        commonwealRoute: function(actions) {
            new commonweal($(".j-commonweal-content")).render();
        },

        summaryRoute: function(actions) {
            new summary($(".j-summary-content")).render();
            //new home($(".j-right-content")).render();
        },

        commentRoute: function(actions) {
            new comment($(".j-comment-content")).render();
        }
    });
});