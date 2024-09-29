// Your API key (replace with your actual API key)
const apiKey = 'cef8cfffba7e435db7dae6fe16701d17';
const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

// Load default news articles on page load
document.addEventListener('DOMContentLoaded', loadDefaultNews);

// Function to load default news articles
function loadDefaultNews() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}

// Function to display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous articles

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}
