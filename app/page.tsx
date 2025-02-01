import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">SK Publishing</Link>
          </div>
          <div className="space-x-4">
            <Link href="/auth/register" className="text-gray-700 hover:text-blue-600 transition-colors">Mendaftar</Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">Masuk</Link>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Terbitkan Buku & Nikmati Ribuan Bacaan
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Solusi mudah bagi penulis dan pembaca: Terbitkan karya Anda atau baca ribuan buku kapan saja, di mana saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
                Terbitkan Sekarang
                <span className="material-icons ml-2 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="group px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center border border-blue-200">
                Mulai Berlangganan
                <span className="material-icons ml-2 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            <div className="mt-12">
              <div className="relative w-full max-w-4xl mx-auto min-h-[600px] bg-gray-200 rounded-xl shadow-inner overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gray-300 rounded-b-lg"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-400 rounded-b-lg"></div>
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Platform Preview" 
                  className="relative w-full h-full object-cover rounded-xl shadow-2xl border-8 border-gray-200" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Buku Digital", value: "10,000+", icon: "menu_book" },
                { label: "Penulis Aktif", value: "500+", icon: "edit" },
                { label: "Pembaca", value: "50,000+", icon: "people" },
                { label: "Rating", value: "4.9/5", icon: "star" }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
                  <span className="material-icons text-4xl text-blue-500 mb-2">{stat.icon}</span>
                  <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Kenapa Harus Kami?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Untuk Penulis",
                  color: "blue",
                  items: [
                    "Penerbitan Mudah & Cepat dalam hitungan menit",
                    "Distribusi Luas ke ribuan pembaca",
                    "Penghasilan Berkelanjutan dengan sistem royalti"
                  ]
                },
                {
                  title: "Untuk Pembaca",
                  color: "green",
                  items: [
                    "Akses Ribuan Buku dari berbagai genre",
                    "Baca Kapan Saja dengan aplikasi mobile",
                    "Harga Terjangkau dengan sistem langganan"
                  ]
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className={`text-2xl font-semibold text-${benefit.color}-600 mb-4`}>{benefit.title}</h3>
                  <ul className="space-y-4">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className={`material-icons text-${benefit.color}-500`}>check_circle</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Pilih Paket Sesuai Kebutuhan
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Gratis",
                  description: "Akses terbatas ke koleksi buku pilihan",
                  icon: "card_giftcard"
                },
                {
                  title: "Premium",
                  description: "Rp650.000/bulan untuk akses penuh",
                  icon: "diamond",
                  featured: true
                },
                {
                  title: "Penulis",
                  description: "Dapatkan royalti dari setiap pembaca",
                  icon: "edit_note"
                }
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ${
                    plan.featured ? 'border-2 border-blue-500 shadow-xl' : ''
                  }`}
                >
                  <span className="material-icons text-4xl text-blue-500 mb-4">{plan.icon}</span>
                  <h3 className={`text-2xl font-semibold ${plan.featured ? 'text-blue-600' : 'text-gray-700'}`}>
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  <button className={`mt-6 w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    plan.featured 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}>
                    Pilih Paket
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Platform",
                  links: ["Tentang Kami", "Karir", "Blog"]
                },
                {
                  title: "Produk",
                  links: ["Fitur", "Harga", "FAQ"]
                },
                {
                  title: "Sumber Daya",
                  links: ["Dokumentasi", "Panduan", "Tutorial"]
                },
                {
                  title: "Legal",
                  links: ["Privasi", "Syarat", "Ketentuan"]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button className="hover:text-white transition-colors">
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} Platform Buku Digital. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;