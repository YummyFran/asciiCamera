const camera = document.getElementById("vid")
const canvas = document.getElementById("canvas")
const modal = document.getElementsByClassName("modal")[0]
const webcam = new Webcam(camera, "user", canvas)

const capture = async () => {
    const picture = webcam.snap()
    await imageToASCII(picture, 420).then( el => {
        modal.innerText = el
        modal.style.display = 'block'
    })

}

const imageToASCII = async (picture, size) => {
    try {
        const image = await Jimp.read(picture)
        const asciiChars = '@%#*+=-:. '
    
        let asciiText = ''
    
        image.resize(image.getWidth(), image.getHeight())
        image.grayscale()
        
        // modal.style.fontSize = `${image.getHeight()/image.getHeight() * 1.3}px`
        for(let y = 0; y < image.getHeight(); y++) {
            for(let x = 0; x < image.getWidth(); x++) {
                const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
                const brightness = (r + g + b) / 3;
                const asciiIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
                
                asciiText += asciiChars.charAt(asciiIndex);
            }
            asciiText += '\n';
        }
    
        return asciiText
    } catch (error) {
        console.error("Error:", error)
    }
}

webcam.start()