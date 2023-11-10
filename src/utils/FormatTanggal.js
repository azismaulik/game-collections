export function formatTanggal(dateTime) {
  const bulan = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "Mei",
    6: "Jun",
    7: "Jul",
    8: "Agu",
    9: "Sep",
    10: "Okt",
    11: "Nov",
    12: "Des",
  };

  const tgl = new Date(dateTime);

  // Dapatkan tanggal dan waktu sekarang
  const now = new Date();

  // Hitung selisih waktu dalam milidetik
  const selisihWaktu = now - tgl;

  // Hitung selisih detik
  const selisihDetik = Math.floor(selisihWaktu / 1000);

  if (selisihDetik < 10) {
    return "baru saja";
  } else if (selisihDetik < 60) {
    // Kurang dari 1 menit, tampilkan dalam format "x seconds ago"
    return `${selisihDetik} seconds ago`;
  } else if (selisihDetik < 3600) {
    // Kurang dari 1 jam, tampilkan dalam format "x minutes ago"
    const selisihMenit = Math.floor(selisihDetik / 60);
    return `${selisihMenit} minutes ago`;
  } else if (selisihDetik < 86400) {
    // Kurang dari sehari, tampilkan dalam format "x hours ago"
    const selisihJam = Math.floor(selisihDetik / 3600);
    return `${selisihJam} hours ago`;
  } else if (selisihDetik < 604800) {
    // Kurang dari seminggu, tampilkan dalam format "x days ago"
    const selisihHari = Math.floor(selisihDetik / 86400);
    if (selisihHari === 1) {
      return "1 day ago";
    } else {
      return `${selisihHari} days ago`;
    }
  } else if (selisihDetik < 2592000) {
    // Kurang dari sebulan, tampilkan dalam format "x weeks ago"
    const selisihMinggu = Math.floor(selisihDetik / 604800);
    if (selisihMinggu === 1) {
      return "1 week ago";
    } else {
      return `${selisihMinggu} weeks ago`;
    }
  } else {
    // Lebih dari sebulan, tampilkan dalam format "Jun 24, 2022"
    const tahun = tgl.getFullYear();
    const bulanIndex = tgl.getMonth() + 1;
    const hari = tgl.getDate();

    const bulanFormatted = bulan[bulanIndex];
    const tanggalFormatted = `${bulanFormatted} ${hari}, ${tahun}`;

    return tanggalFormatted;
  }
}
