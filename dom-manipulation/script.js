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

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");

  quoteDisplay.innerHTML = `
        <p>"${quotes[randomIndex].text}"</p>
        <small>Category: ${quotes[randomIndex].category}</small>
    `;

  // Save last displayed quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(quotes[randomIndex]));
}

// Restore last quote on page load
function restoreLastQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    document.getElementById("quoteDisplay").innerHTML = `
            <p>"${lastQuote.text}"</p>
            <small>Category: ${lastQuote.category}</small>
        `;
  }
}

// Function to create and insert the quote input form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
        <button onclick="exportQuotes()">Export Quotes (JSON)</button>
        <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
    `;
  document.body.appendChild(formContainer);
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
    alert("Quote added successfully!");
    showRandomQuote();
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
        alert("Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for showing a random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Restore last displayed quote
document.addEventListener("DOMContentLoaded", () => {
  restoreLastQuote();
  createAddQuoteForm();
  showRandomQuote();
});
