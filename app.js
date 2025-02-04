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

  /// selection
  addSelection(books);

  //displayBooks
  displayBooks(page, books);
}

let bookMap = new Map();
// show the books on the page
function displayBooks(page, books) {
  const bookList = document.getElementById("book-list");
  const pageInfo = document.getElementById("page-info");
  const preLoader = document.getElementById("pre-loader");
  const totalBooks = document.getElementById("total-books");

  if (!loading) {
    preLoader.classList.add("hidden");
  }

  bookList.innerHTML = ""; // Clear previous list
  pageInfo.innerHTML = page;
  totalBooks.innerHTML = books.length;

  if (books.length <= 0) {
    const h2 = document.createElement("h2");
    h2.classList.add("not-found");

    h2.innerHTML = "No books found!";
    bookList.appendChild(h2);
  } else {
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

// filter by genre
function filterByGenre(genre) {
  if (genre === "all") return displayBooks(currentPage, bookData);

  // set genre to localStorage
  localStorage.setItem("genre", genre);

  const filterGon = bookData.map((b) => {
    return {
      ...b,
      genre: b.bookshelves
        .filter((g) => g.startsWith("Browsing:"))
        .map((g) => g.replace("Browsing:", " ").trim()),
    };
  });

  const filteredBooks = filterGon.filter((book) => book.genre.includes(genre));

  //display book
  displayBooks(currentPage, filteredBooks);
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

  // set searchQuery to localStorage
  localStorage.setItem("searchQuery", searchQuery);

  const filterBooks = bookData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery)
  );

  //display book
  displayBooks(currentPage, filterBooks);
});

// filter by genre
document
  .getElementById("genre-filter")
  .addEventListener("change", function (e) {
    const genre = e.target.value;

    // filter By Genre
    filterByGenre(genre);
  });

// pagination next page
document.getElementById("next-page").addEventListener("click", function () {
  const preLoader = document.getElementById("pre-loader");
  preLoader.classList.remove("hidden");
  currentPage++;
  handleDisplayBooks(currentPage);
});

// pagination previous page
document.getElementById("prev-page").addEventListener("click", function () {
  const preLoader = document.getElementById("pre-loader");

  if (currentPage > 1) {
    loading = true;
    preLoader.classList.remove("hidden");
    currentPage--;
    handleDisplayBooks(currentPage);
  }
});

window.addEventListener("load", function () {
  // const lastFilter = document.getElementById("last-filter");
  // const lastSearch = document.getElementById("last-search");

  // // get data from local storage
  // const savedSearch = localStorage.getItem("searchQuery");
  // const savedGenre = localStorage.getItem("genre");

  // first time call
  handleDisplayBooks(currentPage);

  // // Display saved search query if it exists
  // if (savedSearch) {
  //   lastSearch.innerHTML = savedSearch;
  //   lastSearch.parentElement.classList.remove("hidden");
  // } else {
  //   lastSearch.parentElement.classList.add("hidden");
  // }

  // // Display saved genre filter if it exists
  // if (savedGenre) {
  //   lastFilter.innerHTML = savedGenre;
  //   lastFilter.parentElement.classList.remove("hidden");
  // } else {
  //   lastFilter.parentElement.classList.add("hidden");
  // }
});
