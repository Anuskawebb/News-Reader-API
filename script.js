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
        if (article.title && article.url) {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');

            const newsImage = article.urlToImage ? article.urlToImage : 'default-image.jpg'; // Fallback image
            const newsDescription = article.description ? article.description : 'No description available';

            newsCard.innerHTML = `
                <img src="${newsImage}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${newsDescription}</p>
                <a href="${article.url}" target="_blank">Read More</a>
                <button class="save-btn" onclick="saveNews('${article.title}', '${newsDescription}', '${newsImage}')">Save</button>
                <button class="fav-btn" onclick="addToFavorites('${article.title}', '${newsDescription}', '${newsImage}')">Add to Favourites</button>
            `;
            
            newsContainer.appendChild(newsCard);
        }
    });
}

// Save news to localStorage
function saveNews(title, description, imageUrl) {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    const isAlreadySaved = savedNews.some(news => news.title === title);
    
    if (!isAlreadySaved) {
        savedNews.push({ title, description, imageUrl });
        localStorage.setItem('savedNews', JSON.stringify(savedNews));
        alert('News saved successfully!');
    } else {
        alert('News already saved!');
    }
}

// Add news to favourites in localStorage
function addToFavorites(title, description, imageUrl) {
    const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews')) || [];
    const isAlreadyFavorite = favoriteNews.some(news => news.title === title);
    
    if (!isAlreadyFavorite) {
        favoriteNews.push({ title, description, imageUrl });
        localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));
        alert('News added to favorites!');
    } else {
        alert('News already in favorites!');
    }
}

// View saved news
function viewSaved() {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous articles

    if (savedNews.length === 0) {
        newsContainer.innerHTML = '<p>No saved news.</p>';
    } else {
        savedNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <img src="${news.imageUrl}" alt="${news.title}">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
            `;
            newsContainer.appendChild(newsCard);
        });
    }
}

// View favorite news
function viewFavorites() {
    const favoriteNews = JSON.parse(localStorage.getItem('favoriteNews')) || [];
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous articles

    if (favoriteNews.length === 0) {
        newsContainer.innerHTML = '<p>No favorite news.</p>';
    } else {
        favoriteNews.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <img src="${news.imageUrl}" alt="${news.title}">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
            `;
            newsContainer.appendChild(newsCard);
        });
    }
}

// Function to search for news
function searchNews() {
    const query = document.getElementById('search-input').value;
    if (query) {
        const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displayNews(data.articles);
            })
            .catch(error => console.error('Error searching news:', error));
    } else {
        alert('Please enter a search term');
    }
}
