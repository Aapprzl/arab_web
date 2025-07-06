// latihan_logger.js (versi tanpa module)

// Fungsi global untuk kirim hasil ke Firebase
function kirimHasil(nama, jenisLatihan) {
  if (!window.db) {
    console.error("❌ Firebase belum diinisialisasi.");
    return;
  }

  db.collection("hasil_latihan")
    .add({
      nama: nama,
      jenis: jenisLatihan,
      waktu: new Date()
    })
    .then(() => {
      console.log("✅ Data latihan berhasil dikirim.");
    })
    .catch((error) => {
      console.error("❌ Gagal mengirim data latihan:", error);
    });
}
