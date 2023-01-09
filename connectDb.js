const { MongoClient } = require("mongodb");
// let users;
let posts;
module.exports = {
  // connectUser(isConnected) {
  //   MongoClient.connect(
  //     "mongodb+srv://userBlog:47566566Aa.@users.0gvwiqd.mongodb.net/?retryWrites=true&w=majority"
  //   )
  //     .then((client) => {
  //       users = client.db();
  //       return isConnected();
  //     })
  //     .catch((error) => {
  //       return isConnected(error);
  //     });
  // },
  // usersDb: () => users,

  connectPosts: (isConnected) => {
    MongoClient.connect(
      "mongodb+srv://posts:47566566Aa.@cluster0.hwylbsh.mongodb.net/?retryWrites=true&w=majority"
    )
      .then((client) => {
        posts = client.db();
        return isConnected();
      })
      .catch((error) => {
        return isConnected(error);
      });
  },
  postsDb: () => posts,
};
