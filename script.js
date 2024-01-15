function getRandomMeme() {
    fetch("https://api.giphy.com/v1/gifs/random?api_key=OzWVmpz12MbWvPz4zYfjDN0IFxtKRIfA")
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.data.image_original_url;
            displayMeme(imageUrl);
        })
        .catch(error => {
            console.error("Error fetching meme:", error);
        });

    updateTrendingMemes();
}

function displayMeme(url) {
    const memeImg = document.getElementById("memeImg");
    memeImg.src = url;
}

function shareOnTwitter() {
    const memeImg = document.getElementById("memeImg");
    const tweetText = encodeURIComponent("Check out this whacky meme! #WhackyMemeGenerator");
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${memeImg.src}`;
    window.open(tweetUrl, '_blank');
}

function updateTrendingMemes() {
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=OzWVmpz12MbWvPz4zYfjDN0IFxtKRIfA")
        .then(response => response.json())
        .then(data => {
            const trendingList = document.getElementById("trendingList");
            trendingList.innerHTML = "";
            data.data.forEach(meme => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<img src="${meme.images.fixed_height.url}" alt="Trending Meme">`;
                listItem.addEventListener("click", () => displayMeme(meme.images.original.url));
                trendingList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching trending memes:", error);
        });
}