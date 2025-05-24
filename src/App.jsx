
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Impor GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Impor ScrollTrigger
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Impor ScrollToPlugin untuk animasi scroll
import "./App.css";
// Register GSAP plugins (penting untuk ScrollTrigger dan ScrollToPlugin)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Menggunakan class 'dark' pada elemen <html> untuk dark mode Tailwind
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Navigation function
  const navigateTo = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      // Animasi scroll halus menggunakan GSAP ScrollToPlugin
      gsap.to(window, { duration: 1, scrollTo: { y: element, offsetY: 0 }, ease: "power2.inOut" });
    }
  };

  return (
    // Body / Root Wrapper: min-h-screen, font, dan warna background/text utama
    // Pastikan div ini juga full width, yang sudah diatur oleh min-h-screen
    <div className={`min-h-screen flex flex-col font-inter ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Header and Navigation */}
      <header className={`sticky top-0 z-50 p-4 shadow-xl border-b border-gray-700/50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-full`}> {/* Shadow lebih besar, border bawah halus */}
        {/* Nav Container: Hapus 'container mx-auto' untuk full width, tambahkan padding internal */}
        <nav className="flex justify-between items-center px-4 md:px-8 w-full">
          {/* Ubah ukuran logo/judul agar lebih menonjol */}
          <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">Lionel.dev</div> {/* Warna kuning untuk logo */}
          <ul className="flex space-x-2 md:space-x-6 items-center"> {/* space-x-2 for mobile, space-x-6 for md+ */}
            <li>
              {/* Tombol Navigasi: Tanpa background default, kuning saat hover */}
              <button onClick={() => navigateTo('home')} className="px-3 py-2 rounded-md transition-colors duration-300 font-medium text-gray-200 dark:text-gray-300 hover:bg-yellow-400 dark:hover:bg-yellow-600 hover:text-gray-900 dark:hover:text-gray-900 bg-transparent border-transparent appearance-none focus:outline-none focus:ring-0">Beranda</button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="px-3 py-2 rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-colors duration-300 font-medium text-gray-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900 bg-transparent border-transparent appearance-none focus:outline-none focus:ring-0">Tentang Saya</button>
            </li>
            <li>
              <button onClick={() => navigateTo('projects')} className="px-3 py-2 rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-colors duration-300 font-medium text-gray-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900 bg-transparent border-transparent appearance-none focus:outline-none focus:ring-0">Proyek</button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="px-3 py-2 rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-colors duration-300 font-medium text-gray-200 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-900 bg-transparent border-transparent appearance-none focus:outline-none focus:ring-0">Kontak</button>
            </li>
            <li className="ml-4"> {/* Tambah margin kiri untuk pemisah visual */}
              {/* Tombol Dark Mode: Tanpa background default, kuning saat hover */}
              <button onClick={toggleDarkMode} className="p-2 rounded-full transition-colors duration-300 shadow-sm hover:bg-yellow-400 dark:hover:bg-yellow-600 bg-transparent border-transparent appearance-none focus:outline-none focus:ring-0">
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun text-gray-200 dark:text-gray-300 group-hover:text-gray-900"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon text-gray-200 dark:text-gray-300 group-hover:text-gray-900"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Content Sections */}
      {/* Terapkan background yang sama dengan root div */}
      <main className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {(() => {
          switch (activeSection) {
            case 'home':
              return <HeroSection />;
            case 'about':
              return <AboutSection />;
            case 'projects':
              return <ProjectsSection />;
            case 'contact':
              return <ContactSection />;
            default:
              return <HeroSection />;
          }
        })()}
      </main>

      {/* Footer */}
      <footer className={`p-6 text-center ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'} mt-12 w-full`}>
        <p>&copy; {new Date().getFullYear()} Lionel. Semua Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const roles = ["Developer Web", "Kreator Solusi", "Inovator Kode"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150); // Kecepatan ketik

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroButtonRef = useRef(null);

  useEffect(() => {
    let timeoutId; // Untuk menyimpan ID timeout

    const type = () => {
      const currentRole = roles[currentRoleIndex];
      if (isDeleting) {
        setDisplayedText(prev => currentRole.substring(0, prev.length - 1));
        timeoutId = setTimeout(type, 75); // Kecepatan menghapus
      } else {
        setDisplayedText(prev => currentRole.substring(0, prev.length + 1));
        timeoutId = setTimeout(type, 150); // Kecepatan mengetik
      }

      if (!isDeleting && displayedText === currentRole) {
        timeoutId = setTimeout(() => setIsDeleting(true), 1000); // Tunggu sebelum menghapus
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        timeoutId = setTimeout(type, 500); // Tunggu sebelum mulai mengetik peran baru
      }
    };

    // Mulai animasi ketik hanya sekali saat komponen pertama kali dimuat
    // atau ketika roles/currentRoleIndex berubah (untuk transisi antar peran)
    if (roles.length > 0) {
      type();
    }

    // Animasi GSAP saat komponen dimuat
    gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" });
    gsap.fromTo(heroSubtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "back.out(1.7)" });
    gsap.fromTo(heroDescriptionRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "back.out(1.7)" });
    gsap.fromTo(heroButtonRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "back.out(1.7)" });


    return () => clearTimeout(timeoutId); // Bersihkan timeout saat komponen unmount
  }, [currentRoleIndex, isDeleting]); // Dependency array hanya untuk kontrol typing flow

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden w-full">
      {/* Background animation (simple circles for visual appeal) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 dark:opacity-5">
        <div className="w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-8 rounded-lg w-full max-w-7xl mx-auto">
        <h1 ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight"> {/* Ukuran font responsif */}
          Halo, saya <span className="text-yellow-400">Lionel</span>
        </h1>
        <p ref={heroSubtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-8"> {/* Ukuran font responsif */}
          Seorang <span className="text-yellow-400">{displayedText}</span><span className="animate-blink">|</span>
        </p>
        <p ref={heroDescriptionRef} className="text-base sm:text-lg md:text-xl max-w-full mb-10 px-4 text-center"> {/* Ukuran font responsif, max-w-4xl */}
          Mengubah ide-ide kompleks menjadi pengalaman web yang intuitif dan indah. Mari jelajahi karya-karya saya!
        </p>
        <button
          ref={heroButtonRef}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          Lihat Proyek Saya
        </button>
      </div>
    </section>
  );
};

