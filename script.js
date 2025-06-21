async function loadWords() {
  const response = await fetch('words.json');
  const words = await response.json();
  displayWords(words);

  document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filtered = words.filter(w => w.word.toLowerCase().includes(searchTerm));
    displayWords(filtered);
  });
}

function displayWords(words) {
  const container = document.getElementById('word-list');
  container.innerHTML = '';
  words.forEach(item => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <h2>${item.word}</h2>
      <p><strong>Meaning:</strong> ${item.meaning}</p>
      <p><strong>Breakdown:</strong> ${item.breakdown}</p>
      <p><strong>Example:</strong> ${item.example}</p>
      <button onclick="speak('${item.word} means ${item.meaning}')">🔊 Hear</button>
    `;
    container.appendChild(card);
  });
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

document.getElementById('feedback-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Thanks for your feedback!");
  this.reset();
});

loadWords();
