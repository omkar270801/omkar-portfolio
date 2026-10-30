export const hero = {
  name: 'Omkar Chandorkar',
  eyebrow: 'Premium digital experiences',
  title: 'AI & Full Stack Developer',
  tagline: 'Building intelligent automation systems and modern web applications for broadcast, industrial, and enterprise workflows.',
  ctas: [
    { label: 'View Projects', target: '#projects', type: 'primary' },
    { label: 'Download Resume', href: '/resume.pdf', type: 'secondary' },
    { label: 'Contact Me', target: '#contact', type: 'secondary' },
  ],
};

export const about = {
  summary: 'Recent Information Technology postgraduate and GATE 2026 qualified candidate. Highly skilled in AI implementation, full-stack web application development, and software engineering. Proven success in industrial automation and building robust digital solutions for data management, security, and modern enterprise workflows.',
  skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'OpenCV', 'YOLOv8'],
  goals: 'Deliver intelligent, secure, and scalable software systems that automate operations, improve visibility, and support modern enterprise digital experiences.',
};

export const skillCategories = [
  {
    title: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'React', level: 93 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Responsive UI', level: 92 },
    ],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 91 },
      { name: 'Express', level: 89 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 88 },
      { name: 'Microsoft SQL Server', level: 85 },
    ],
  },
  {
    title: 'AI & Tools',
    icon: 'Tool',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'OpenCV', level: 89 },
      { name: 'YOLOv8', level: 87 },
    ],
  },
];

