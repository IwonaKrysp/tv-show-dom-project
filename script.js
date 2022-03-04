//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 
}

function makePageForEpisodes(episodeList) {
  const episodeContainer = document.getElementById("episode-list");

  episodeList.forEach((e) => {
    const episode = document.createElement("div");
    const heading = document.createElement("h3");
    const img = document.createElement("img");
    const summary = document.createElement("p");

    heading.innerHTML = `${e.name} - 
  S${e.season.toString().padStart(2, "0")}E${e.number
      .toString()
      .padStart(2, "0")}`;

    summary.innerHTML = e.summary;

    img.src = e.image.medium;

    episode.className = "episode";

    episode.appendChild(heading);
    episode.appendChild(img);
    episode.appendChild(summary);
    episodeContainer.appendChild(episode);
  });
}

window.onload = setup;
