const nsg = require('node-sprite-generator')
const path = require('path')
const fs = require('fs')

let DEFAULT_INPUT_IMG = 'images'
let DEFAULT_OUTPUT_CSS = 'output/style.css'
let DEFAULT_OUTPUT_IMG = 'output/sprites.png'

main()

function getInput() {
    const inputImg = '--input'
    const outputCss = '--output-css'
    const outputImg = '--output-img'

    const argvs = process.argv.filter((val, i) => i !== 0 && i !== 1)
    if (argvs.indexOf(inputImg)) DEFAULT_INPUT_IMG = argvs[argvs.indexOf(inputImg) + 1]
    if (argvs.indexOf(outputCss)) DEFAULT_OUTPUT_CSS = argvs[argvs.indexOf(outputCss) + 1]
    if (argvs.indexOf(outputImg)) DEFAULT_OUTPUT_IMG = argvs[argvs.indexOf(outputImg) + 1]
}

function geneate() {
    nsg({
        src: [
            // 'images/*'
            makeBlob(DEFAULT_INPUT_IMG)
        ],
        spritePath: DEFAULT_OUTPUT_IMG,
        stylesheetPath: DEFAULT_OUTPUT_CSS,
        stylesheet: 'css',
        compositor: 'jimp',
        stylesheetOptions: {
            //prefix: 'sprite-',
            nameMapping
        }
    }, function (err) {
        if (err) return console.log(err)

        fs.readdir('images', (err, files) => {

            if (err) return console.log(err)

            const classNames = files
                .map(filePath => `.${nameMapping(filePath)}`)
                .reduce((acc, cur, i, arr) => {
                    return i !== arr.length - 1 ? acc + cur + ',' : acc + cur
                }, '')

            const css = `\n${classNames} {display: inline-block;overflow: hidden; text-indent: -9999px; text-align: left;}`

            fs.appendFile(DEFAULT_OUTPUT_CSS, css, err => {
                if (err) console.log(err)
            })
        })
    })
}



function nameMapping(filePath) {
    const file = path.basename(filePath)
    const fileName = file.split('.')[0]

    //tranform 
    // change all _ to -
    return fileName.replace(/\_/g, '-')
}

function makeBlob(filePath) {
    return filePath + '/*'
}

function main() {
    getInput()
    geneate()
}
