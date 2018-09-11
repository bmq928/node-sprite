const nsg = require('node-sprite-generator')


nsg({
    src: [
        'images/*'
    ],
    spritePath: 'images/sprites.png',
    stylesheetPath: 'style.css',    
    stylesheet: 'css',
    compositor: 'jimp',
    stylesheetOptions: {
        prefix: 'sprite-'
    }
}, function (err) {
    if (err) console.log(err)
})