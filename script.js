import { products } from "./data.js";

console.log(products)

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
    artistName.innerText = `Artist: ${album.vendor.name}`
    albumContainer.appendChild(albumName)
    albumName.insertAdjacentElement("beforebegin", artistName)
    // const trackList = document.createElement("ul")
    // trackList.innerHTML = createTrackListAsString(album.details)
    const trackList = createTrackList(album.details)
    albumContainer.appendChild(trackList)
    return albumContainer
}

function createTrackList(tracks) {
    const trackList = document.createElement("ul")
    for (const track of tracks) {
        const trackItem = document.createElement("li")
        trackItem.innerText = track.name
        trackList.appendChild(trackItem)
    }
    return trackList
}

function createTrackListAsString(tracks) {
    return tracks.map(track => `<li>${track.name}</li>`).join("")
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

window.addEventListener("load", main)

function main() {

    for (const album of products) {
        const albumElement = createAlbumElement(album)
        albumsContainer.appendChild(albumElement)
    }
}

// insertAlbumDetailCard(products[0])
