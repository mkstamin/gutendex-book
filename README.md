# Gutendex Book Library

This is a simple web application that displays a list of books from the [Gutendex API](https://gutendex.com/) and allows users to search, filter by genre, and save books to a wishlist. The application is built using **HTML**, **vanilla CSS**, and **vanilla JavaScript**. It is fully responsive and works well on both desktop and mobile devices.

## Features

- **Book List Display**: Displays the list of books with the title, author, genre, and cover image.
- **Search Bar**: Real-time filtering of books based on the title.
- **Genre Filter**: Filter books based on genre using a dropdown menu.
- **Wishlist**: Users can add books to their wishlist, which is stored in `localStorage` and can be accessed across sessions.
- **Pagination**: Browse through the books using pagination.
- **Responsive Design**: Fully responsive layout for both desktop and mobile users.
- **Wishlist Page**: Separate page to view wishlisted books.

## Tech Stack

- **HTML**
- **Vanilla CSS**
- **Vanilla JavaScript**
- **Gutendex API**: [https://gutendex.com/](https://gutendex.com/)
- **localStorage**: Used to persist wishlist and filter preferences.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mkstamin/gutendex-book.git
   ```

2. Navigate to the project directory:

   ```bash
   cd gutendex-book
   ```

3. Open `index.html` in your browser to view the application.

## API Integration

The app uses the Gutendex API to fetch a list of books.

- **Endpoint**: `https://gutendex.com/books`
- **Fields Displayed**:
  - `title`: Title of the book
  - `authors`: Name of the author(s)
  - `id`: Unique ID of the book
  - `genres`: Genre of the book
  - `formats.image`: Cover image of the book

## Pages and Functionality

### 1. **Home Page**

- Displays the list of books.
- Includes a search bar to filter books by title.
- A dropdown filter to filter books by genre.
- Each book includes a clickable heart icon to add/remove from the wishlist.
- Displays detailed information about the book.
- Information includes title, author, genres, and a cover image.

### 3. **Wishlist Page**

- Displays all books added to the wishlist.
- Allows users to remove books from the wishlist.

## LocalStorage Usage

- **Wishlist**: The books added to the wishlist are stored in the browser's `localStorage`. This ensures that the wishlist is persistent even after a page reload or browser restart.
- **Search & Filter Preferences**: The user’s search and filter preferences are stored in `localStorage`.

## Pagination

- The application implements pagination to load the books in chunks.
- You can navigate between pages using "Previous" and "Next" buttons or click on page numbers directly.

## Responsive Design

- The app is designed using vanilla CSS to ensure that it is fully responsive.
- The layout adapts to various screen sizes to provide a smooth user experience on both desktop and mobile devices.

## How to Customize

1. **Styling**: You can modify the styles in the `style.css` file.
2. **JavaScript Logic**: All JavaScript code for fetching books, handling search, filters, wishlist, and pagination is located in the `app.js` file. You can extend or modify the logic as needed.

---
