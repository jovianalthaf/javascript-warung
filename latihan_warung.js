const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function Person(name, age, saldo) {
  this.name = name;
  this.age = age;
  this.saldo = saldo;
}

const orang1 = new Person("Jovian", 21, 10000);

const menuList = {
  1: { name: "Bakso", harga: 10000 },
  2: { name: "Sate", harga: 20000 },
};

const pesanan = [];

function tampilMenu() {
  console.log("\n=== Menu Warung ===");
  console.log("1. Baso - 10.000");
  console.log("2. Sate - 15.000");
  console.log("9. Tampilkan Pesanan");
  console.log("0. Selesai pesan");
  console.log("====================");
}
function ringkasanPesanan() {
  const totalHarga = pesanan.reduce((sum, item) => sum + item.harga, 0);

  console.log("\n=== Ringkasan Pesanan ===");
  pesanan.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - ${item.harga}`);
  });
  console.log(`Nama Pelanggan : ${orang1.name}`);
  console.log(`Total: ${totalHarga}`);
  console.log(`Sisa saldo: ${orang1.saldo}`);
  console.log("Terima kasih :)");
  console.log("=== Ringkasan Pesanan ===");
}

function tampilPesanan() {
  pesanan.forEach((item, index) => {
    console.log(`Pesanan Anda : ${item.name}`);
  });
}
function tanyaPesanan() {
  tampilMenu();
  rl.question(
    "Pilih Menu (1/2), (0) untuk selesai dan (9) Melihat pesanan : ",
    (input) => {
      if (input === "0") {
        if (pesanan.length === 0) {
          console.log("Tidak ada pesanan. Terima kasih :)");
        } else if (pesanan.length > 0) {
          // saldo sudah dikurangi tiap pesan, jadi tinggal tampilkan ringkasan
          ringkasanPesanan();
        }
        rl.close();
        return;
      } else if (input === "9") {
        tampilPesanan();
      }
      console.log(`Sisa Saldo Anda : ${orang1.saldo}`);
      if (orang1.saldo < menuList.harga) {
        console.log(
          "Saldo Anda Tidak mencukupi untuk menambahkan pesanan lain"
        );
      }
      const menuDipilih = menuList[input];
      if (!menuDipilih) {
        console.log("Pilihan tidak tersedia");
      } else {
        if (orang1.saldo < menuDipilih.harga) {
          console.log(
            "Saldo Anda tidak cukup untuk memesan " + menuDipilih.name
          );
        } else {
          pesanan.push(menuDipilih);
          orang1.saldo -= menuDipilih.harga; // langsung kurangi saldo saat pesan
          console.log(`Menambahkan ${menuDipilih.name} ke pesanan.`);
          console.log(`Sisa saldo Anda: ${orang1.saldo}`);
        }
      }
      tanyaPesanan();
    }
  );
}
tanyaPesanan();

// console.log("=== Menu Warung ===");
// console.log("1. Baso, Harga : 10000");
// console.log("2. Sate, Harga : 15000");
// console.log("===================");

// rl.question("Masukkan pilihan menu (1/2) : ", (pilihan) => {
//   const orang1 = new Person("Jovian", 21, 1000);
//   const saldo = orang1.saldo;
//   let menu;
//   let harga;

//   switch (pilihan) {
//     case "1":
//       menu = "Baso";
//       harga = 10000;
//       break;
//     case "2":
//       menu = "Sate";
//       harga = 15000;
//       break;
//     default:
//       menu = "Menu tidak tersedia";
//   }
//   if (saldo < harga) {
//     console.log("Saldo tidak cukup");
//     return false;
//   }
//   let total = saldo - harga;

//   console.log(
//     `Halo, ${orang1.name}! Anda memesan ${menu} dan harga ${harga}, sisa saldo anda ${total} Terima kasih :)`
//   );
//   //   rl.question("Masukkan nama Anda: ", (nama) => {
//   //     console.log(
//   //       `\nHalo, ${orang1.name}! Anda memesan ${menu} dan harga ${harga}. Terima kasih :)`
//   //     );
//   //     rl.close();
//   //   });
//   rl.close();
// });
