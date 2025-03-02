// Функция для возврата на главную страницу
function goBack() {
    window.location.href = 'index.html';
}

// Функция для загрузки архивных данных (заглушка)
function loadArchiveData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    date: '01.10.2023',
                    resources: [
                        { name: 'Пыль', totalQuantity: 10, totalCost: 3000, averagePrice: 300 },
                        { name: 'Сласти', totalQuantity: 10, totalCost: 1000, averagePrice: 100 },
                    ],
                },
                {
                    date: '02.10.2023',
                    resources: [
                        { name: 'Пыль', totalQuantity: 5, totalCost: 1500, averagePrice: 300 },
                        { name: 'Железо', totalQuantity: 3, totalCost: 900, averagePrice: 300 },
                    ],
                },
            ]);
        }, 100);
    });
}

// Функция для отображения архивной статистики
async function renderArchiveTable() {
    const tableBody = document.querySelector('#archiveTable tbody');
    const archiveData = await loadArchiveData();

    if (archiveData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2">Нет данных для отображения</td></tr>`;
        return;
    }

    tableBody.innerHTML = archiveData.map(item => `
        <tr onclick="openDetailModal('${item.date}', ${JSON.stringify(item.resources)})">
            <td>${item.date}</td>
            <td>${item.resources.map(res => `${res.name}: ${res.totalQuantity} единиц, ${formatPrice(res.totalCost)}`).join('; ')}</td>
        </tr>
    `).join('');
}

// Функция для отображения абсолютной статистики
async function renderAbsoluteStats() {
    const absoluteStats = document.getElementById('absoluteStats');
    const archiveData = await loadArchiveData();

    if (archiveData.length === 0) {
        absoluteStats.innerHTML = `<p>Нет данных для отображения</p>`;
        return;
    }

    const stats = calculateAbsoluteStats(archiveData);

    absoluteStats.innerHTML = Object.keys(stats).map(resource => `
        <div class="stat-item">
            <h3>${resource}</h3>
            <p>Общее количество: ${stats[resource].totalQuantity} единиц</p>
            <p>Общие затраты: ${formatPrice(stats[resource].totalCost)}</p>
            <p>Средняя цена: ${formatPrice(stats[resource].averagePrice)}</p>
        </div>
    `).join('');
}

// Функция для расчета абсолютной статистики
function calculateAbsoluteStats(data) {
    const stats = {};

    data.forEach(item => {
        item.resources.forEach(res => {
            if (!stats[res.name]) {
                stats[res.name] = {
                    totalQuantity: 0,
                    totalCost: 0,
                    averagePrice: 0,
                };
            }

            stats[res.name].totalQuantity += res.totalQuantity;
            stats[res.name].totalCost += res.totalCost;
            stats[res.name].averagePrice = stats[res.name].totalCost / stats[res.name].totalQuantity;
        });
    });

    return stats;
}

// Функция для открытия модального окна с детальной статистикой
function openDetailModal(date, resources) {
    const modal = document.getElementById('detailModal');
    const modalDate = document.getElementById('modalDate');
    const modalStats = document.getElementById('modalStats');

    modalDate.textContent = `Дата: ${date}`;
    modalStats.innerHTML = resources.map(res => `
        <div class="stat-item">
            <h3>${res.name}</h3>
            <p>Общее количество: ${res.totalQuantity} единиц</p>
            <p>Общие затраты: ${formatPrice(res.totalCost)}</p>
            <p>Средняя цена: ${formatPrice(res.averagePrice)}</p>
        </div>
    `).join('');

    modal.style.display = 'flex';
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('detailModal');
    modal.style.display = 'none';
}

// Функция для форматирования цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + 'р';
}

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
    await renderArchiveTable();
    await renderAbsoluteStats();

    // Привязка функции goBack к кнопке "Назад"
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
});