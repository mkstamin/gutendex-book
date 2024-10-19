// set variables
let bookData;
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

window.addEventListener("load", function () {
  handleDisplayBooks(currentPage);
});
