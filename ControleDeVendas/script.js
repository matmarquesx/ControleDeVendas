// Variáveis globais
let products = [];
let paymentMethod = 'vista';
let installmentCount = 2;

// Função para inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar produtos
    initializeProducts();
    
    // Adicionar event listeners
    addEventListeners();
});

// Função para inicializar os produtos
function initializeProducts() {
    const productRows = document.querySelectorAll('#products-table tbody tr');
    
    productRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        const name = row.querySelector('td:nth-child(2)').textContent;
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent);
        const quantityInput = row.querySelector('.quantity-input');
        
        products.push({
            id: checkbox.value,
            name: name,
            price: price,
            quantity: 0,
            selected: false
        });
        
        // Desabilitar inputs de quantidade inicialmente
        quantityInput.disabled = true;
    });
}

// Função para adicionar event listeners
function addEventListeners() {
    // Event listeners para checkboxes de produtos
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            const row = this.closest('tr');
            const quantityInput = row.querySelector('.quantity-input');
            
            products[index].selected = this.checked;
            quantityInput.disabled = !this.checked;
            
            if (!this.checked) {
                quantityInput.value = 0;
                products[index].quantity = 0;
                updateSubtotal(row, 0);
            }
        });
    });
    
    // Event listeners para inputs de quantidade
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            const quantity = parseInt(this.value) || 0;
            const row = this.closest('tr');
            
            // Garantir que a quantidade não seja negativa
            if (quantity < 0) {
                this.value = 0;
                products[index].quantity = 0;
            } else {
                products[index].quantity = quantity;
            }
            
            // Atualizar subtotal
            const subtotal = products[index].price * products[index].quantity;
            updateSubtotal(row, subtotal);
        });
    });
    
    // Event listeners para método de pagamento
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            paymentMethod = this.value;
            const installmentSelect = document.getElementById('installment-count');
            
            if (paymentMethod === 'prazo') {
                installmentSelect.disabled = false;
                document.getElementById('discount-container').style.display = 'none';
                document.getElementById('installment-fee-container').style.display = 'flex';
                document.getElementById('installment-value-container').style.display = 'flex';
            } else {
                installmentSelect.disabled = true;
                document.getElementById('discount-container').style.display = 'flex';
                document.getElementById('installment-fee-container').style.display = 'none';
                document.getElementById('installment-value-container').style.display = 'none';
            }
        });
    });
    
    // Event listener para seleção de parcelas
    const installmentSelect = document.getElementById('installment-count');
    installmentSelect.addEventListener('change', function() {
        installmentCount = parseInt(this.value);
    });
    
    // Event listener para botão de cálculo
    const calculateButton = document.getElementById('calculate-button');
    calculateButton.addEventListener('click', calculateTotal);
    
    // Event listener para botão de reset
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetForm);
}

// Função para atualizar o subtotal de um produto
function updateSubtotal(row, subtotal) {
    const subtotalCell = row.querySelector('.subtotal');
    subtotalCell.textContent = subtotal.toFixed(2);
}

// Função para calcular o total
function calculateTotal() {
    // Verificar se há produtos selecionados
    const selectedProducts = products.filter(product => product.selected && product.quantity > 0);
    
    if (selectedProducts.length === 0) {
        alert('Selecione pelo menos um produto e defina a quantidade.');
        return;
    }
    
    // Calcular valor total da venda
    let totalValue = 0;
    selectedProducts.forEach(product => {
        totalValue += product.price * product.quantity;
    });
    
    // Exibir valor total
    document.getElementById('total-value').textContent = `R$ ${totalValue.toFixed(2)}`;
    
    let finalValue = 0;
    
    // Calcular com base no método de pagamento
    if (paymentMethod === 'vista') {
        // Pagamento à vista: 8,5% de desconto
        const discountRate = 0.085;
        const discountValue = totalValue * discountRate;
        finalValue = totalValue - discountValue;
        
        // Exibir desconto
        document.getElementById('discount-value').textContent = `R$ ${discountValue.toFixed(2)}`;
        
        // Exibir valor final
        document.getElementById('final-value').textContent = `R$ ${finalValue.toFixed(2)}`;
    } else {
        // Pagamento a prazo: 6% do valor + R$ 6,90 por parcela
        const feeRate = 0.06;
        const feePerInstallment = 6.90;
        const feeValue = (totalValue * feeRate) + (feePerInstallment * installmentCount);
        finalValue = totalValue + feeValue;
        
        // Exibir taxa de parcelamento
        document.getElementById('installment-fee-value').textContent = `R$ ${feeValue.toFixed(2)}`;
        
        // Calcular valor da parcela
        const installmentValue = finalValue / installmentCount;
        
        // Verificar se o valor da parcela é inferior a R$ 10,00
        if (installmentValue < 10.00) {
            alert(`O valor da parcela (R$ ${installmentValue.toFixed(2)}) é inferior ao mínimo permitido (R$ 10,00). Por favor, selecione menos parcelas ou adicione mais produtos.`);
            return;
        }
        
        // Exibir valor final
        document.getElementById('final-value').textContent = `R$ ${finalValue.toFixed(2)}`;
        
        // Exibir valor da parcela
        document.getElementById('installment-value').textContent = `R$ ${installmentValue.toFixed(2)} (${installmentCount}x)`;
    }
    
    // Destacar a seção de resultados
    document.querySelector('.result-section').classList.add('highlight-section');
    setTimeout(() => {
        document.querySelector('.result-section').classList.remove('highlight-section');
    }, 1500);
}

// Função para resetar o formulário
function resetForm() {
    // Resetar checkboxes e inputs de quantidade
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = false;
        products[index].selected = false;
    });
    
    quantityInputs.forEach((input, index) => {
        input.value = 0;
        input.disabled = true;
        products[index].quantity = 0;
        
        // Resetar subtotais
        const row = input.closest('tr');
        updateSubtotal(row, 0);
    });
    
    // Resetar método de pagamento para à vista
    document.getElementById('payment-cash').checked = true;
    document.getElementById('payment-installment').checked = false;
    paymentMethod = 'vista';
    
    // Resetar seleção de parcelas
    const installmentSelect = document.getElementById('installment-count');
    installmentSelect.value = 2;
    installmentSelect.disabled = true;
    installmentCount = 2;
    
    // Resetar exibição de resultados
    document.getElementById('total-value').textContent = 'R$ 0.00';
    document.getElementById('discount-value').textContent = 'R$ 0.00';
    document.getElementById('installment-fee-value').textContent = 'R$ 0.00';
    document.getElementById('final-value').textContent = 'R$ 0.00';
    document.getElementById('installment-value').textContent = 'R$ 0.00';
    
    // Resetar visibilidade dos containers
    document.getElementById('discount-container').style.display = 'flex';
    document.getElementById('installment-fee-container').style.display = 'none';
    document.getElementById('installment-value-container').style.display = 'none';
}

// Adicionar classe CSS para destacar a seção de resultados
document.head.insertAdjacentHTML('beforeend', `
<style>
.highlight-section {
    animation: highlight 1.5s ease;
}

@keyframes highlight {
    0% { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
    50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.7); }
    100% { box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
}
</style>
`);
