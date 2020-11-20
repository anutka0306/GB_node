const models = require('../models');


exports.getUserByVkCode = (req, res, next) => {
  return models.User.findVkUser(req).then((res) =>{
      const user = res[0];
      return user;
  }).catch((err) =>{
      return(err);
  })
}