export const projects = [
  {
    id: 'dd-stocker',
    title: 'DD Stocker',
    description: 'An inventory management application built for broadcast operations, improving data accuracy and asset visibility through modern dashboards and workflows.',
    features: ['Inventory tracking', 'Secure asset categorization', 'Fast search and filtering'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    // Use a local image for the DD Stocker project. Place your screenshot at:
    // client/public/images/dd-stocker.jpg
    image: '/images/dd-stocker.jpg',
    category: 'Full Stack',
    github: 'https://github.com/omkarchandorkar/dd-stocker',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
  },
  {
    id: 'pravesh-app',
    title: 'Pravesh Gate Entry',
    description: 'A secure gate entry system designed to automate visitor management and improve access control for broadcast facilities.',
    features: ['Automated entry workflows', 'Visitor authentication', 'Operational analytics'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    image: '/images/pravesh.jpg',
    category: 'Full Stack',
    github: 'https://github.com/omkarchandorkar/pravesh-gate-entry',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
  },
  {
    id: 'weldx-ai',
    title: 'WeldX AI',
    description: 'An industrial defect detection system using YOLOv8 and OpenCV to identify welding issues in real time and improve quality assurance.',
    features: ['Defect detection', 'Real-time inspection', 'AI-driven insights'],
    tech: ['Python', 'OpenCV', 'YOLOv8', 'Roboflow'],
    image: '/images/weldx-ai.jpg',
    category: 'Backend',
    github: 'https://github.com/omkarchandorkar/weldx-ai',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
  },
  {
    id: 'breast-cancer-detection',
    title: 'Breast Cancer Detection',
    description: 'A healthcare prediction system that uses machine learning to identify cancer risk and support early diagnostics.',
    features: ['Predictive modeling', 'Data-driven insights', 'Healthcare-ready workflow'],
    tech: ['Python', 'Scikit-learn', 'Machine Learning'],
    image: '/images/breast-cancer-detection.jpg',
    category: 'Backend',
    github: 'https://github.com/omkarchandorkar/breast-cancer-detection',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
  },
  {
    id: 'smart-call-letter-generator',
    title: 'Smart Call Letter Generator',
    description: 'A web application that automates candidate data processing and streamlines call letter generation.',
    features: ['Candidate data processing', 'Automated call letter generation', 'Streamlined administration'],
    tech: ['Web Application', 'Automation'],
    image: '/images/call-letter-generator.svg',
    category: 'Full Stack',
  },
  {
    id: 'birthday-wish-email-system',
    title: 'Birthday Wish Email System',
    description: 'An automated system for managing employee birthday notifications and sending personalized email wishes.',
    features: ['Automated birthday notifications', 'Personalized email communication', 'Live application'],
    tech: ['Web Application', 'Email Automation'],
    image: '/images/birthday-wish-system.svg',
    category: 'Full Stack',
    live: 'https://adminservice-birthday.iimmumbai.ac.in',
  },
  {
    id: 'leave-application-system',
    title: 'Leave Application System',
    description: 'A leave management system that calculates balances automatically and prepares vacation leave reports for administrative review.',
    features: ['Automatic leave balance calculation', 'Vacation leave reports', 'Administrative review'],
    tech: ['Web Application', 'Reporting', 'Automation'],
    image: '/images/leave-application-system.svg',
    category: 'Full Stack',
  },
];

export const timeline = [
  {
    date: 'Nov 2025 – Nov 2026',
    title: 'IT Engineer',
    organization: 'Doordarshan',
    details: 'Developed DD Stocker inventory management, engineered the Pravesh gate entry system, maintained critical broadcast IT infrastructure, and optimized database and front-end systems.',
  },
  {
    date: 'Jun 2025 – Oct 2025',
    title: 'AI Intern',
    organization: 'Mazagon Dock Shipbuilders Limited',
    details: 'Built the WeldX AI welding defect detection system using Python, OpenCV, and YOLOv8 for industrial inspection workflows.',
  },
  {
    date: '2024',
    title: 'M.Sc. Information Technology',
    organization: 'Mumbai University',
    details: 'Completed postgraduate studies with a focus on AI, software engineering, and industrial automation.',
  },
  {
    date: '2022',
    title: 'B.Sc. Information Technology',
    organization: 'Mumbai University',
    details: 'Graduated with practical experience in application development, systems design, and automation technologies.',
  },
  {
    date: '2026',
    title: 'Achievements',
    organization: 'Academic & Industry Recognition',
    details: 'Qualified GATE 2026, cleared IIT Mumbai PhD written test, and won the Gold Award at CCQC-2025 Mumbai Chapter.',
  },
];

export const achievements = timeline
  .filter((item) => item.title === 'Achievements')
  .map(({ date, ...item }) => ({ ...item, year: date }));

export const services = [
  {
    title: 'AI & Computer Vision',
    description: 'Build intelligent vision systems for defect detection, predictive analysis, and automation.',
    icon: 'Globe2',
  },
  {
    title: 'Full Stack Web Apps',
    description: 'Develop responsive, secure applications with modern frontends, backends, and data workflows.',
    icon: 'Layers',
  },
  {
    title: 'Automation Systems',
    description: 'Automate operations with secure entry control, inventory tracking, and workflow digitization.',
    icon: 'Server',
  },
  {
    title: 'Data Management',
    description: 'Design scalable data systems that improve stability, performance, and decision-making.',
    icon: 'Sparkles',
  },
];

export const testimonials = [
  {
    quote: 'Omkar delivered a well-engineered solution with strong attention to detail and dependable implementation.',
    author: 'Amit Desai',
    role: 'Project Lead',
  },
  {
    quote: 'The work was efficient, technically robust, and produced a polished final experience.',
    author: 'Priya Shah',
    role: 'Operations Manager',
  },
];

export const sectionHeadings = {
  about: { eyebrow: 'About', title: 'Professional Summary', goalsTitle: 'Career goals' },
  skills: { eyebrow: 'Skills', title: 'Technical expertise' },
  projects: { eyebrow: 'Projects', title: 'Projects' },
  experience: { eyebrow: 'Experience', title: 'Career timeline' },
  achievements: { eyebrow: 'Recognition', title: 'Achievements' },
  contact: { eyebrow: 'Contact', title: 'Start your next project' },
};

export const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Achievements', target: 'achievements' },
  { label: 'Contact', target: 'contact' },
];

export const contact = {
  message: 'I’m available for remote and hybrid opportunities. Send me a message and I’ll respond within 24 hours.',
  email: 'omkarchandorkar27@gmail.com',
  phone: '+91 99677 36905',
  location: 'Mumbai, Maharashtra',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  locationLabel: 'Location',
  nameFieldLabel: 'Name',
  emailFieldLabel: 'Email',
  messageFieldLabel: 'Message',
  submitLabel: 'Send message',
  sendingMessage: 'Sending...',
  successMessage: 'Message sent successfully.',
};

export const footer = {
  copyright: 'Crafted for premium impact.',
  links: [
    { label: 'GitHub', href: 'https://github.com/omkar270801', icon: 'Github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a', icon: 'Linkedin' },
    { label: 'Email', href: 'mailto:omkarchandorkar27@gmail.com', icon: 'Mail' },
  ],
};

export const portfolioContentDefaults = {
  hero,
  about,
  skillCategories,
  sectionHeadings,
  navLinks,
  contact,
  footer,
};
