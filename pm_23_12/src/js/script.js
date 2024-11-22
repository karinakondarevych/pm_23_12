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
