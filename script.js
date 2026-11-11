
let pesanan = [];

function tambahPesanan(nama, harga) {
    let item = pesanan.find(p => p.nama === nama);

    if (item) {
        item.jumlah++;
    } else {
        pesanan.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanPesanan();
}

function tampilkanPesanan() {
    let daftar = document.getElementById("daftar-pesanan");
    let total = 0;

    daftar.innerHTML = "";

    if (pesanan.length === 0) {
        daftar.innerHTML = "<p>Belum ada pesanan.</p>";
    }

    pesanan.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        daftar.innerHTML += `
            <div>
                ${item.nama} x ${item.jumlah}
                = Rp${subtotal.toLocaleString("id-ID")}
                <button onclick="hapusPesanan(${index})">
                    Hapus
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText =
        "Rp" + total.toLocaleString("id-ID");
}

function hapusPesanan(index) {
    pesanan.splice(index, 1);
    tampilkanPesanan();
}

function checkout() {
    if (pesanan.length === 0) {
        alert("Silakan pilih menu terlebih dahulu!");
        return;
    }

    let pesan = "Halo Titik Temu Coffee, saya ingin memesan:\n\n";
    let total = 0;

    pesanan.forEach(item => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        pesan += `${item.nama} x ${item.jumlah} = Rp${subtotal.toLocaleString("id-ID")}\n`;
    });

    pesan += `\nTotal pembayaran: Rp${total.toLocaleString("id-ID")}`;
    pesan += "\n\nMohon konfirmasi pesanan saya. Terima kasih.";

    // Ganti dengan nomor WhatsApp kedai kopi
    let nomorWA = "6285761724594";

    let url = "https://wa.me/" + nomorWA +
        "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank");
}
