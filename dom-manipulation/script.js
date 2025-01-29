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

  // Ensure the quoteDisplay exists before modifying it
  if (quoteDisplay) {
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
  } else {
    console.error("Element with id 'quoteDisplay' not found.");
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
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Event listener for showing a random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a random quote on page load
document.addEventListener("DOMContentLoaded", showRandomQuote);
