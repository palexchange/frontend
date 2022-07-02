export default function ({ $auth,store }) {
    if (!$auth.loggedIn) {
      return
    }
    const username = $auth.user
    console.log(username);
    console.log("FROM PLUGIN ")
    
  }