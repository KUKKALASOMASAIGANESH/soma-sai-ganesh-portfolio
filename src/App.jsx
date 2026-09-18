import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { profile, experience, skills, projects, certifications, photos } from "./data/portfolio";

function Scene() {
  const points = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    position: [
      THREE.MathUtils.randFloatSpread(12),
      THREE.MathUtils.randFloatSpread(7),
      THREE.MathUtils.randFloatSpread(7),
    ],
    size: THREE.MathUtils.randFloat(0.012, 0.035),
    id: i,
  })), []);

  return (
    <Canvas className="hero-canvas" camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} intensity={10} color="#8b5cf6" />
      <pointLight position={[-3, -1, 2]} intensity={7} color="#06b6d4" />
      <Stars radius={18} depth={8} count={900} factor={1.2} saturation={0} fade speed={0.25} />
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[1.55, 3]} />
          <meshStandardMaterial wireframe color="#a78bfa" transparent opacity={0.38} />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[2.4, -0.7, -1.2]}>
          <torusGeometry args={[0.65, 0.015, 16, 80]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
        </mesh>
      </Float>
      {points.map((p) => <Particle key={p.id} {...p} />)}
    </Canvas>
  );
}

function Particle({ position, size }) {
  const ref = { current: null };
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.35 + position[0]) * 0.0008;
    ref.current.rotation.y += 0.001;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
    </mesh>
  );
}

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="section-kicker"><span>{index}</span>{eyebrow}</div>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
      </div>
      {description && <p className="max-w-xl text-sm leading-7 text-slate-400">{description}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/KUKKALASOMASAIGANESH")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => data && setGithubData(data))
      .catch(() => {});
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  const emailLink = `mailto:${profile.email}?subject=${encodeURIComponent("Project Inquiry")}&body=${encodeURIComponent("Hi Soma Sai Ganesh,\n\nI would like to discuss a project opportunity.\n\n")}`;

  return (
    <div className="site-shell">
      <div className="noise" />
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="brand" onClick={closeMenu} aria-label="Soma Sai Ganesh home"><span>SSG</span><i>.</i></a>
          <div className="desktop-nav">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
            <a className="nav-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mobile-nav">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => <a onClick={closeMenu} key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </motion.div>}
        </AnimatePresence>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
          <div className="hero-visual"><Scene /></div>
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
              <div className="availability"><span /> Open to software opportunities</div>
              <div className="hero-kicker"><Sparkles size={15} /> FULL STACK • AI/ML</div>
              <h1>Building <span>digital systems</span> that solve real problems.</h1>
              <p className="hero-lead">I'm <strong>Soma Sai Ganesh</strong>, a Computer Science & Engineering graduate specializing in Artificial Intelligence, with hands-on full-stack development experience.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a>
                <a className="btn btn-ghost" href={profile.resume} download>Download CV <Download size={17} /></a>
              </div>
              <div className="social-row">
                <a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
                <a href={emailLink}><Mail size={18} /> Email</a>
              </div>
            </motion.div>

            <motion.div className="hero-profile-wrap" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }}>
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="profile-card">
                <div className="profile-tag"><Code2 size={15} /> DEV_PROFILE_01</div>
                <img src="/images/profile.jpg" alt="Soma Sai Ganesh" />
                <div className="profile-card-footer"><div><small>Based in</small><strong><MapPin size={13} /> {profile.location}</strong></div><span>9.2 CGPA</span></div>
              </div>
              <div className="floating-chip chip-a"><Zap size={14} /> .NET 8</div>
              <div className="floating-chip chip-b"><span>AI</span> + React</div>
            </motion.div>
          </div>
          <a href="#about" className="scroll-hint"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section id="about" className="section container">
          <SectionHeading index="01" eyebrow="ABOUT ME" title="Code, curiosity & continuous learning." description="I enjoy working across backend systems, web applications, databases and AI/ML workflows." />
          <div className="about-grid">
            <motion.div className="glass-panel about-copy" whileHover={{ y: -4 }}>
              <p className="large-copy">Computer Science and Engineering graduate specialized in Artificial Intelligence with practical experience building full-stack applications.</p>
              <p>I currently work as a Full Stack Software Developer at Secon Pvt. Ltd., where I work with ASP.NET Core 8, .NET 8, PostgreSQL, JavaScript, HTML and CSS, while leading the Secon Library Management System as Team Lead.</p>
              <div className="mini-tags"><span>REST APIs</span><span>PostgreSQL</span><span>Team Leadership</span><span>AI-driven solutions</span></div>
            </motion.div>
            <div className="stats-grid">
              <Stat value="9.2" label="CGPA / 10" /><Stat value="4" label="Core projects" /><Stat value="20+" label="Technologies" /><Stat value={githubData?.public_repos ?? "18"} label="GitHub repos" />
            </div>
          </div>
        </section>

        <section id="experience" className="section container">
          <SectionHeading index="02" eyebrow="EXPERIENCE" title="Professional experience." />
          <div className="timeline">
            {experience.map((job, i) => <motion.article key={job.company} className="timeline-item" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .1 }}>
              <div className="timeline-dot" /><div className="glass-panel experience-card"><div className="experience-head"><div><div className="role-label"><BriefcaseBusiness size={14} /> EXPERIENCE</div><h3>{job.role}</h3><p>{job.company}</p></div><span className="period">{job.period}</span></div><ul>{job.points.map((p) => <li key={p}><CheckCircle2 size={15} />{p}</li>)}</ul></div>
            </motion.article>)}
          </div>
        </section>

        <section id="skills" className="section container">
          <SectionHeading index="03" eyebrow="TECH STACK" title="Technologies I work with." description="A practical mix of backend, frontend, database, AI/ML and developer tooling." />
          <div className="skills-grid">{skills.map(([name, category], i) => <motion.div key={name} className="skill-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 5) * .04 }} whileHover={{ y: -6, scale: 1.015 }}><div className="skill-number">{String(i + 1).padStart(2, '0')}</div><Code2 size={19} /><div><strong>{name}</strong><small>{category}</small></div></motion.div>)}</div>
        </section>

        <section id="projects" className="section container">
          <SectionHeading index="04" eyebrow="SELECTED WORK" title="Projects that show how I build." description="Explore the systems, applications and AI work included in my current portfolio." />
          <div className="projects-grid">
            {projects.map((project, i) => <motion.article key={project.title} className={`project-card accent-${project.accent}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: i * .08 }} whileHover={{ y: -8 }} onClick={() => setActiveProject(project)}>
              <div className="project-top"><span>{project.number}</span><ArrowUpRight size={20} /></div>
              <div className="project-art"><ProjectGraphic index={i} /></div>
              <div className="project-content"><span className="project-role">{project.role}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="project-links">
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Live demo <ExternalLink size={15} /></a>}
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>GitHub <Github size={15} /></a>}
                </div>
                <button>View case study <ArrowUpRight size={15} /></button>
              </div>
            </motion.article>)}
          </div>
        </section>

        <section className="section container">
          <div className="gallery-layout glass-panel">
            <div className="gallery-copy"><div className="section-kicker"><span>05</span> BEYOND THE CODE</div><h2>A little more <span>personality.</span></h2><p>A few personal photos give the portfolio a human side while keeping the overall presentation professional.</p><div className="gallery-controls"><button onClick={prevPhoto} aria-label="Previous photo"><ChevronLeft /></button><span>{String(photoIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span><button onClick={nextPhoto} aria-label="Next photo"><ChevronRight /></button></div></div>
            <div className="gallery-frame"><AnimatePresence mode="wait"><motion.img key={photos[photoIndex]} src={photos[photoIndex]} alt="Soma Sai Ganesh" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: .35 }} /></AnimatePresence></div>
          </div>
        </section>

        <section className="section container">
          <SectionHeading index="06" eyebrow="CERTIFICATIONS" title="Credentials & learning." />
          <div className="cert-grid">{certifications.map((cert, i) => <div className="cert-card" key={cert}><span>{String(i + 1).padStart(2, '0')}</span><CheckCircle2 size={19} /><strong>{cert}</strong></div>)}</div>
        </section>

        <section id="contact" className="section container contact-section">
          <div className="contact-box">
            <div className="contact-orb" />
            <div className="section-kicker"><span>07</span> LET'S CONNECT</div>
            <h2>Have a project, role or idea in mind?</h2>
            <p>I'm open to software development opportunities, collaborations and interesting technical challenges.</p>
            <div className="contact-panel">
              <form action="https://formsubmit.co/2200032791cseh@gmail.com" method="POST" className="chat-form">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New portfolio inquiry" />
                <div className="chat-grid">
                  <label>
                    <span>Name</span>
                    <input type="text" name="name" placeholder="Your name" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" name="email" placeholder="you@example.com" required />
                  </label>
                </div>
                <label>
                  <span>Message</span>
                  <textarea name="message" placeholder="Tell me about your project or opportunity..." rows="5" required />
                </label>
                <button type="submit" className="btn btn-primary">Send message <Mail size={17} /></button>
              </form>
              <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Linkedin size={17} /></a>
            </div>
            <div className="contact-details"><span><Mail size={15} /> {profile.email}</span><span><MapPin size={15} /> {profile.location}</span></div>
          </div>
        </section>
      </main>

      <footer className="footer container"><a className="brand" href="#home"><span>SSG</span><i>.</i></a><p>Designed & built with React, motion and a little curiosity.</p><div><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /></a></div></footer>

      <AnimatePresence>
        {activeProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}>
          <motion.div className="project-modal" initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close"><X /></button>
            <span className="project-role">{activeProject.role}</span><h2>{activeProject.title}</h2><p>{activeProject.description}</p><h4>Technology stack</h4><div className="tech-list">{activeProject.tech.map(t => <span key={t}>{t}</span>)}</div>
            <div className="project-links modal-links">
              {activeProject.demo && <a href={activeProject.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>}
              {activeProject.github && <a href={activeProject.github} target="_blank" rel="noreferrer">GitHub <Github size={15} /></a>}
            </div>
            <div className="modal-note"><Sparkles size={18} /><span>This case-study view is ready for your screenshots, live demo URL and GitHub repository link as we add each project's assets.</span></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

function Stat({ value, label }) { return <motion.div className="stat-card" whileHover={{ y: -5 }}><strong>{value}</strong><span>{label}</span></motion.div>; }

function ProjectGraphic({ index }) {
  const labels = ["LIBRARY / API", "SMART CITY / JAVA", "ANALYTICS / MERN", "VISION / AI"];
  return <div className={`graphic graphic-${index}`}><div className="graphic-grid" /><div className="graphic-ring" /><div className="graphic-core">{index === 0 ? "{}" : index === 1 ? "< />" : index === 2 ? "01" : "AI"}</div><span>{labels[index]}</span></div>;
}

export default App;
