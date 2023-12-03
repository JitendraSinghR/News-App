const apiKey = "e84651024ca94208b4a5021da686dec2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchNews("India");
});

async function fetchNews(query) {
  try {
    const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      bindData(data.articles);
    } else {
      console.error(
        "Error fetching news:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function bindData(articles) {
  const cardContainer = document.querySelector(".card-container");
  const newsTemplateCard = document.querySelector(".template-news-card");
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    } else {
      const cardClone = newsTemplateCard.content.cloneNode(true);
      const cardImage = cardClone.querySelector(".card-image");
      const newsTitle = cardClone.querySelector("#news-title");
      const newsSource = cardClone.querySelector("#news-source");
      const newsDesc = cardClone.querySelector("#news-desc");

      cardImage.src = article.urlToImage;
      newsTitle.innerHTML = article.title;

      newsDesc.innerHTML = article.description;
      const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      });
      newsSource.innerHTML = `${article.source.name} . ${date}`;

      cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });
      cardContainer.appendChild(cardClone);
    }
  });
}

let currSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currSelectedNav?.classList.remove("active");
  currSelectedNav = navItem;
  currSelectedNav.classList.add("active");
}

const newsInput = document.querySelector(".news-input");
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
  const query = newsInput.value;
  if (!query) {
    return;
  } else {
    fetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
  }
});
