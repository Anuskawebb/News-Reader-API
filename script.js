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
        // Only display if the article has a title and URL
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
            `;
            
            newsContainer.appendChild(newsCard);
        }
    });
}

// Search Function
function searchNews() {
    const query = document.getElementById('search-input').value;
    if (query) {
        const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displayNews(data.articles);
            })
            .catch(error => console.error('Error fetching news:', error));
    }
}

// Saved and Favorites (Placeholder functions)
function viewSaved() {
    alert('View saved articles functionality coming soon!');
}

function viewFavorites() {
    alert('View favorite articles functionality coming soon!');
}
// Sample news data
const newsData = [
    {
        title: "Breaking News 1",
        description: "This is the first breaking news description.",
        imageUrl: "https://via.placeholder.com/320x200"
    },
    {
        title: "Breaking News 2",
        description: "This is the second breaking news description.",
        imageUrl: "https://via.placeholder.com/320x200"
    },
    // Add more news objects as needed
];

// Render the news cards on the page
function renderNews(newsList) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ''; // Clear previous content

    newsList.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <img src="${news.imageUrl}" alt="${news.title}">
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <button class="save-btn" onclick="saveNews('${news.title}', '${news.description}', '${news.imageUrl}')">Save</button>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Save news to localStorage
function saveNews(title, description, imageUrl) {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    
    // Check if the news already exists in savedNews to avoid duplication
    const isAlreadySaved = savedNews.some(news => news.title === title);
    
    if (!isAlreadySaved) {
        savedNews.push({ title, description, imageUrl });
        localStorage.setItem('savedNews', JSON.stringify(savedNews));
        alert('News saved successfully!');
    } else {
        alert('News already saved!');
    }
}

// Display saved news
function renderSavedNews() {
    const savedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    
    if (savedNews.length === 0) {
        alert('No saved news found.');
        return;
    }

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ''; // Clear previous content

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

// Clear saved news
function clearSavedNews() {
    localStorage.removeItem('savedNews');
    alert('Saved news cleared!');
    renderSavedNews();
}

// Render the news on page load
document.addEventListener('DOMContentLoaded', () => {
    renderNews(newsData);

    // Optional: Render saved news in a separate section if needed
    // renderSavedNews();
});
 document.addEventListener()