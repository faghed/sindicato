const data = [
    { cargo: "Agente Comunitário de Saúde", salario2023: 2640.00, salario2024: 3036.00, variacaoAbsoluta: 396.00, variacaoPercentual: 15.00 },
    { cargo: "Agente Cultural", salario2023: 1768.10, salario2024: 1955.00, variacaoAbsoluta: 186.90, variacaoPercentual: 10.57 },
    { cargo: "Agente de Combate a Endemias", salario2023: 2640.00, salario2024: 3036.00, variacaoAbsoluta: 396.00, variacaoPercentual: 15.00 },
    // Adicione os demais cargos aqui...
];

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
document.getElementById("variacao").addEventListener("change", filterTable); // "change" para dropdown