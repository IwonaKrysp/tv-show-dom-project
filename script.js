const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 
  //_____________________________event listener________
  searchBox.addEventListener("keyup", onSearchKeyUp);
}

function makePageForEpisodes(episodeList) {
  const episodeContainer = document.getElementById("episode-list");
  episodeContainer.innerHTML = "";

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


function onSearchKeyUp(event){
 const searchTerm = event.target.value.toLowerCase();
 const allEpisodes = getAllEpisodes();

 const filteredEpisodes = allEpisodes.filter((e) => {  
   const episodeName = e.name.toLowerCase();
   const episodeSummary = e.summary.toLowerCase();

  return episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm);
 });

 const filteredCount = filteredEpisodes.length;
 const allCount = allEpisodes.length;

 const countString = `Displaying ${filteredCount} episodes from ${allCount}`;

searchCount.innerText = countString;

 makePageForEpisodes(filteredEpisodes);
}




window.onload = setup;