// About Me Section Component
const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 30 }, { // Ubah y: 50 ke y: 30, ease: "back.out(1.7)"
      opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Mulai animasi saat 80% bagian atas section terlihat
        toggleActions: "play none none none"
      }
    });
  }, []);

  const skills = [
    { name: 'HTML', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
    { name: 'CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette"><circle cx="12" cy="12" r="10"/><path d="M17 12a5 5 0 1 0-5 5V7a5 5 0 1 0 5 5Z"/></svg> },
    { name: 'JavaScript', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-braces"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> },
    { name: 'React.js', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom"><circle cx="12" cy="12" r="4"/><path d="M2 12c2.2 0 4.98-.36 7.32-2.08A9.74 9.74 0 0 0 12 2a9.74 9.74 0 0 0 2.68 7.92C17.02 11.64 19.8 12 22 12c-2.2 0-4.98.36-7.32 2.08A9.74 9.74 0 0 0 12 22a9.74 9.74 0 0 0-2.68-7.92C6.98 12.36 4.2 12 2 12Z"/></svg> },
    { name: 'Next.js', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
    { name: 'Tailwind CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paint-bucket"><path d="M19 11h-1a7 7 0 0 0-14 0H5a7 7 0 0 0 14 0Z"/><path d="M12 19V5"/><path d="M10 17H8"/><path d="M16 17h-2"/></svg> },
    { name: 'Git & GitHub', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.46 0 0-1 0-2 1a7.6 7.6 0 0 0-4 0c-1-1-2-1-2-1-.55 1.02-.9 2.22-.78 3.47 0 3.5 3 5.5 6 5.5A4.8 4.8 0 0 0 15 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 md:px-8 w-full opacity-0"> {/* Tambah opacity-0 untuk animasi awal */}
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">Tentang Saya</h2>
      {/* Konten di dalam About Section: Hapus max-w-6xl mx-auto agar bisa melar penuh */}
      <div className="flex flex-col md:flex-row items-center md:space-x-12 w-full">
        <div className="md:w-1/3 mb-8 md:mb-0">
          {/* Placeholder for Lionel's photo */}
          <img
            src="https://placehold.co/400x400/6366F1/FFFFFF?text=Lionel"
            alt="Foto Lionel"
            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg mx-auto transform transition-transform duration-500 hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/6366F1/FFFFFF?text=Lionel" }}
          />
        </div>
        <div className="md:w-2/3 text-lg leading-relaxed">
          <p className="mb-4">
            Halo! Nama saya Lionel, seorang <span className="font-semibold text-indigo-500">pengembang web yang bersemangat</span> dengan fokus pada pembuatan pengalaman digital yang menarik dan fungsional. Saya memiliki keahlian dalam membangun aplikasi web yang responsif dan berkinerja tinggi menggunakan teknologi modern.
          </p>
          <p className="mb-4">
            Perjalanan saya di dunia coding dimulai dari rasa penasaran yang mendalam terhadap bagaimana website bekerja. Sejak itu, saya telah mendedikasikan diri untuk menguasai berbagai bahasa dan *framework* yang memungkinkan saya mengubah ide-ide kompleks menjadi solusi yang elegan dan mudah digunakan.
          </p>
          <p className="mb-6">
            Saya percaya bahwa setiap baris kode harus memiliki tujuan, dan setiap proyek adalah kesempatan untuk belajar dan berinovasi. Saya selalu mencari tantangan baru dan bersemangat untuk berkolaborasi dalam menciptakan sesuatu yang luar biasa.
          </p>

          <h3 className="text-2xl font-bold mb-6 text-indigo-600">Keahlian Saya</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <span className="text-indigo-500">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 30 }, { // Ubah y: 50 ke y: 30, ease: "back.out(1.7)"
      opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  const projects = [
    {
      id: 1,
      title: "Aplikasi E-commerce Modern",
      description: "Platform belanja online responsif dengan fitur keranjang, pembayaran, dan manajemen produk. Dibangun dengan React dan Next.js.",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=E-commerce+App",
      link: "#", // Placeholder link
    },
    {
      id: 2,
      title: "Sistem Manajemen Tugas",
      description: "Aplikasi web untuk mengelola tugas harian, dengan fitur prioritas, deadline, dan notifikasi. Menggunakan React dan Firestore.",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Task+Manager",
      link: "#",
    },
    {
      id: 3,
      title: "Website Portofolio Interaktif",
      description: "Desain portofolio pribadi yang dinamis dan menarik, menampilkan proyek-proyek terbaru dengan animasi dan transisi.",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Interactive+Portfolio",
      link: "#",
    },
    {
      id: 4,
      title: "Blog Pribadi dengan Markdown",
      description: "Platform blog yang ringan dan cepat, mendukung penulisan dengan Markdown dan tampilan yang bersih. Dibuat dengan Next.js.",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Personal+Blog",
      link: "#",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-8 w-full opacity-0"> {/* Tambah opacity-0 untuk animasi awal */}
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">Proyek Unggulan</h2>
      {/* Projects Grid: Hapus max-w-6xl mx-auto agar bisa melar penuh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project) => (
          <div key={project.id} className="relative rounded-lg overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/4F46E5/FFFFFF?text=Placeholder" }}
            />
            <div className="p-6 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors duration-300"
              >
                Lihat Proyek
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link ml-2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 30 }, { // Ubah y: 50 ke y: 30, ease: "back.out(1.7)"
      opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage('Mengirim pesan...');
    // In a real application, you would send this data to a backend server.
    // For this example, we'll just simulate a successful send.
    setTimeout(() => {
      console.log('Form Data:', formData);
      setStatusMessage('Pesan Anda telah terkirim! Terima kasih.');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 md:px-8 w-full opacity-0"> {/* Tambah opacity-0 untuk animasi awal */}
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">Kontak Saya</h2>
      {/* Contact Card: Tetap batasi max-w-xl dan mx-auto agar form nyaman diisi */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"> {/* Ubah max-w-xl ke max-w-2xl */}
        <p className="text-center mb-8 text-lg">
          Tertarik untuk berkolaborasi atau hanya ingin menyapa? Jangan ragu untuk menghubungi saya!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pesan Anda</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            Kirim Pesan
          </button>
          {statusMessage && (
            <p className="mt-4 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400">{statusMessage}</p>
          )}
        </form>
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Temukan Saya di:</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/lionel" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.46 0 0-1 0-2 1a7.6 7.6 0 0 0-4 0c-1-1-2-1-2-1-.55 1.02-.9 2.22-.78 3.47 0 3.5 3 5.5 6 6.5A4.8 4.8 0 0 0 15 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://linkedin.com/in/lionel" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            {/* Add more social links as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
