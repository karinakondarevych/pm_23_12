document.querySelectorAll('.toggle-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const sectionContent = button.closest('section').querySelector('.list');
        const icon = button.querySelector('i');
        sectionContent.classList.toggle('d-none');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

function byXMLHttpRequest() {
    const xmlhttp = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8080/data/data.json';
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) { 
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                renderData(data);
        } else {
            console.error('Помилка під час завантаження даних');
        }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function renderData(data) {
    const container = document.getElementById('education-container');
    data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h5>${item.university}</h5>
            <p>${item.degree}</p>
            <p>${item.years}</p>
        `;
        container.appendChild(div);
    });
}

async function byFetchAPI() {
    try {
        const response = await fetch('http://127.0.0.1:8080/data/data.json');
        if (!response.ok) throw new Error('Помилка при завантаженні даних');
        const data = await response.json(); 
        renderData(data);
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
    }
}

document.getElementById('xmlHttpRequest').addEventListener('click', byXMLHttpRequest);
document.getElementById('fetchAPI').addEventListener('click', byFetchAPI);