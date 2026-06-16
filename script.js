import { products } from "./data.js";

console.log(products)

const cart = []

const rootElement = document.querySelector("#root")
const albumsContainer = document.getElementById("albums")

function createAlbumElement(album) {
    const albumContainer = document.createElement("div")
    const albumName = document.createElement("h1")
    const artistName = document.createElement("h2")

    // artistName.style.color = "#c7420e"
    artistName.classList.add("red")
    albumName.classList.add("red")

    albumContainer.classList.add("albumCard")

    albumName.innerHTML = `<u>Name</u>: ${album.name}`
    artistName.textContent = `Artist: ${album.vendor.name}`
    albumContainer.appendChild(albumName)
    albumName.insertAdjacentElement("beforebegin", artistName)
    // const trackList = document.createElement("ul")
    // trackList.innerHTML = createTrackListAsString(album.details)
    const buyButton = document.createElement("button")
    buyButton.textContent = `Buy for ${album.price}`
    buyButton.id = album.id
    const trackList = createTrackList(album.details)
    albumContainer.appendChild(trackList)
    albumContainer.appendChild(buyButton)
    return albumContainer
}

function createTrackList(tracks) {
    const trackList = document.createElement("ul")
    for (const track of tracks) {
        const trackItem = document.createElement("li")
        trackItem.textContent = track.name
        trackList.appendChild(trackItem)
    }
    return trackList
}

function createTrackListAsString(tracks) {
    return tracks.map(track => `<li>${track.name}</li>`).join("")
}

function createSearchBar() {
    const searchBar = document.createElement('div')
    searchBar.classList.add('search')
    const searchInput = document.createElement('input')
    const searchButton = document.createElement('button')
    searchButton.textContent = 'Search'

    searchButton.addEventListener('click', () => {
        const filteredAlbums = searchByName(searchInput.value)
        albumsContainer.innerHTML = ''
        filteredAlbums.forEach(album => albumsContainer.insertAdjacentElement('beforeend', createAlbumElement(album)))

    })

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim()
        console.log(searchTerm)
        if (searchTerm === '') {
            albumsContainer.innerHTML = ''
            products.forEach(album => albumsContainer.insertAdjacentElement('beforeend', createAlbumElement(album)))
        }
        else if (searchTerm.length > 3) {
            const filteredAlbums = searchByName(searchTerm)
            albumsContainer.innerHTML = ''
            filteredAlbums.forEach(album => albumsContainer.insertAdjacentElement('beforeend', createAlbumElement(album)))
        }
    })

    searchBar.appendChild(searchInput)
    searchBar.appendChild(searchButton)
    return searchBar
}

/* 
function insertAlbumDetailCard(album) {
    rootElement.insertAdjacentHTML("beforeend", `
    <div id="container" >
        <div class="album-card">
            <h1>${album.name}</h1>
            <div>${album.price}</div>
        </div>
        <div class="track-details">
            <div>${album.details.length}</div>
        </div>
    </div>`)
} */

window.addEventListener("DOMContentLoaded", main)

//Search every album which name contains the search term 

function searchByName(input) {
    // products
    return products.filter((album) => album.name.toLowerCase().includes(input.toLowerCase()))

}

function filterAlbumsCheaperThanAPrice(price) {
    return products.filter(album => album.price < price)
}


function main() {
    albumsContainer.insertAdjacentElement('beforebegin', createSearchBar())

    for (const album of products) {
        const albumElement = createAlbumElement(album)

        albumElement.addEventListener("click", (event) => {
            console.log('A')
            console.log(event.composedPath())            // event.stopPropagation()// stop the event from bubbling up to the
            //  parent element
            // console.log(event.target)
            if (event.target.tagName === "BUTTON") {
                cart.push(album)
            }
            console.log(cart)
        })
        // event bubling: if you click on the track list, the event will bubble 
        // up to the album card
        albumsContainer.appendChild(albumElement)
    }

    // event delegation: instead of adding an event listener to each album card,
    //  we can add an event listener to the parent element and check if the target is
    //  a button.
}
// insertAlbumDetailCard(products[0])
