function loadContent(page) {
    const contentDiv = document.getElementById('content');
    let html = '';

    if (page === 'resources') {
        html = `
            <h1>Ресурсы</h1>
            <div class="resource-grid" id="resourceGrid"></div>
            <div class="statistics" id="statistics"></div>
            <div id="addResourceModal" class="modal">
                <div class="modal-content">
                    <h2>Добавить ресурс</h2>
                    <input type="text" id="resourceName" placeholder="Название ресурса">
                    <input type="number" id="resourceQuantity" placeholder="Количество">
                    <input type="number" id="resourcePrice" placeholder="Цена за 1 единицу">
                    <button onclick="addResource()">Добавить</button>
                </div>
            </div>
            <button id="addResourceButton" onclick="openAddResourceModal()">
                <span class="icon">➕</span>
                <span>Добавить ресурс</span>
            </button>
        `;
    } else if (page === 'craft') {
        html = `
            <h1>Крафт</h1>
            <p>Раздел в разработке.</p>
        `;
    } else if (page === 'transactions') {
        html = `
            <h1>Перекупство</h1>
            <p>Раздел в разработке.</p>
        `;
    } else if (page === 'analytics') {
        html = `
            <h1>Аналитика</h1>
            <button id="goToStatisticsButton" onclick="goToStatistics()">
                <span class="icon">📊</span>
                <span>Перейти к статистике</span>
            </button>
        `;
    } else if (page === 'settings') {
        html = `
            <h1>Настройки</h1>
            <p>Раздел в разработке.</p>
        `;
    } else {
        html = `<h1>${page.toUpperCase()}</h1>`;
    }

    contentDiv.innerHTML = html;

    if (page === 'resources') {
        renderResources();
        renderStatistics();
    }
}

function goToStatistics() {
    window.location.href = 'statistics.html';
}

function openAddResourceModal() {
    const modal = document.getElementById('addResourceModal');
    modal.style.display = 'flex';
}

function addResource() {
    const name = document.getElementById('resourceName').value;
    const quantity = parseInt(document.getElementById('resourceQuantity').value);
    const price = parseFloat(document.getElementById('resourcePrice').value);

    if (name && !isNaN(quantity) && !isNaN(price)) {
        const existingResource = resources.find(res => res.name.toLowerCase() === name.toLowerCase());
        if (existingResource) {
            existingResource.quantity += quantity;
            existingResource.price = (existingResource.price + price) / 2;
        } else {
            resources.push({ name, quantity, price });
        }
        closeModal();
        renderResources();
        renderStatistics();
    } else {
        alert('Пожалуйста, заполните все поля корректно.');
    }
}

function closeModal() {
    const modal = document.getElementById('addResourceModal');
    modal.style.display = 'none';
}

function renderResources() {
    const resourceGrid = document.getElementById('resourceGrid');
    resourceGrid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <img src="assets/items/${resource.name.toLowerCase()}.png" alt="${resource.name}">
            <div class="tooltip">${resource.name}</div>
        </div>
    `).join('');
}

function renderStatistics() {
    const statisticsDiv = document.getElementById('statistics');
    statisticsDiv.innerHTML = `
        <h2>Статистика</h2>
        ${resources.map(resource => `
            <p>
                <img src="assets/items/${resource.name.toLowerCase()}.png" alt="${resource.name}" style="width: 24px; height: 24px; vertical-align: middle;">
                ${resource.name} - Общее количество: ${resource.quantity}, Общие затраты: ${formatPrice(resource.quantity * resource.price)}, Средняя цена: ${formatPrice(resource.price)}
            </p>
        `).join('')}
    `;
}

function formatPrice(price) {
    return price.toLocaleString('ru-RU') + 'р';
}

// Инициализация
let resources = [];
document.addEventListener('DOMContentLoaded', () => {
    loadContent('resources');
});