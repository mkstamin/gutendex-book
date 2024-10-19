// set variables
let bookData;
let currentPage = 1;
let loading = true;

// API call and return data
async function fetchBooks(pageNumber) {
  try {
    const response = await fetch(
      `https://gutendex.com/books/?page=${pageNumber}`
    );
    const data = await response.json();
    bookData = data.results;

    loading = false;

    return data.results;
  } catch (error) {
    console.log(error.message);
    loading = false;

    return [];
  }
}

// Display books on the page
async function handleDisplayBooks(page) {
  const books = await fetchBooks(page);

  //displayBooks
  displayBooks(page, books);
}

let bookMap = new Map();
// show the books on the page
function displayBooks(page, books) {
  const bookList = document.getElementById("book-list");
  const pageInfo = document.getElementById("page-info");
  const preLoader = document.getElementById("pre-loader");

  if (!loading) {
    preLoader.classList.add("hidden");
  }

  bookList.innerHTML = ""; // Clear previous list
  pageInfo.innerHTML = page;

  books.forEach((book) => {
    bookMap.set(book.id, book);
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    bookItem.innerHTML = `
              <img src="${
                book.formats["image/jpeg"] || "default.jpg"
              }" alt="Book Cover">
              <h3 class="book-title">${book.title}</h3>
              <p class="book-author">by ${
                book.authors[0] ? book.authors[0].name : "Unknown"
              }</p>
              <button class="wishlist-btn ${
                checkWishList(book.id) && "wish-listed"
              }" data-id="${book.id}">♡ Wishlist</button>
          `;
    bookList.appendChild(bookItem);
  });
}

// add genres section data
function addSelection(books) {
  // Get the select element by its ID
  const genreSelect = document.getElementById("genre-filter");

  const filterGon = books.map((b) => {
    return {
      gon: b.bookshelves
        .filter((g) => g.startsWith("Browsing:"))
        .map((g) => g.replace("Browsing:", " ").trim()),
    };
  });

  const uniqueGon = [...new Set(filterGon.flatMap((item) => item.gon))];

  // Loop through the unique genres and add them as options
  uniqueGon.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;

    genreSelect.appendChild(option);
  });
}

// check the book is marked as WishList or  not
function checkWishList(id) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  return wishlist.some((book) => book.id === id);
}

// toggle the wishlist
function toggleWishlist(book) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const findWishlist = wishlist.find((itm) => itm.id === book.id);

  if (findWishlist) {
    const index = wishlist.findIndex((w) => w.id === book.id);
    wishlist.splice(index, 1);
  } else {
    wishlist.push(book);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// add the book as a wishlist
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("wishlist-btn")) {
    const bookId = e.target.dataset.id;
    const book = bookMap.get(parseInt(bookId));

    toggleWishlist(book);

    e.target.classList.toggle("wish-listed");
  }
});

// show all wish lists books
document
  .querySelector('a[href="#wishlist"]')
  .addEventListener("click", function displayWishlist() {
    const genreFilter = document.getElementById("genre-filter");
    const searchBar = document.getElementById("search-bar");
    const pagination = document.getElementById("pagination");

    genreFilter.classList.add("hidden");
    searchBar.classList.add("hidden");
    pagination.classList.add("hidden");

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    //displayBooks
    displayBooks(currentPage, wishlist);
  });

// implement light search
document.getElementById("search-bar").addEventListener("input", function (e) {
  const searchQuery = e.target.value.toLowerCase();
  const filterBooks = bookData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery)
  );

  //display book
  displayBooks(currentPage, filterBooks);
});

window.addEventListener("load", function () {
  handleDisplayBooks(currentPage);
});
