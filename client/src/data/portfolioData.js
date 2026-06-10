export const hero = {
  name: 'Omkar Chandorkar',
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
      { name: 'MongoDB', level: 90 },
      { name: 'Data Modeling', level: 88 },
      { name: 'Performance Tuning', level: 85 },
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
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    github: 'https://github.com/omkarchandorkar/dd-stocker',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
  },
  {
    id: 'pravesh-app',
    title: 'Pravesh Gate Entry',
    description: 'A secure gate entry system designed to automate visitor management and improve access control for broadcast facilities.',
    features: ['Automated entry workflows', 'Visitor authentication', 'Operational analytics'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
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
    image: 'https://images.unsplash.com/photo-1581093448799-1c0f8e3a7f00?auto=format&fit=crop&w=1200&q=80',
    category: 'Backend',
    github: 'https://github.com/omkarchandorkar/breast-cancer-detection',
    demo: 'https://linkedin.com/in/omkar-chandorkar-4ab81622a',
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
