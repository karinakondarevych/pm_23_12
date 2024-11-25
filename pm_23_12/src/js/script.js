document.querySelectorAll('.toggle-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const sectionContent = button.closest('section').querySelector('.section-content');
        const icon = button.querySelector('i');

        // Перемикання класів для показу/приховування та іконки
        sectionContent.classList.toggle('d-none');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});


// Створюємо об'єкт XMLHttpRequest
const xmlhttp = new XMLHttpRequest();
const url = '/src/data/data.json'; // Шлях до файлу JSON

// Обробник зміни стану запиту
xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) { // Перевіряємо стан завершення запиту
        if (this.status === 200) { // Перевіряємо, чи запит успішний
            const data = JSON.parse(this.responseText); // Парсимо отриманий JSON
            renderData(data); // Викликаємо функцію для відображення даних
        } else {
            console.error('Помилка під час завантаження даних');
        }
    }
};

// Відправляємо запит
xmlhttp.open("GET", url, true);
xmlhttp.send();

// Функція для відображення даних на сторінці
function renderData(data) {
    const container = document.getElementById('education-container'); // Контейнер для даних

    // Проходимо по кожному елементу масиву даних
    data.forEach(item => {
        const div = document.createElement('div'); // Створюємо новий елемент div

        // Додаємо HTML-зміст
        div.innerHTML = `
            <h5>${item.university}</h5>
            <p>${item.degree}</p>
            <p>${item.years}</p>
        `;

        // Додаємо елемент у контейнер
        container.appendChild(div);
    });
}

// Асинхронна функція для отримання даних
async function getData() {
    try {
        const response = await fetch('/src/data/data.json'); // Запит до JSON файлу
        if (!response.ok) throw new Error('Помилка при завантаженні даних');
        
        const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
        renderData(data); // Виклик функції для відображення даних
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}
// Виклик асинхронної функції
getData();
