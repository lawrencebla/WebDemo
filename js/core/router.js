;define("core/router", function() {
    if(Backbone && Backbone.Router.extend) {
        return Backbone.Router;
    } else {
        console.error("Can't found Backbone.");
    }
});