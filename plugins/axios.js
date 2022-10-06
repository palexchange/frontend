export default function ({ $axios, redirect, store, response, app }) {
    // $axios.defaults.headers.common['Content-Language'] = context.app.;
    $axios.onError(error => {
        if (error.response.status === 500) {
            store.dispatch('testAxios')
            // redirect('/sorry')
        }
        else if (error.response.status === 401) {
            //   store.dispatch('addErrors', error.response.data)
            //   console.log("TEST 401");
            console.log(error.response);
        }
        else if (error.response.status === 422 && error.response.data.error_messages) {
            store.dispatch('addErrors', error.response.data.error_messages)
            console.log("TEST 422");
            console.log(error.response.data.error_messages);
        }
        else if (error.response.status === 422 && error.response.data.message) {
            store.dispatch('addErrors', [error.response.data.message])
            console.log("TEST 422");
        }
        else if (error.response.status === 421 && error.response.data.message) {
            app.$toast(error.response.data.message);
            console.log("TEST 422");
        } else if (error.response.status === 403 && error.response.data) {
            store.dispatch('addErrors', { error: store.$i18n.t(error.response.data.message) })
        }
        // else if(error.response.status === 422 && error.response.data.errors ){
        //   let data = error.response.data.errors
        //   Object.
        //   store.dispatch('addErrors' , [data] )
        //   console.log("TEST 422 Message");

        // }
        // else if(error.response.status === 402 && error.response.data.error_messages ){
        //   store.dispatch('addErrors' , error.response.data.error_messages )
        //   console.log("TEST 402");
        //   console.log(error.response.data.error_messages);
        // }
    })




}
