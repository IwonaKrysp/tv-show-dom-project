const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");
const selectMenu = document.getElementById("select-input");

let currentEpisodes = [];

function setup() {
  
  sendRequest(82).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
    makeSelectMenuForEpisodes(currentEpisodes);
  });

  searchBox.addEventListener("keyup", onSearchKeyUp);
  selectMenu.addEventListener("change", onChange);
}

function makeSelectMenuForEpisodes(episodeList) {
  const showAll = document.createElement("option");
  showAll.innerText = "All episodes";
  showAll.value = "SHOW_ALL";
  selectMenu.appendChild(showAll);

  episodeList.forEach((episode) => {
    const listOption = document.createElement("option");
    const episodeString = `${formatSeriesAndEpisode(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    listOption.innerText = episodeString;
    listOption.value = episode.id;
    selectMenu.appendChild(listOption);
  });
}

function formatSeriesAndEpisode(season, number) {
  function padTheNumber(num) {
    return num.toString().padStart(2, "0");
  }
  return `S${padTheNumber(season)}E${padTheNumber(number)}`;
}


function makePageForEpisodes(episodeList) {
  
  const episodeContainer = document.getElementById("episode-list");
  episodeContainer.innerHTML = "";

  episodeList.forEach((e) => {
    const episode = document.createElement("div");
    const heading = document.createElement("h3");
    const img = document.createElement("img");
    const summary = document.createElement("p");

    heading.innerText = `${e.name} - ${formatSeriesAndEpisode(
      e.season,
      e.number
    )}`;

    summary.innerHTML = e.summary;

    img.src = e.image.medium;

    episode.className = "episode";

    episode.appendChild(heading);
    episode.appendChild(img);
    episode.appendChild(summary);
    episodeContainer.appendChild(episode);
  });
}


function onSearchKeyUp(event){
 const searchTerm = event.target.value.toLowerCase();

 const filteredEpisodes = currentEpisodes.filter((e) => {  
   const episodeName = e.name.toLowerCase();
   const episodeSummary = e.summary.toLowerCase();

  return episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm);
 });

 const filteredCount = filteredEpisodes.length;
 const currentCount = currentEpisodes.length;

 const countString = `Displaying ${filteredCount} / ${currentCount} episodes`;

searchCount.innerText = countString;

 makePageForEpisodes(filteredEpisodes);
}

function onChange(event) {
  const episodeId = event.target.value;
  if (episodeId === "SHOW_ALL") {
    makePageForEpisodes(currentEpisodes);
  } else {
    const filteredEpisodes = currentEpisodes.filter((e) => {
      return e.id === Number(episodeId);
    });
    makePageForEpisodes(filteredEpisodes);
  }
}

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`; 

return fetch(urlForTheRequest)
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((e) => console.log(e));
}

window.onload = setup;
