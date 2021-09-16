let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1" :
    APIURL = "http://localhost:3000"
    break;

//   case "park-planner-app.herokuapp.com" :
//     APIURL = "heroku app link here" //!add heroku app link here upon deployment
//     break;

  default:
    APIURL = "http://localhost:3000"
}

export default APIURL;