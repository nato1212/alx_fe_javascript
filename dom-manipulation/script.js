// Array of quotes
let quotes = [
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

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Update quoteDisplay using innerHTML
  quoteDisplay.innerHTML = `
        <p>"${quotes[randomIndex].text}"</p>
        <small>Category: ${quotes[randomIndex].category}</small>
    `;
}

// Function to create and insert the quote input form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
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
    alert("Quote added successfully!");
    showRandomQuote(); // Show the newly added quote
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Event listener for showing a random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Dynamically add the quote input form
createAddQuoteForm();

// Show a random quote on page load
document.addEventListener("DOMContentLoaded", showRandomQuote);
