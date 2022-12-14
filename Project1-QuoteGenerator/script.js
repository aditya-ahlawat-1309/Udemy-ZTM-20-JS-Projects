const quoteContainer =  document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log(quote);
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else
    {
        authorText.textContent = quote.author;
    }
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    quoteText.textContent = quote.text;
complete();
}


async function getQuotes(){
    loading();
    const apiURL = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        console.log(apiQuotes[12]);
newQuote();
    }
    catch(err)
    {

    }
}

function tweetQuote(){
const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
//loading();