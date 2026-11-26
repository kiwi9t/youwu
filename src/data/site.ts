// The site's words live in the JSON files in src/data/content/.
// Edit them in the editor at /admin/ (or by hand). Every list item has a "show" switch:
// set it to false to hide that item from the site without deleting it.
// This file only reads those files and drops hidden items, so the layout never needs to change.
import profileData from './content/profile.json';
import aboutData from './content/about.json';
import educationData from './content/education.json';
import experienceData from './content/experience.json';
import projectsData from './content/projects.json';
import skillsData from './content/skills.json';
import interestsData from './content/interests.json';

type Shown = { show?: boolean };
const visible = <T extends Shown>(list: T[] | undefined): T[] => (list ?? []).filter((x) => x.show !== false);
const clean = <T>(list: (T | null | undefined | '')[] | undefined): T[] => (list ?? []).filter((x): x is T => !!x);

export type Item = {
  id: string;
  title: string;
  org?: string;
  kind?: string;
  dates?: string;
  summary: string;
  tags: string[];
  bullets: string[];
  cats?: string[];
  link?: string;
  // Optional screenshot in /public, for example 'uploads/quiet-reader.png'.
  image?: string;
};

const toItem = (x: any): Item => ({ ...x, tags: clean(x.tags), bullets: clean(x.bullets), cats: clean(x.cats) });

const { glance, links: linkData, contact: contactData, lastUpdated: updated, ...profileRest } = profileData as any;

export const profile = {
  ...(profileRest as { name: string; firstName: string; initials: string; status: string; headline: string; intro: string; photo: string }),
  glance: visible(glance as ({ label: string; value: string; wide?: boolean } & Shown)[]),
};

export const links = linkData as {
  resume: string; linkedin: string; github: string; email: string; formEndpoint: string;
};

export const about: string[] = visible(aboutData.items).map((p) => p.text);

export const education = visible(educationData.items as ({ school: string; degree: string; meta: string; note?: string } & Shown)[]);

// A role whose dates contain "Present" gets a green dot; past roles get a grey dot.
export const experience: Item[] = visible(experienceData.items as Shown[]).map(toItem);

// The filter buttons above the projects. "All" is added automatically.
export const projectCategories: string[] = clean(projectsData.categories);

// The first project that matches the current filter is shown large.
export const projects: Item[] = visible(projectsData.items as Shown[]).map(toItem);

// A skill that also appears in an Experience or Project "tags" list becomes a clickable filter.
export const skillGroups = visible(skillsData.groups).map((g) => ({ name: g.name, skills: clean<string>(g.skills) }));

export const certifications: string[] = visible(skillsData.certifications).map((c) => c.name);

// icon: 'film' | 'code' | 'plus'
export const interests = visible(interestsData.items as ({ icon: string; title: string; text: string } & Shown)[]);

export const contact = contactData as { heading: string; text: string };

export const lastUpdated: string = updated;
