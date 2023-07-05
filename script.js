const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photoArray = []

// Unsplash API
const count = 10
const apiKey = 'xs1t8rggbDNPLAVvZgTfTLcIN9jt727U0fWZ4Zcloec';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//  Checa se todas as imagens foram carregadas
function imageLoaded() {
    imagesLoaded++
    if(imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

// Helper Function para inserir atributos na DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Cria elementos para links & fotos, add a DOM
function displayPhotos(){
    totalImages = photoArray.length
    imagesLoaded = 0
    // executa a funçao para cada objeto em photoArray
    photoArray.forEach((photo) => {
        // Cria <a> para linkar ao Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Cria <img> para a foto
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Checa se a imagem ja foi carregada
        img.addEventListener('load', imageLoaded)
        // Coloca <img> dentro de <a>, entao coloca os dois dentro de ImageContainer
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Recebe as fotos da API Unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos()
    } catch (error){
        // Catch error
    }
}

//  Checa para ver se o scroll esta proximo do fim da pagina, Carrega mais fotos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos();
    }
})

// on load
getPhotos()