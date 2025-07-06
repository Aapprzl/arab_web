

const questions = [
  {
    question: "Apa arti kata 'البَيْتُ' dalam Bahasa Indonesia?",
    options: ["Rumah", "Sekolah", "Kamar", "Jendela"],
    answer: "Rumah"
  },
  {
    question: "Bagaimana penulisan Arab untuk 'pintu'?",
    options: ["نَافِذَة", "بَاب", "سَرِير", "كِتَاب"],
    answer: "بَاب"
  },
  {
    question: "'كُرْسِيٌّ' berarti...",
    options: ["Meja", "Kursi", "Lemari", "Kasur"],
    answer: "Kursi"
  }
];

let currentScore = 0;

window.onload = () => {
  const container = document.getElementById('quiz-container');
  if (!container) return alert("Elemen #quiz-container tidak ditemukan!");

  questions.forEach((q, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-white p-4 rounded shadow';

    const qTitle = document.createElement('h3');
    qTitle.className = 'font-semibold mb-2';
    qTitle.innerText = `${index + 1}. ${q.question}`;
    wrapper.appendChild(qTitle);

    q.options.forEach(opt => {
      const label = document.createElement('label');
      label.className = 'block mb-1 cursor-pointer';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = opt;
      input.className = 'mr-2';
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      wrapper.appendChild(label);
    });

    container.appendChild(wrapper);
  });

  const submitBtn = document.createElement('button');
  submitBtn.innerText = "Selesai Kuis";
  submitBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded mt-6 hover:bg-blue-700 block mx-auto';
  submitBtn.onclick = calculateScore;
  container.appendChild(submitBtn);
};

function calculateScore() {
  currentScore = 0;
  let allAnswered = true;

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected) {
      if (selected.value === q.answer) currentScore++;
    } else {
      allAnswered = false;
    }
  });

  if (!allAnswered) {
    alert("Harap jawab semua soal dulu!");
    return;
  }

  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').innerText = `${currentScore} / ${questions.length}`;
}

function submitScore() {
  const name = document.getElementById('name').value;
  if (!name) return alert("Nama harus diisi!");
  simpanSkor(name, currentScore)
    .then(() => {
      alert("Skor berhasil disimpan!");
      tampilkanLeaderboard(); // tampilkan setelah simpan
    })
    .catch(err => alert("Gagal menyimpan skor: " + err.message));

    async function tampilkanLeaderboard() {
  const leaderboardContainer = document.getElementById('leaderboard');
  leaderboardContainer.innerHTML = ""; // Bersihkan isi sebelumnya

  try {
    const data = await ambilSemuaSkor();

    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('mb-1', 'text-sm', 'text-gray-700');
      div.innerText = `${index + 1}. ${item.nama} - Skor: ${item.skor}`;
      leaderboardContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Gagal menampilkan leaderboard:", error);
  }
}

}

simpanSkor(name, currentScore)
  .then(() => {
    alert("Skor berhasil disimpan!");
    ambilDataSkor(); // tampilkan leaderboard
  })
  .catch(err => alert("Gagal menyimpan skor: " + err.message));

window.submitScore = submitScore;
