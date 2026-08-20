import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, FolderOpen, Menu, Play, Quote, X } from 'lucide-react';

type Project = {
  title: string;
  type: string;
  year: string;
  description: string;
  image: string;
  size: 'feature' | 'small';
};

type IndiaStory = {
  number: string;
  place: string;
  title: string;
  note: string;
  url: string;
  embedUrl: string;
};

const projects: Project[] = [
  {
    title: 'Chrome & Shadows',
    type: 'Commercial',
    year: '2024',
    description: 'A study in engineered light for a machine built to disappear into the night. Steel, skin, and the exact moment before ignition.',
    image: '/chrome-shadows.jpg',
    size: 'feature',
  },
  {
    title: 'Desert Frequency',
    type: 'Music Video',
    year: '2024',
    description: 'A restless body moves through the Thar as the horizon changes key.',
    image: '/desert-frequency.jpg',
    size: 'small',
  },
  {
    title: 'Vessel',
    type: 'Narrative',
    year: '2023',
    description: 'A quiet room, a monsoon, and everything that remains unsaid.',
    image: '/vessel.jpg',
    size: 'small',
  },
  {
    title: 'Gold Thread',
    type: 'Documentary',
    year: '2023',
    description: 'Hands, memory, and the patient geometry of a Banarasi loom.',
    image: '/gold-thread.jpg',
    size: 'feature',
  },
];

const indiaStories: IndiaStory[] = [
  {
    number: '01',
    place: 'KUTCH / GUJARAT',
    title: 'Salt, Wind, Light',
    note: 'A horizon that holds its breath.',
    url: 'https://drive.google.com/drive/folders/15cDLRlbKhIM2-0DY9aGuaAlhrxKqz6md',
    embedUrl: 'https://drive.google.com/embeddedfolderview?id=15cDLRlbKhIM2-0DY9aGuaAlhrxKqz6md#list',
  },
  {
    number: '02',
    place: 'VARANASI / UTTAR PRADESH',
    title: 'The River Keeps Score',
    note: 'Morning on the ghats, before the city wakes.',
    url: 'https://drive.google.com/drive/folders/1s9ByaEsBC4Gc80eTuv4C5qj1dDO1PScc',
    embedUrl: 'https://drive.google.com/embeddedfolderview?id=1s9ByaEsBC4Gc80eTuv4C5qj1dDO1PScc#list',
  },
  {
    number: '03',
    place: 'JAISALMER / RAJASTHAN',
    title: 'A Desert in Motion',
    note: 'Dust, rhythm, and the last orange hour.',
    url: 'https://drive.google.com/drive/folders/1LWTiHk98p423gHTdCoN48vlmDJUqKx10',
    embedUrl: 'https://drive.google.com/embeddedfolderview?id=1LWTiHk98p423gHTdCoN48vlmDJUqKx10#list',
  },
  {
    number: '04',
    place: 'KOLKATA / WEST BENGAL',
    title: 'Rain in the Old City',
    note: 'A portrait shaped by weather.',
    url: 'https://drive.google.com/drive/folders/1zyvgWkBohNvAp7-jYBkSdeJTgjkW_xnx',
    embedUrl: 'https://drive.google.com/embeddedfolderview?id=1zyvgWkBohNvAp7-jYBkSdeJTgjkW_xnx#list',
  },
];

const navItems = [
  ['work', 'Work'],
  ['featured-india', 'India'],
  ['about', 'About'],
  ['craft', 'Craft'],
  ['gallery', 'Voices'],
  ['contact', 'Contact'],
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#hero" className="group flex items-center gap-3" aria-label="OM W MOTIONS home" data-testid="link-logo">
      <span className="relative flex h-8 w-8 items-center justify-center border border-foreground/35 text-[11px] font-bold tracking-[-0.08em] text-foreground">
        OM
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent" />
      </span>
      {!compact && <span className="hidden text-[10px] font-semibold tracking-[0.28em] text-foreground/70 sm:inline">OM W MOTIONS</span>}
    </a>
  );
}

