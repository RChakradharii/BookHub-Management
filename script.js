// Dark Mode Toggle
document.getElementById('toggle-dark-mode').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Search and Display Books
document.getElementById('search-bar').addEventListener('keyup', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=AIzaSyDHyi3KVhlvtYIgQnq8lpfBhmEfS0T5yAg`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            displayBooks(data.items); // Google API returns 'items'
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('book-list').innerHTML = '<p>Failed to load books. Please try again later.</p>';
        }
    } else {
        document.getElementById('book-list').innerHTML = ''; // Clear the book list if the query is too short
    }
});

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; // Clear previous search results
    if (!books || books.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }
    books.forEach(book => {
        const bookInfo = book.volumeInfo;

        // Fetch cover image if available
        const coverImage = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150?text=No+Cover+Available';
        
        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
        const language = bookInfo.language ? bookInfo.language.toUpperCase() : 'Not Available';

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <img src="${coverImage}" alt="Book Cover" class="book-cover">
            <h3>${bookInfo.title}</h3>
            <p>${authors}</p>
            <p class="language-info">Language: ${language}</p>
            <a href="${bookInfo.infoLink}" target="_blank" class="read-button">Read Book</a>
            <button class="view-details-button" onclick="showBookDetails('${book.id}')">View Details</button>
        `;
        bookList.appendChild(bookCard);
    });
}

function showBookDetails(bookId) {
    // Fetch and display book details
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyDHyi3KVhlvtYIgQnq8lpfBhmEfS0T5yAg`)
        .then(response => response.json())
        .then(book => {
            const bookInfo = book.volumeInfo;
            const description = bookInfo.description ? bookInfo.description : 'No description available.';
            const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';

            alert(`Title: ${bookInfo.title}\nAuthor: ${authors}\nDescription: ${description}`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch book details. Please try again later.');
        });
}
