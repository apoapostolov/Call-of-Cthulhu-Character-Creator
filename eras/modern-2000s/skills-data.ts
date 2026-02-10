import type { Skill } from '../../types';

// Modern 2000s adds new skills on top of Classic 1920s
export const SKILLS: Skill[] = [
  {
    name: 'Computer Use',
    base: 5,
    description:
      'Program in various languages; retrieve and analyze obscure data; break into secured systems; explore networks; detect/exploit intrusions. Complex manipulations may require this skill. Internet research for highly specific data may require combined Computer Use and Library Use. Not needed for everyday use (email, browsing, common software).',
  },
  {
    name: 'Electronics',
    base: 1,
    description:
      'Troubleshoot/repair electronics and create simple devices. Present‑day skill—use Physics and Electrical Repair for 1920s electronics. Parts are precise; without the correct components (e.g., microchips/boards) jury‑rigging is often impossible.',
  },
];
