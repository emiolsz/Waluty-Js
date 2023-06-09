
function getExchangeRates(currency, amount) {
  const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`;

  if (amount <= 0) {
    alert('Wprowadź wartość większą od 0.');
    
  } else {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if(data?.rates?.length > 0) {
          convertCurrency(data.rates[0].mid, currency, amount);
        } else {
          alert("Ups, mamy problem, spróbuj później");
        }
      })
      .catch((error) => console.error(error));
  }
}

function convertCurrency(rate, currency, amount) {
  const result = amount * rate;
  const resultContainerElement = document.querySelector('#resultContainer');
  resultContainerElement.innerHTML = `${amount} ${currency} = ${result.toFixed(2)} PLN`;
}
const form= document.getElementById('convert-currency-form');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;
  getExchangeRates(currency, amount);
});
