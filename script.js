document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startCalculation);
});

let calculatorDisplay = document.getElementById("calculator-display");
let calculatorBuffer = "";

function appendToDisplay(value) {
    calculatorBuffer += value;
    calculatorDisplay.value = calculatorBuffer;
}

function clearDisplay() {
    calculatorBuffer = "";
    calculatorDisplay.value = calculatorBuffer;
}

function calculate() {
    try {
        const result = eval(calculatorBuffer);
        calculatorBuffer = result.toString();
        calculatorDisplay.value = calculatorBuffer;
    } catch (error) {
        calculatorDisplay.value = "Erro";
    }
}

function startCalculation() {
    const qtdPessoasInput = document.getElementById("qtd_pessoas");
    const qtdPessoas = parseInt(qtdPessoasInput.value);
    if (isNaN(qtdPessoas) || qtdPessoas <= 0) {
        alert("Por favor, digite uma quantidade válida de pessoas.");
        return;
    }

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = ""; // Limpa o conteúdo anterior

    let totalGasto = 0;
    const valoresPorPessoa = {};

    for (let i = 1; i <= qtdPessoas; i++) {
        const nome = prompt(`Digite o nome da ${i}ª pessoa:`);
        if (!nome) {
            alert("Por favor, digite um nome válido.");
            return;
        }

        const valorGastoStr = prompt(`Digite o valor gasto por ${i}ª pessoa:`);
        const valorGasto = parseFloat(valorGastoStr);
        if (isNaN(valorGasto) || valorGasto < 0) {
            alert("Por favor, digite um valor gasto válido.");
            return;
        }

        totalGasto += valorGasto;
        valoresPorPessoa[nome] = valorGasto;
    }

    const valorGastoMedio = totalGasto / qtdPessoas;

    resultContainer.innerHTML += "<h2>Resumo dos gastos:</h2>";

    for (const nome in valoresPorPessoa) {
        const diferenca = valoresPorPessoa[nome] - valorGastoMedio;
        if (diferenca > 0) {
            resultContainer.innerHTML += `${nome} deve receber R$ ${diferenca.toFixed(2)}<br>`;
        } else if (diferenca < 0) {
            resultContainer.innerHTML += `${nome} deve pagar R$ ${(diferenca * -1).toFixed(2)}<br>`;
        } else {
            resultContainer.innerHTML += `${nome} está quites.<br>`;
        }
    }
}