function SectionKicker({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent" data-testid={`text-kicker-${index}`}>
      <span>— {index}</span>
      <span className="h-px w-8 bg-accent/60" />
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ href, children, testId }: { href: string; children: ReactNode; testId: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-3 border-b border-accent/50 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent" data-testid={testId}>
      <span>{children}</span>
      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <button
      type="button"
      className={`project-card group relative min-h-[300px] overflow-hidden border border-border text-left ${project.size === 'feature' ? 'md:col-span-2 md:min-h-[560px]' : 'md:min-h-[340px]'}`}
      onClick={() => onOpen(project)}
      data-testid={`button-project-${project.title.toLowerCase().replace(/\s/g, '-')}`}
      aria-label={`View ${project.title} project`}
    >
      <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="project-shade absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,.05)_15%,rgba(12,10,8,.86)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 md:p-7">
        <div>
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-accent">{project.type}</span>
          <h3 className="font-display text-2xl italic text-foreground md:text-3xl">{project.title}</h3>
        </div>
        <span className="font-mono text-[10px] text-foreground/60">{project.year}</span>
      </div>
      <span className="absolute right-5 top-5 z-10 flex h-10 w-10 translate-x-2 -translate-y-2 items-center justify-center border border-foreground/40 bg-background/20 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <Play className="ml-0.5 h-3 w-3 fill-current" />
      </span>
    </button>
  );
}

