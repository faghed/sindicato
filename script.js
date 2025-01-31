document.addEventListener("DOMContentLoaded", function () {
    // Carregar o arquivo JSON
    fetch('salarios.json')
        .then(response => response.json())
        .then(data => {
            // Processar os dados
            const processedData = processData(data);
            // Renderizar a tabela com os dados processados
            renderTable(processedData);
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});

function processData(data) {
    return data.map(item => {
        const salario2023 = item.salarios.find(s => s.ano === 2023)?.salario || 0;
        const salario2024 = item.salarios.find(s => s.ano === 2024)?.salario || 0;
        const variacaoAbsoluta = salario2024 - salario2023;
        const variacaoPercentual = ((variacaoAbsoluta / salario2023) * 100).toFixed(2);

        return {
            cargo: item.cargo,
            salario2023: salario2023,
            salario2024: salario2024,
            variacaoAbsoluta: variacaoAbsoluta,
            variacaoPercentual: parseFloat(variacaoPercentual)
        };
    });
}

function renderTable(data) {
    const tbody = document.querySelector("#salaryTable tbody");
    tbody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.cargo}</td>
            <td>${item.salario2023.toFixed(2)}</td>
            <td>${item.salario2024.toFixed(2)}</td>
            <td>${item.variacaoAbsoluta.toFixed(2)}</td>
            <td>${item.variacaoPercentual.toFixed(2)}%</td>
        `;
        tbody.appendChild(row);
    });
}

function filterTable() {
    const cargoFilter = document.getElementById("cargo").value.toLowerCase();
    const variacaoFilter = parseFloat(document.getElementById("variacao").value);

    const rows = document.querySelectorAll("#salaryTable tbody tr");

    rows.forEach(row => {
        const cargo = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        const variacao = parseFloat(row.querySelector("td:nth-child(5)").textContent.replace("%", ""));

        const matchesCargo = cargo.includes(cargoFilter);
        const matchesVariacao = isNaN(variacaoFilter) || variacao >= variacaoFilter;

        if (matchesCargo && matchesVariacao) {
            row.style.display = ""; // Mostra a linha
        } else {
            row.style.display = "none"; // Oculta a linha
        }
    });
}

// Adiciona os eventos de filtragem
document.getElementById("cargo").addEventListener("input", filterTable);
document.getElementById("variacao").addEventListener("change", filterTable);