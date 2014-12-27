;define("config/config", function(require, exports, module) {

    module.exports = (function() {
        return {
            apiPath: {
                loadHomeData: "home/data",
                loadSubjectData: "subject/data",
                loadArtData: "art/data",
                loadCommonwealData: "commonweal/data",
                loadCommentData: "comment/data",
                postComment: "comment/post"
            }
        };
    })();

});