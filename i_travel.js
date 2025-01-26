function getRecommendation() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const recommendationsContainer = document.getElementById('recommendations');

    fetch('i_travel_api.json')
        .then((response) => response.json())
        .then((data) => {
            let searchResults = [];

            if (searchInput.includes('beach')) {
                searchResults = data.beaches;
            } else if (searchInput.includes('temple')) {
                searchResults = data.temples;
            } else if (searchInput.includes('countr')) {
                searchResults = data.countries.flatMap((country) => country.cities);
            }

            if (searchResults.length > 0) {
                recommendationsContainer.innerHTML = searchResults
                    .map((item) => `
                        <div class="recommendation-card">
                            <img src="${item.imageUrl}" alt="${item.name}" />
                            <div class="card-content">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <button class="visit-btn">Visit</button>
                            </div>
                        </div>`
                    ).join('');
                recommendationsContainer.style.display = 'block';
            } else {
                recommendationsContainer.innerHTML = '<p>No results found. Try to use key inputs: temple, beach, country.</p>';
                recommendationsContainer.style.display = 'block';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            recommendationsContainer.innerHTML = '<p>An error occurred while fetching data.</p>';
            recommendationsContainer.style.display = 'block';
        });
}

function clearRecommendations() {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').style.display = 'none';
}

document.getElementById('searchBtn').addEventListener('click', getRecommendation);
document.getElementById('clearBtn').addEventListener('click', clearRecommendations);
