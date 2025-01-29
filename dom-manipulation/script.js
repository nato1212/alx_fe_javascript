// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The journey of a thousand miles begins with one step.",
    category: "Motivation",
  },
  { text: "Happiness depends upon ourselves.", category: "Happiness" },
  {
    text: "Be yourself; everyone else is already taken.",
    category: "Inspiration",
  },
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to populate category dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options except "All Categories"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Get unique categories
  const categories = [...new Set(quotes.map((q) => q.category))];

  // Append categories to the dropdown
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category from local storage
  const lastSelectedCategory =
    localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = lastSelectedCategory;
}

// Function to display quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear previous quotes

  if (filteredQuotes.length > 0) {
    // Pick a random quote from the filtered list
    const randomQuote =
      filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    const quoteElement = document.createElement("div");
    quoteElement.innerHTML = `<p>"${randomQuote.text}"</p><small>Category: ${randomQuote.category}</small>`;
    quoteDisplay.appendChild(quoteElement);
  } else {
    quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
  }
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Save updated quotes to local storage
    populateCategories(); // Update categories
    filterQuotes(); // Refresh displayed quotes
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Function to export quotes as a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuote").addEventListener("click", addQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
document
  .getElementById("importFile")
  .addEventListener("change", importFromJsonFile);

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  filterQuotes();
});

const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API URL

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();

    // Convert API response to match our quote format
    const formattedQuotes = serverQuotes.map((item) => ({
      text: item.title, // Assuming title is the quote
      category: "General", // Default category
    }));

    syncQuotes(formattedQuotes);
  } catch (error) {
    console.error("Error fetching server quotes:", error);
  }
}

// Function to sync quotes (store in local storage and notify user)
function syncQuotes(serverQuotes) {
  let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Filter out duplicates (assuming text uniqueness)
  serverQuotes.forEach((serverQuote) => {
    if (
      !localQuotes.some((localQuote) => localQuote.text === serverQuote.text)
    ) {
      localQuotes.push(serverQuote);
    }
  });

  localStorage.setItem("quotes", JSON.stringify(localQuotes));
  notifyUser("Quotes synced with server!");
}

// Function to post a new quote to the server (using POST method)
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(quote), // Post the quote as JSON
    });

    const data = await response.json();
    console.log("Quote posted successfully:", data);
    notifyUser("Quote posted to server!");
  } catch (error) {
    console.error("Error posting quote:", error);
    notifyUser("Failed to post quote.");
  }
}

// Function to handle new quote submission
function addNewQuote() {
  const newQuote = {
    text: "This is a new quote!", // Example quote text
    category: "Motivation", // Example category
  };

  // Post the new quote to the server
  postQuoteToServer(newQuote);
}

// Notification function
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "fixed";
  notification.style.bottom = "10px";
  notification.style.right = "10px";
  notification.style.padding = "10px";
  notification.style.background = "green";
  notification.style.color = "white";
  notification.style.borderRadius = "5px";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Automatically fetch quotes every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Example of posting a new quote to the server after 5 seconds
setTimeout(addNewQuote, 5000);
