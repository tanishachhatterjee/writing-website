// informational.js — only load on informational.html

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

const filterBtns = document.querySelectorAll('.filter-btn');
const rows = document.querySelectorAll('.article-row');
const countEl = document.getElementById('list-count');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.article-row.open').forEach(r => {
            r.classList.remove('open');
            r.querySelector('.read-arrow').textContent = '→';
        });
        let visible = 0;
        rows.forEach(row => {
            const match = filter === 'all' || (row.dataset.tags || '').includes(filter);
            row.classList.toggle('hidden', !match);
            if (match) visible++;
        });
        countEl.textContent = `${visible} piece${visible !== 1 ? 's' : ''}`;
    });
});
