// ========================
// Typing effect
// Types each word one at a time, building up the full line
// ========================
const words = ['Writer', 'Storyteller', 'Researcher', 'Advocate'];
const separator = '  ·  ';
let wordIndex = 0;
let charIndex = 0;
let currentText = '';

function type() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const targetWord = words[wordIndex];

    if (charIndex <= targetWord.length) {
        // Still typing current word
        el.textContent = currentText + targetWord.substring(0, charIndex);
        charIndex++;
        setTimeout(type, 75);
    } else {
        // Finished this word
        currentText += targetWord;
        wordIndex++;

        if (wordIndex < words.length) {
            // Add separator then pause before next word
            currentText += separator;
            el.textContent = currentText;
            charIndex = 0;
            setTimeout(type, 500);
        }
        // If all words done, just stop — cursor blink handles the rest
    }
}

setTimeout(type, 1000);

// ========================
// Scroll reveal
// ========================
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.timeline-item, .beat-card, .quote-text').forEach(el => observer.observe(el));
