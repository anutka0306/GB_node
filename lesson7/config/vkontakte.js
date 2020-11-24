const config ={
    clientID: "7669058",
    clientSecret: "8X5sm7mJeJm6nPMPY8Uw",
    callbackURL:  "http://localhost:3000/auth/vkontakte/callback",
    scope: ['email'],
    profileFields: ['email', 'city', 'bdate']
};

module.exports = {
    config
}