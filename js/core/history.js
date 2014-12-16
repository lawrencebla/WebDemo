;define("core/history", function() {
    if(Backbone && Backbone.history) {
        return Backbone.history;
    } else {
        console.error("Can't found Backbone.");
    }
});