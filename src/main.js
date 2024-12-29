let discountCount = 2;
const MAX_DISCOUNTS = 5;

function calculateCumulativeDiscount() {
    const inputs = document.querySelectorAll('[id^="discount"]');
    const result = document.getElementById('result');
    let isValid = true;
    
    // Validate all inputs and collect values
    const discounts = Array.from(inputs).map(input => {
        const value = parseFloat(input.value) || 0;
        const errorElement = document.getElementById(`error${input.id.replace('discount', '')}`);
        
        if (value < 0 || value > 100) {
            errorElement.style.display = 'block';
            isValid = false;
        } else {
            errorElement.style.display = 'none';
        }
        
        return value;
    });
    
    if (!isValid) {
        result.textContent = 'הנחה כוללת: קלט לא תקין';
        return;
    }
    
    // Calculate cumulative discount
    const cumulativeDiscount = (1 - discounts.reduce((acc, discount) => 
        acc * (1 - discount/100), 1)) * 100;
    
    result.textContent = `הנחה כוללת: ${cumulativeDiscount.toFixed(2)}%`;
}

function createDiscountInput(number) {
    const container = document.createElement('div');
    container.className = 'input-group';
    container.id = `group${number}`;
    
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    
    const inputWrapper = document.createElement('div');
    inputWrapper.style.flex = '1';
    
    const label = document.createElement('label');
    label.htmlFor = `discount${number}`;
    label.textContent = `הנחה ${number} (%)`;
    
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `discount${number}`;
    input.placeholder = 'הזן הנחה';
    input.min = '0';
    input.max = '100';
    
    const error = document.createElement('div');
    error.className = 'error';
    error.id = `error${number}`;
    error.textContent = 'יש להזין ערך בין 0 ל-100';
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => removeDiscountInput(number);
    
    inputWrapper.appendChild(label);
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(error);
    
    inputRow.appendChild(inputWrapper);
    inputRow.appendChild(removeButton);
    
    container.appendChild(inputRow);
    
    input.addEventListener('input', calculateCumulativeDiscount);
    
    return container;
}

function removeDiscountInput(number) {
    const element = document.getElementById(`group${number}`);
    element.remove();
    discountCount--;
    updateAddButton();
    calculateCumulativeDiscount();
}

function addDiscountInput() {
    if (discountCount >= MAX_DISCOUNTS) return;
    
    discountCount++;
    const newInput = createDiscountInput(discountCount);
    const addButton = document.getElementById('addDiscount');
    addButton.parentNode.insertBefore(newInput, addButton);
    
    updateAddButton();
}

function updateAddButton() {
    const addButton = document.getElementById('addDiscount');
    addButton.disabled = discountCount >= MAX_DISCOUNTS;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const discount1 = document.getElementById('discount1');
    const discount2 = document.getElementById('discount2');
    
    discount1.addEventListener('input', calculateCumulativeDiscount);
    discount2.addEventListener('input', calculateCumulativeDiscount);
    
    document.getElementById('addDiscount').addEventListener('click', addDiscountInput);
    updateAddButton();
});