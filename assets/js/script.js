const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("song-list")
    const product = document.querySelectorAll(".contain-img")
    const pname = storeitems.getElementsByTagName("h4")

    for (var i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName('h4')[0];

        if (match) {
            let textvalue = match.textContent || match.innerHTML

            if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }
}


let songs = [{ "title": "No.1 Party Anthem", "artist": "Arctic Monkeys", "img": "./assets/img/logo1.png" }, { "title": "R U Mine?", "artist": "Arctic Monkeys", "img": "./assets/img/logo1.png" }, { "title": "Do I Wanna Know?", "artist": "Arctic Monkeys", "img": "./assets/img/logo1.png" }, { "title": "I Wanna Be Yours", "artist": "Arctic Monkeys", "img": "./assets/img/logo1.png" }, { "title": "505", "artist": "Arctic Monkeys", "img": "./assets/img/logo2.png" }, { "title": "Fluorescent Adolescent", "artist": "Arctic Monkeys", "img": "./assets/img/logo2.png" }, { "title": "Welcome to the Black Parade", "artist": "My Chemical Romance", "img": "./assets/img/logo3.jpg" }, { "title": "Cancer", "artist": "My Chemical Romance", "img": "./assets/img/logo3.jpg" }, { "title": "I Don't Love You", "artist": "My Chemical Romance", "img": "./assets/img/logo3.jpg" }, { "title": "Don't Look Back In Anger", "artist": "Oasis", "img": "./assets/img/logo4.jpg" }, { "title": "She's Electric", "artist": "Oasis", "img": "./assets/img/logo4.jpg" }, { "title": "Bohemian Rhapsody", "artist": "Queen", "img": "./assets/img/logo5.jpg" }, { "title": "Killer Queen", "artist": "Queen", "img": "./assets/img/logo5.jpg" }, { "title": "Another One Bites The Dust", "artist": "Queen", "img": "./assets/img/logo5.jpg" }]

load(songs)

function load(arr) {
    let dom = `<div class="contain-img" onclick="playMusic(this)" mp3="SONGURL">
        <img src="IMG">
        <div class="text-box">
            <h4>NAME</h4>
            <p>ARTIST</p>
        </div>
    </div>`
    // loop arr

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let songName = "./assets/audio/" + element.title.toLowerCase().split(" ").join("_") + ".mp3"
        // replace symbol like ?= etc to none on songName
        songName = songName.replace(/[?]/g, "")
        let temp = dom
        temp = temp.replace('IMG', element.img)
        temp = temp.replace('NAME', element.title)
        temp = temp.replace('ARTIST', element.artist)
        temp = temp.replace('SONGURL', songName)
        document.getElementById('song-list').innerHTML += temp
    }
}

let currentSong
function playMusic(element) {
    const audio = new Audio(element.getAttribute('mp3'))
    let current = document.querySelector(".currently-playing")

    if (current.querySelector(".currently-playing__controls__play").classList.contains("fa-pause")) {
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-pause")
        current.querySelector(".currently-playing__controls__play").classList.add("fa-play")
    } else {
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-play")
        current.querySelector(".currently-playing__controls__play").classList.add("fa-pause")
    }

    if (!currentSong) {
        currentSong = audio
        currentSong.play()
        document.querySelector(".currently-playing__controls__play").classList.add("fa-pause")
    } else if (currentSong && !currentSong.paused && currentSong.src === audio.src) {
        // set .fa-play to .fa-pause
        currentSong.pause()
    } else if (currentSong && currentSong.paused && currentSong.src === audio.src) {
        // set .fa-pause to .fa-play
        currentSong.play()
    } else if (currentSong && currentSong.src !== audio.src) {
        currentSong.pause()
        currentSong = audio
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-play")
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-pause")
        current.querySelector(".currently-playing__controls__play").classList.add("fa-pause")
        currentSong.play()
    }
    current.style.display = "flex"
    current.querySelector("img").setAttribute("src", element.querySelector("img").getAttribute("src"))
    current.querySelector("h3").innerHTML = element.querySelector("h4").innerHTML
    current.querySelector("h4").innerHTML = element.querySelector("p").innerHTML

    currentSong.addEventListener("loadedmetadata", function () {
        const duration = currentSong.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.round(duration % 60);
        const durationStr = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
        console.log("Duration: " + durationStr);
        current.querySelector(".currently-playing__info__timer > .duration").innerHTML = durationStr
    });
    // set currentSong duration
    currentSong.addEventListener("timeupdate", function () {
        // translate currentSong.currentTime to minutes and seconds like duration
        const currentTime = currentSong.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.round(currentTime % 60);
        const durationStr = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

        current.querySelector(".currently-playing__info__timer > .timer").innerHTML = durationStr

    });

    //   toggle pause on currently-playing__controls__play


}

function pauseMusic() {
    let current = document.querySelector(".currently-playing")
    if (current.querySelector(".currently-playing__controls__play").classList.contains("fa-pause")) {
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-pause")
        current.querySelector(".currently-playing__controls__play").classList.add("fa-play")
    } else {
        current.querySelector(".currently-playing__controls__play").classList.remove("fa-play")
        current.querySelector(".currently-playing__controls__play").classList.add("fa-pause")
    }
    if (currentSong && !currentSong.paused) {
        // set .fa-play to .fa-pause
        currentSong.pause()
    } else if (currentSong && currentSong.paused) {
        // set .fa-pause to .fa-play
        currentSong.play()
    }
}

function next() {
    // get currently-playing__info__title and next according to songs array
    let current = document.querySelector(".currently-playing")
    let currentSongName = current.querySelector("h3").innerText

    let nextSong = songs.find(song => song.title === currentSongName)
    let nextSongIndex = songs.indexOf(nextSong)
    if (nextSongIndex === songs.length - 1) {
        nextSongIndex = -1
    }
    let nextSongName = songs[nextSongIndex + 1].title
    let nextSongElement = document.querySelector(`[mp3*="${nextSongName.toLowerCase().split(" ").join("_").replace(/[?]/g, "")}"]`)
    playMusic(nextSongElement)
}

function toggleNav() {
    var navbarLinks = document.getElementById("navbar-links");
    if (navbarLinks.style.display === "block") {
        navbarLinks.style.display = "none";
    } else {
        navbarLinks.style.display = "block";
    }
}


function prev() {
    // get currently-playing__info__title and prev according to songs array
    let current = document.querySelector(".currently-playing")
    let currentSongName = current.querySelector("h3").innerText

    let prevSong = songs.find(song => song.title === currentSongName)
    let prevSongIndex = songs.indexOf(prevSong)
    if (prevSongIndex === 0) {
        prevSongIndex = songs.length
    }
    let prevSongName = songs[prevSongIndex - 1].title
    let prevSongElement = document.querySelector(`[mp3*="${prevSongName.toLowerCase().split(" ").join("_").replace(/[?]/g, "")}"]`)
    playMusic(prevSongElement)
}