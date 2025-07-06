// firebase_init.js — versi NON-module (tanpa import)

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5yOboohSQOf6mWwvSzgUYpkEbvqqlDhY",
  authDomain: "elajar-arab-mts.firebaseapp.com",
  projectId: "elajar-arab-mts",
  storageBucket: "elajar-arab-mts.appspot.com",
  messagingSenderId: "100369006179",
  appId: "1:100369006179:web:a5afb40ea483e20c0e4256"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore(); // penting agar bisa diakses di latihan_logger.js

// Fungsi untuk menyimpan skor
async function simpanSkor(nama, skor) {
  try {
    await db.collection("skor_kuis").add({ nama, skor });
  } catch (error) {
    console.error("Gagal menyimpan skor:", error);
    throw error;
  }
}

// Fungsi untuk mengambil semua skor (leaderboard)
async function ambilSemuaSkor() {
  try {
    const snapshot = await db.collection("skor_kuis").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Gagal mengambil skor:", error);
    throw error;
  }
}

