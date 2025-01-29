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

  filteredQuotes.forEach((quote) => {
    const quoteElement = document.createElement("div");
    quoteElement.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
    quoteDisplay.appendChild(quoteElement);
  });
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
