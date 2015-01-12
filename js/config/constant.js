;define("config/constant", function(require, exports, module) {

    return (function() {
        return {
            status: {
                success: '1',
                wrongParameter: '2',
                verificationFailed: '3',
                internalSystemError: '4',
                userOperatioError: '5'
            },
            bookFilter: "book/filter"
        };
    })();

});