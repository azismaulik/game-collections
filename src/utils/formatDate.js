export function formatDate(tanggalAwal) {
  let date = new Date(tanggalAwal);
  let options = { year: "numeric", month: "short", day: "numeric" };
  let tanggalBaru = date.toLocaleDateString("en-US", options);
  return tanggalBaru;
}
