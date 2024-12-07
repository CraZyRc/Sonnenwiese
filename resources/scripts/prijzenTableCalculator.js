
// To format the number into the dutch format so the value uses a comma (450,00) instead of a dot (450.00)
function formatNumber(number) {
  return number.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

  function calculateTotalSummer() {
    const lowPriceText = document.getElementById('summer-low-price').textContent;
    const lowPriceValue = parseFloat(lowPriceText.replace('€', '').trim());
    const lowQuantity = parseFloat(document.getElementById('summer-low-quantity').value) || 0; // '|| 0' is added so that when the input value is empty, it doesn't give a NaN error
    let lowTotal = lowPriceValue * lowQuantity;
    

    const highPriceText = document.getElementById('summer-high-price').textContent;
    const highPriceValue = parseFloat(highPriceText.replace('€', '').trim());
    const highQuantity = parseFloat(document.getElementById('summer-high-quantity').value) || 0;
    let highTotal = highPriceValue * highQuantity;
    

    const finalTotal = formatNumber(lowTotal + highTotal + 50);
    lowTotal = formatNumber(lowTotal);
    highTotal = formatNumber(highTotal);
    
    document.getElementById('summer-total-low').textContent = `€${lowTotal}`;
    document.getElementById('summer-total-high').textContent = `€${highTotal}`;
    document.getElementById('summer-total-final').textContent = `€${finalTotal}`;
  }

  function calculateTotalWinter() {
    const lowPriceText = document.getElementById('winter-low-price').textContent;
    const lowPriceValue = parseFloat(lowPriceText.replace('€', '').trim());
    const lowQuantity = parseFloat(document.getElementById('winter-low-quantity').value) || 0; // '|| 0' is added so that when the input value is empty, it doesn't give a NaN error
    let lowTotal = lowPriceValue * lowQuantity;
    

    const highPriceText = document.getElementById('winter-high-price').textContent;
    const highPriceValue = parseFloat(highPriceText.replace('€', '').trim());
    const highQuantity = parseFloat(document.getElementById('winter-high-quantity').value) || 0;
    let highTotal = highPriceValue * highQuantity;
    

    const finalTotal = formatNumber(lowTotal + highTotal + 50);
    lowTotal = formatNumber(lowTotal);
    highTotal = formatNumber(highTotal);
    
    document.getElementById('winter-total-low').textContent = `€${lowTotal}`;
    document.getElementById('winter-total-high').textContent = `€${highTotal}`;
    document.getElementById('winter-total-final').textContent = `€${finalTotal}`;
  }