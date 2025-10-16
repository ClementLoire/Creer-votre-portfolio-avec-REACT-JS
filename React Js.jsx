import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Twitter, Linkedin, Mail, Phone, MapPin, Display, FileCode, Search } from 'lucide-react';

export default function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [githubData, setGithubData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Récupération des données GitHub une seule fois au chargement (useEffect)
  useEffect(() => {
    fetch('https://api.github.com/users/github-john-doe')
      .then(response => response.ok ? response.json() : null)
      .then(data => setGithubData(data))
      .catch(error => console.error('Erreur GitHub:', error));
  }, []);

  // Ajouter/retirer le meta noindex pour la page mentions légales
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]');
    
    if (currentPage === 'legal') {
      if (!metaRobots) {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    } else {
      if (metaRobots) {
        metaRobots.remove();
      }
    }
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      {/* Header */}
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Pages */}
      <main>
        {currentPage === 'home' && <HomePage setShowModal={setShowModal} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'portfolio' && <PortfolioPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'legal' && <LegalPage />}
      </main>

      {/* Footer */}
      <Footer navigateTo={navigateTo} />

      {/* Modale GitHub */}
      {showModal && (
        <GitHubModal 
          githubData={githubData} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}

function Header({ currentPage, navigateTo, menuOpen, setMenuOpen }) {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Réalisations' },
    { id: 'contact', label: 'Me contacter' }
  ];

  return (
    <header className="bg-gray-900 text-white fixed w-full top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="text-2xl font-bold tracking-wider hover:text-blue-400 transition"
            style={{ fontWeight: 600 }}
          >
            JOHN DOE
          </button>

          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`uppercase text-sm transition hover:underline underline-offset-8 decoration-2 ${
                    currentPage === item.id ? 'font-bold underline' : ''
                  }`}
                  style={{ fontWeight: currentPage === item.id ? 600 : 400 }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Burger Menu Mobile */}
          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <ul className="md:hidden mt-4 space-y-2">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`block w-full text-left uppercase py-2 ${
                    currentPage === item.id ? 'font-bold underline' : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

// Page d'accueil //
function HomePage({ setShowModal }) {
  const [progressVisible, setProgressVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setProgressVisible(true), 100);
  }, []);

  const skills = [
    { name: 'HTML5', level: 90, color: 'bg-red-500' },
    { name: 'CSS3', level: 80, color: 'bg-blue-400' },
    { name: 'JAVASCRIPT', level: 70, color: 'bg-yellow-500' },
    { name: 'PHP', level: 60, color: 'bg-green-500' },
    { name: 'REACT', level: 50, color: 'bg-blue-500' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="h-screen flex items-center justify-center text-white text-center relative"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="z-10 px-4">
          <h1 className="text-5xl md:text-6xl mb-4" style={{ fontWeight: 600 }}>Bonjour, je suis John Doe</h1>
          <h2 className="text-2xl md:text-3xl mb-8" style={{ fontWeight: 600 }}>Développeur web full stack</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition transform hover:-translate-y-1 hover:shadow-lg"
            style={{ fontWeight: 600 }}
          >
            En savoir plus
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h3 className="text-3xl mb-6" style={{ fontWeight: 600 }}>À propos</h3>
            <p className="mb-4">
              Passionné par l'informatique et les nouvelles technologies, j'ai suivi une formation d'<strong>intégrateur-développeur web</strong> au CEF. Au cours de cette formation, j'ai pu acquérir des bases solides pour travailler dans le domaine du <strong>développement web</strong>.
            </p>
            <p className="mb-4">
              Basé à Lyon, je suis en recherche d'une alternance au sein d'une agence digitale pour consolider ma formation de <strong>développeur web full stack</strong>.
            </p>
            <p>
              J'accorde une attention particulière à la qualité du code que j'écris et je respecte les bonnes pratiques du web.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" 
              alt="John Doe" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>

        {/* Compétences */}
        <div>
          <h3 className="text-3xl mb-8" style={{ fontWeight: 600 }}>Mes compétences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ fontWeight: 600 }}>{skill.level}%</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} transition-all ease-out`}
                    style={{ 
                      width: progressVisible ? `${skill.level}%` : '0%',
                      transitionDuration: '1500ms'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Page Services //
function ServicesPage() {
  const services = [
    {
      icon: <Display className="w-16 h-16 text-blue-500 mb-4" />,
      title: "UX / UI DESIGN",
      description: "L'UX Design et l'UI Design représentent en réalité un tout qu'il faut savoir maîtriser et équilibrer."
    },
    {
      icon: <FileCode className="w-16 h-16 text-blue-500 mb-4" />,
      title: "DÉVELOPPEMENT WEB",
      description: "Le développement de sites web repose sur l'utilisation des langages HTML, CSS, JavaScript et PHP."
    },
    {
      icon: <Search className="w-16 h-16 text-blue-500 mb-4" />,
      title: "RÉFÉRENCEMENT",
      description: "Le référencement naturel d'un site, aussi appelé SEO, consiste à mettre des techniques en œuvre pour améliorer sa position dans les résultats des moteurs de recherche."
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>MON OFFRE DE SERVICES</h2>
          <p className="text-xl text-gray-600">Voici les prestations sur lesquelles je peux intervenir.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-8 text-center transition-all duration-300 cursor-pointer"
              style={{
                ':hover': {
                  backgroundColor: '#efefef',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  transform: 'translateY(-5px)'
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#efefef';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h5 className="text-xl mb-4" style={{ fontWeight: 600 }}>{service.title}</h5>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Page Réalisations //
function PortfolioPage() {
  const projects = [
    { title: "Fresh Food", description: "Réalisation d'un site avec commande en ligne.", tech: "Site réalisé avec PHP et MySQL", image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500" },
    { title: "Restaurant Akira", description: "Réalisation d'un site vitrine.", tech: "Site réalisé avec WordPress", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500" },
    { title: "Espace bien-être", description: "Réalisation d'un site vitrine pour un praticien de bien-être.", tech: "Site réalisé en HTML/CSS", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500" },
    { title: "SEO", description: "Réalisation d'un site vitrine pour une agence SEO.", tech: "Site réalisé avec Laravel", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500" },
    { title: "Coder", description: "Création d'une application web pour apprendre à coder.", tech: "Application réalisée en React", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500" },
    { title: "Maquette", description: "Réalisation d'une maquette pour un client.", tech: "Maquette réalisée avec Photoshop", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500" }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>PORTFOLIO</h2>
          <p className="text-xl text-gray-600">Voici quelques-unes de mes réalisations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#efefef';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h5 className="text-xl mb-2" style={{ fontWeight: 600 }}>{project.title}</h5>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button 
                  className="text-blue-500 border border-blue-500 px-4 py-2 rounded transition"
                  style={{ fontWeight: 600 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0d6efd';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#0d6efd';
                  }}
                >
                  Voir
                </button>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t">
                <small className="text-gray-500">{project.tech}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Page Contact //
function ContactPage() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' });
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.telephone || !formData.sujet || !formData.message) {
      setAlert({ type: 'danger', message: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setAlert({ type: 'danger', message: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    setAlert({ type: 'success', message: 'Votre message a été envoyé avec succès !' });
    setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' });
    
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>ME CONTACTER</h2>
          <p className="text-xl text-gray-600">Pour me contacter en vue d'un entretien ou d'une future collaboration, merci de remplir le formulaire de contact.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div>
            <h3 className="text-2xl mb-6" style={{ fontWeight: 600 }}>Formulaire de contact</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <input
                type="email"
                placeholder="Votre adresse email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <input
                type="tel"
                placeholder="Votre numéro de téléphone"
                value={formData.telephone}
                onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <input
                type="text"
                placeholder="Sujet"
                value={formData.sujet}
                onChange={(e) => setFormData({...formData, sujet: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
              <textarea
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                style={{ fontWeight: 600 }}
              >
                Envoyer
              </button>
            </form>

            {alert && (
              <div className={`mt-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {alert.message}
              </div>
            )}
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="text-2xl mb-6" style={{ fontWeight: 600 }}>Mes coordonnées</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <strong>Adresse :</strong><br />
                  40 Rue Laure Diebold, 69009 Lyon, France
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <div><strong>Téléphone :</strong> 06 20 30 40 50</div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <div><strong>Email :</strong> john.doe@gmail.com</div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.626965754607!2d4.796403976617905!3d45.778661471072626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eb65edac5b3f%3A0xe01c47049cb2e2b9!2s40%20Rue%20Laure%20Diebold%2C%2069009%20Lyon!5e0!3m2!1sfr!2sfr!4v1645180449739!5m2!1sfr!2sfr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps - Localisation John Doe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page Mentions Légales //
function LegalPage() {
  const [openSection, setOpenSection] = useState('editor');

  const sections = [
    { 
      id: 'editor', 
      title: 'Éditeur du site', 
      content: (
        <>
          <strong>John Doe</strong><br/>
          40 Rue Laure Diebold<br/>
          69009 Lyon, France<br/>
          Téléphone : 06 20 30 40 50<br/>
          Email : john.doe@gmail.com
        </>
      )
    },
    { 
      id: 'host', 
      title: 'Hébergeur', 
      content: (
        <>
          <strong>Always Data</strong><br/>
          91 rue du Faubourg Saint Honoré<br/>
          75008 Paris<br/>
          <a href="https://www.alwaysdata.com" target="_blank" rel="noopener" className="text-blue-500 hover:underline">
            www.alwaysdata.com
          </a>
        </>
      )
    },
    { 
      id: 'credits', 
      title: 'Crédits', 
      content: (
        <>
          <strong>Images :</strong><br/>
          Les images libres de droit sont issues du site{' '}
          <a href="https://pixabay.com" target="_blank" rel="noopener" className="text-blue-500 hover:underline">
            Pixabay
          </a>.<br/><br/>
          <strong>Favicon :</strong><br/>
          <a href="https://www.flaticon.com/free-icons/john-doe" target="_blank" rel="noopener" className="text-blue-500 hover:underline">
            John doe icons created by Freepik - Flaticon
          </a>
        </>
      )
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl" style={{ fontWeight: 600 }}>MENTIONS LÉGALES</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {sections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className={`w-full px-6 py-4 text-left flex justify-between items-center transition ${
                  openSection === section.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
                }`}
                style={{ fontWeight: 600 }}
              >
                {section.title}
                <ChevronDown 
                  className={`transform transition-transform ${openSection === section.id ? 'rotate-180' : ''}`} 
                  size={20}
                />
              </button>
              {openSection === section.id && (
                <div className="px-6 py-4 bg-white border-t">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant Footer //
function Footer({ navigateTo }) {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne 1 */}
          <div>
            <h5 className="text-xl mb-4" style={{ fontWeight: 600 }}>John Doe</h5>
            <p className="text-gray-300 mb-4">
              40 Rue Laure Diebold<br/>
              69009 Lyon, France<br/>
              Téléphone : 06 20 30 40 50
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/github-john-doe" 
                target="_blank" 
                rel="noopener nofollow" 
                className="text-gray-300 hover:text-white transition transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener nofollow" 
                className="text-gray-300 hover:text-white transition transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener nofollow" 
                className="text-gray-300 hover:text-white transition transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Colonne 2 */}
          <div>
            <h5 className="text-xl mb-4" style={{ fontWeight: 600 }}>Liens utiles</h5>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'services', label: 'Services' },
                { id: 'portfolio', label: 'Réalisations' },
                { id: 'contact', label: 'Me contacter' },
                { id: 'legal', label: 'Mentions légales' }
              ].map(page => (
                <li key={page.id}>
                  <button
                    onClick={() => navigateTo(page.id)}
                    className="text-gray-300 hover:text-white transition"
                    style={{ fontWeight: 400 }}
                    onMouseEnter={(e) => e.currentTarget.style.fontWeight = '600'}
                    onMouseLeave={(e) => e.currentTarget.style.fontWeight = '400'}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 */}
          <div>
            <h5 className="text-xl mb-4" style={{ fontWeight: 600 }}>Mes dernières réalisations</h5>
            <ul className="space-y-2">
              {['Fresh Food', 'Restaurant Akira', 'Espace bien-être'].map(project => (
                <li key={project}>
                  <button
                    onClick={() => navigateTo('portfolio')}
                    className="text-gray-300 hover:text-white transition"
                    style={{ fontWeight: 400 }}
                    onMouseEnter={(e) => e.currentTarget.style.fontWeight = '600'}
                    onMouseLeave={(e) => e.currentTarget.style.fontWeight = '400'}
                  >
                    {project}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-400">
          <p>© Designed by John Doe</p>
        </div>
      </div>
    </footer>
  );
}

// Modale GitHub //
function GitHubModal({ githubData, onClose }) {
  if (!githubData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg max-w-2xl w-full p-8" onClick={e => e.stopPropagation()}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Chargement des informations GitHub...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 rounded-t-lg flex justify-between items-center">
          <h5 className="text-xl" style={{ fontWeight: 600 }}>Profil GitHub</h5>
          <button 
            onClick={onClose} 
            className="text-2xl hover:text-gray-300 transition"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <img 
            src={githubData.avatar_url} 
            alt={githubData.name || githubData.login}
            className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto mb-4"
          />
          <h3 className="text-2xl mb-2" style={{ fontWeight: 600 }}>
            {githubData.name || githubData.login}
          </h3>
          <p className="text-gray-500 mb-4">@{githubData.login}</p>
          {githubData.bio && <p className="mb-6 text-gray-700">{githubData.bio}</p>}

          {/* Stats */}
          <div className="flex justify-around my-8">
            <div>
              <div className="text-3xl text-blue-500" style={{ fontWeight: 600 }}>
                {githubData.public_repos}
              </div>
              <div className="text-sm text-gray-500">Repositories</div>
            </div>
            <div>
              <div className="text-3xl text-blue-500" style={{ fontWeight: 600 }}>
                {githubData.followers}
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div>
              <div className="text-3xl text-blue-500" style={{ fontWeight: 600 }}>
                {githubData.following}
              </div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-6 text-left">
            {githubData.location && (
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <span>{githubData.location}</span>
              </div>
            )}
            {githubData.blog && (
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a 
                  href={githubData.blog} 
                  target="_blank" 
                  rel="noopener" 
                  className="text-blue-500 hover:underline"
                >
                  {githubData.blog}
                </a>
              </div>
            )}
            {githubData.company && (
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{githubData.company}</span>
              </div>
            )}
          </div>

          <a 
            href={githubData.html_url} 
            target="_blank" 
            rel="noopener" 
            className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-6 transition"
            style={{ fontWeight: 600 }}
          >
            <Github className="w-5 h-5 mr-2" />
            Voir le profil GitHub
          </a>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
            style={{ fontWeight: 600 }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}