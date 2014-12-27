;define("page/takagism/takagism_router", function(require, exports, module) {

    var router = require("core/router");

    var home = require("page/home/home");
    var subject = require("page/subject/subject");
    var art = require("page/art/art");
    var commonweal = require("page/commonweal/commonweal");
    var summary = require("page/summary/summary");
    var comment = require("page/comment/comment");

    var cache = {
        tab: {}
    };

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
            if(!cache.tab["home"]) {
                new home($(".j-home-content")).render();
                cache.tab["home"] = true;
            }
        },

        subjectRoute: function(actions) {
            if(!cache.tab["subject"]) {
                new subject($(".j-subject-content")).render();
                cache.tab["subject"] = true;
            }
        },

        artRoute: function(actions) {
            if(!cache.tab["art"]) {
                new art($(".j-art-content")).render();
                cache.tab["art"] = true;
            }
        },

        commonwealRoute: function(actions) {
            if(!cache.tab["commonweal"]) {
                new commonweal($(".j-commonweal-content")).render();
                cache.tab["commonweal"] = true;
            }
        },

        summaryRoute: function(actions) {
            if(!cache.tab["summary"]) {
                new summary($(".j-summary-content")).render();
                cache.tab["summary"] = true;
            }
        },

        commentRoute: function(actions) {
            if(!cache.tab["comment"]) {
                new comment($(".j-comment-content")).render();
                cache.tab["comment"] = true;
            }
        }
    });
});