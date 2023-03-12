export default ({ app }) => {

    function handleGlobalKeyDown(event) {
        // handle keydown event here
        if (event.keyCode >= 112 && event.keyCode <= 123) {
            console.log('F' + (event.keyCode - 111));
        }
        console.log(event.key);
    }
    // app.router.beforeEach((to, from, next) => {
    //     console.log("teat beforeEach");
    //     window.addEventListener('keydown', handleGlobalKeyDown);
    //     next();
    // });

    app.router.afterEach((to, from) => {
        console.log("teat afterEach");
        window.removeEventListener('keydown', handleGlobalKeyDown);
    });


};