// fiction.js — only load on fiction.html

const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });

document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

document.querySelectorAll('.article-row').forEach(row => {
    row.addEventListener('click', e => {
        if (e.target.closest('.close-btn')) return;
        const isOpen = row.classList.contains('open');
        document.querySelectorAll('.article-row.open').forEach(other => {
            other.classList.remove('open');
            other.querySelector('.read-arrow').textContent = '→';
        });
        if (!isOpen) {
            row.classList.add('open');
            row.querySelector('.read-arrow').textContent = '↑';
            setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        }
    });
});

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.article-row');
        row.classList.remove('open');
        row.querySelector('.read-arrow').textContent = '→';
        setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    });
});