function IndiaStoryCard({ story }: { story: IndiaStory }) {
  return (
    <article className="border-t border-border pt-5" data-testid={`story-${story.number}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] text-accent">{story.number}</span>
          <span className="ml-3 font-mono text-[9px] tracking-[0.16em] text-muted-foreground">{story.place}</span>
        </div>
        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <h3 className="font-display text-2xl italic text-foreground">{story.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{story.note}</p>
      <div className="mt-5 overflow-hidden border border-border bg-secondary">
        <div className="relative aspect-[16/9]">
          <iframe
            src={story.embedUrl}
            title={`${story.title} Google Drive folder`}
            className="drive-frame absolute inset-0 h-full w-full"
            loading="lazy"
            data-testid={`iframe-drive-${story.number}`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">Drive folder / playback may vary</span>
          <a href={story.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-accent transition-colors hover:text-foreground" data-testid={`link-open-drive-${story.number}`}>
            <FolderOpen className="h-3 w-3" /> Open folder <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, activeProject]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grain min-h-[100dvh] overflow-hidden bg-background">
      <div className="fixed left-0 top-0 z-[70] h-0.5 w-[28%] bg-accent" aria-hidden="true" />
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-background/70 px-5 py-5 backdrop-blur-md md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted-foreground transition-colors hover:text-accent" data-testid={`link-nav-${id}`}>{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="mailto:omwmotions@gmail.com" className="hidden border border-border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:inline-flex" data-testid="link-header-email">Start a conversation</a>
            <button type="button" onClick={() => setMenuOpen(true)} className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent md:hidden" aria-label="Open navigation menu" data-testid="button-open-menu"><Menu className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col justify-between bg-background px-6 py-6 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="flex items-center justify-between"><Logo compact /><button type="button" onClick={() => setMenuOpen(false)} className="flex h-9 w-9 items-center justify-center border border-border" aria-label="Close navigation menu" data-testid="button-close-menu"><X className="h-4 w-4" /></button></div>
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navItems.map(([id, label], index) => (
              <button key={id} type="button" onClick={() => navigate(id)} className="text-left font-display text-5xl italic text-foreground transition-colors hover:text-accent" data-testid={`button-mobile-nav-${id}`}><span className="mr-3 align-top font-mono text-[10px] not-italic text-accent">0{index + 1}</span>{label}</button>
            ))}
          </nav>
          <a href="mailto:omwmotions@gmail.com" className="font-mono text-[10px] tracking-[0.13em] text-accent" data-testid="link-mobile-email">omwmotions@gmail.com</a>
        </div>
      )}

      <main>
        <section id="hero" className="relative flex min-h-[100dvh] items-end overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pb-16 lg:px-16" aria-label="Introduction">
          <img src="/hero-still.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,17,12,.94)_0%,rgba(22,17,12,.55)_48%,rgba(22,17,12,.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(22,17,12,.98)_0%,transparent_55%)]" />
          <div className="hero-orbit absolute right-[9%] top-[25%] h-[44vw] w-[44vw] max-w-[620px] rounded-full border border-accent/30 opacity-70" aria-hidden="true"><div className="absolute -left-1 top-1/2 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_7px_rgba(225,102,67,.12)]" /></div>
          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <div className="mb-24 flex items-center justify-between md:mb-36"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Cinematographer / Director of Photography</p><p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground md:block">India · Worldwide</p></div>
            <div className="max-w-5xl">
              <h1 className="font-sans text-[clamp(4rem,13vw,11.5rem)] font-extrabold leading-[.82] tracking-[-0.09em] text-foreground">OM W<br /><span className="font-display font-medium italic tracking-[-0.08em] text-transparent" style={{ WebkitTextStroke: '1px rgba(242,235,217,.72)' }}>MOTIONS</span></h1>
              <div className="mt-9 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <p className="max-w-sm text-base leading-relaxed text-foreground/70 md:text-lg">Images with a pulse. Light that remembers where it came from.</p>
                <a href="#work" className="group flex items-center gap-4 self-start md:self-end" data-testid="link-hero-work"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">Enter the reel</span><span className="h-px w-14 bg-accent transition-all duration-500 group-hover:w-24" /><ArrowDownRight className="h-4 w-4 text-accent" /></a>
              </div>
            </div>
            <div className="mt-20 flex items-end justify-between border-t border-foreground/15 pt-5"><div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground"><span className="h-8 w-px bg-accent" />Scroll to explore</div><div className="text-right font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"><span className="block">Est. 2019</span><span className="mt-1 block text-accent">Ahmedabad / Bombay</span></div></div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-border bg-secondary py-4" aria-label="Project highlights">
          <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {[...['Rajasthan wedding film', 'Mumbai brand campaign', 'Jaipur fashion editorial', 'Ahmedabad music video', 'Goa documentary', 'Varanasi portrait'], ...['Rajasthan wedding film', 'Mumbai brand campaign', 'Jaipur fashion editorial', 'Ahmedabad music video', 'Goa documentary', 'Varanasi portrait']].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-10"><span>{item}</span><span className="text-accent">/</span></span>)}
          </div>
        </div>

        <section id="work" className="px-5 py-24 md:px-10 md:py-36 lg:px-16" aria-label="Featured work">
          <div className="reveal mx-auto max-w-[1440px]">
            <div className="mb-14 flex flex-col justify-between gap-7 md:mb-20 md:flex-row md:items-end">
              <div><SectionKicker index="01">Selected work</SectionKicker><h2 className="max-w-xl font-sans text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[.86] tracking-[-0.08em]">THE<br /><span className="font-display font-medium italic text-accent">DIRECTOR'S CUT</span></h2></div>
              <div className="max-w-xs"><p className="mb-5 text-sm leading-relaxed text-muted-foreground">Commercials, stories, and small truths. A selection of frames built to live beyond the brief.</p><ArrowLink href="#featured-india" testId="link-work-india">See the India stories</ArrowLink></div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3" role="list">{projects.map((project) => <ProjectCard key={project.title} project={project} onOpen={setActiveProject} />)}</div>
          </div>
        </section>

        <section id="featured-india" className="bg-secondary px-5 py-24 md:px-10 md:py-36 lg:px-16" aria-label="Stories from across India">
          <div className="mx-auto max-w-[1440px]">
            <div className="reveal mb-14 flex flex-col justify-between gap-8 border-b border-border pb-10 md:mb-20 md:flex-row md:items-end">
              <div><SectionKicker index="02">Field notes / open folders</SectionKicker><h2 className="max-w-3xl font-sans text-[clamp(3.2rem,8vw,7.5rem)] font-bold leading-[.84] tracking-[-0.08em]">STORIES FROM<br /><span className="font-display font-medium italic text-accent">ACROSS INDIA</span></h2></div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Four places. Four temperatures of light. Browse the working folders from the road.</p>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-16 md:grid-cols-2">{indiaStories.map((story) => <IndiaStoryCard key={story.number} story={story} />)}</div>
          </div>
        </section>

        <section id="about" className="px-5 py-24 md:px-10 md:py-36 lg:px-16" aria-label="About OM Vaisnav">
          <div className="reveal mx-auto grid max-w-[1440px] grid-cols-1 gap-14 md:grid-cols-[.8fr_1.5fr] md:gap-24">
            <div><SectionKicker index="03">The person behind the frame</SectionKicker><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">OM VAISNAV<br />CINEMATOGRAPHER / DP</p></div>
            <div><p className="max-w-4xl font-display text-[clamp(2.2rem,4.3vw,4.8rem)] leading-[1.05] text-foreground">I look for the <em className="text-accent">quiet charge</em> in a room — the glance before the line, the dust in the light, the colour a place keeps after sunset.</p><p className="mt-10 max-w-lg text-sm leading-relaxed text-muted-foreground">Based between Ahmedabad and Bombay, I work across commercial, narrative, documentary, and music films. The approach is simple: listen first, then make the frame feel inevitable.</p><div className="mt-10"><ArrowLink href="#contact" testId="link-about-contact">Talk through a project</ArrowLink></div></div>
          </div>
        </section>

        <section id="craft" className="border-y border-border bg-[#211c16] px-5 py-24 md:px-10 md:py-36 lg:px-16" aria-label="Services">
          <div className="mx-auto max-w-[1440px]">
            <div className="reveal mb-16"><SectionKicker index="04">Ways of working</SectionKicker><h2 className="font-sans text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[.84] tracking-[-0.08em]">THE<br /><span className="font-display font-medium italic text-accent">CRAFT</span></h2></div>
            <div className="grid grid-cols-1 gap-x-16 md:grid-cols-2">{[['01', 'Commercial', 'Product films with a point of view. Texture, pace, and a clean visual language that earns attention.'], ['02', 'Narrative', 'Character-led images that stay close to the human detail — from the first table read to the final grade.'], ['03', 'Documentary', 'Real people, real places, observed with patience. A camera that knows when not to interrupt.'], ['04', 'Music video', 'Rhythm made visible. World-building, performance, and the kind of image that belongs to the song.']].map(([number, title, copy]) => <article key={number} className="reveal group border-t border-border py-7 transition-colors hover:border-accent"><div className="grid grid-cols-[52px_1fr] gap-4"><span className="font-mono text-[10px] text-accent">{number}</span><div><h3 className="font-display text-3xl italic text-foreground transition-colors group-hover:text-accent">{title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div></article>)}</div>
          </div>
        </section>

        <section id="gallery" className="px-5 py-24 md:px-10 md:py-36 lg:px-16" aria-label="Voices from the set">
          <div className="reveal mx-auto max-w-[1440px]"><div className="mb-14 flex items-end justify-between"><div><SectionKicker index="05">Voices from the set</SectionKicker><h2 className="font-sans text-[clamp(3.3rem,8vw,7rem)] font-bold leading-[.84] tracking-[-0.08em]">IN GOOD<br /><span className="font-display font-medium italic text-accent">COMPANY</span></h2></div><Quote className="hidden h-12 w-12 text-accent/50 md:block" /></div><div className="grid grid-cols-1 gap-4 md:grid-cols-3"><blockquote className="border border-border bg-secondary p-7 md:col-span-2 md:p-10"><Quote className="mb-10 h-7 w-7 text-accent" /><p className="font-display text-3xl leading-tight text-foreground md:text-5xl">“Om sees the story before the camera arrives. That is a rare kind of calm on a set.”</p><footer className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">— Rhea Mehta / Director</footer></blockquote><blockquote className="flex flex-col justify-between border border-border p-7 md:p-9"><p className="font-display text-2xl leading-snug text-foreground">“He made our city feel like a character, not a backdrop.”</p><footer className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">— Aarav Shah / Producer</footer></blockquote></div></div>
        </section>

        <section id="awards" className="border-t border-border px-5 py-20 md:px-10 md:py-28 lg:px-16" aria-label="Recognition and reach">
          <div className="reveal mx-auto max-w-[1440px]"><div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]"><div><SectionKicker index="06">Recognition / reach</SectionKicker><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">A growing trail of work across festivals, cities, and screens.</p></div><div className="grid grid-cols-1 border-t border-border sm:grid-cols-3"><div className="border-b border-border py-6 sm:border-r sm:pr-8"><span className="font-display text-5xl italic text-accent">14</span><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Cities filmed</p></div><div className="border-b border-border py-6 sm:px-8"><span className="font-display text-5xl italic text-accent">07</span><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Festival selections</p></div><div className="border-b border-border py-6 sm:pl-8"><span className="font-display text-5xl italic text-accent">19</span><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Since the first roll</p></div></div></div></div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-accent px-5 py-28 text-accent-foreground md:px-10 md:py-40 lg:px-16" aria-label="Contact">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-accent-foreground/20" aria-hidden="true" /><div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-accent-foreground/15" aria-hidden="true" />
          <div className="reveal relative mx-auto max-w-[1440px]"><SectionKicker index="07">The next frame</SectionKicker><div className="flex flex-col justify-between gap-12 md:flex-row md:items-end"><div><h2 className="max-w-4xl font-sans text-[clamp(3.6rem,9vw,9rem)] font-extrabold leading-[.8] tracking-[-0.09em]">LET'S MAKE<br /><span className="font-display font-medium italic">SOMETHING</span></h2><p className="mt-8 max-w-sm text-sm leading-relaxed text-accent-foreground/75">Have a film in mind, a place worth listening to, or a brief that needs a pulse?</p></div><a href="mailto:omwmotions@gmail.com" className="group inline-flex items-center gap-4 self-start border-b border-accent-foreground/60 pb-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:border-accent-foreground md:self-end" data-testid="link-contact-email">omwmotions@gmail.com <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></div>
        </section>
      </main>

      <footer className="bg-background px-5 py-7 md:px-10 lg:px-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 border-t border-border pt-6 sm:flex-row sm:items-center"><Logo /><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">© 2025 OM W MOTIONS / All images in motion</p><a href="#hero" className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent" data-testid="link-back-top">Back to top ↑</a></div></footer>

      {activeProject && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/90 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`${activeProject.title} project details`} onClick={() => setActiveProject(null)}>
          <div className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-auto border border-border bg-card md:grid-cols-[1.1fr_0.9fr]" onClick={(event) => event.stopPropagation()}>
            <div className="relative min-h-[280px]"><img src={activeProject.image} alt={`${activeProject.title} still`} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" /></div>
            <div className="flex flex-col justify-between p-7 md:p-10"><div><button type="button" onClick={() => setActiveProject(null)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent" aria-label="Close project details" data-testid="button-close-project"><X className="h-4 w-4" /></button><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">{activeProject.type} / {activeProject.year}</span><h2 className="mt-6 font-display text-5xl italic leading-none text-foreground">{activeProject.title}</h2><p className="mt-7 text-sm leading-relaxed text-muted-foreground">{activeProject.description}</p></div><div className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"><span className="h-px w-8 bg-accent" /> Project notes available on request</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;