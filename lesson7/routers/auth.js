const express = require('express');
const controllers = require('../controllers');
const passportConfig  = require('../config/vkontakte');

const router = express.Router();

const passport  = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
passport.use(new VKontakteStrategy(passportConfig.config, function(accessToken, refreshToken, params, profile, done) {
   const user =  controllers.auth.findOrCreateVk({ vkid: profile.id, username: profile.name.givenName, email:profile.emails[0].value, password: '' }).then((req, res)=>{

       return done(null, profile);
   });

    }
));

router.get('/login/', controllers.auth.getLogin);
router.post('/login/', controllers.auth.postLogin);
router.post('/logout/', controllers.auth.postLogout);
router.get('/signup/', controllers.auth.getSignup);
router.post('/signup/', controllers.auth.postSignup);

router.get('/vkontakte/',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });


router.get('/vkontakte/callback/',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login/',
        session: false
    }),
    function(req, res) {
        //res.redirect('/');

      controllers.user.getUserByVkCode(req.user.id).then((response) =>{
          if(response[0]) {
              req.session.userid = response[0].id;
              req.session.username = response[0].username;
              console.log(req.session);
              res.redirect('/');
          }else{
              res.redirect('/');
          }
       }).catch((err)=>{
           console.log(err);
      });

    });

module.exports = router;