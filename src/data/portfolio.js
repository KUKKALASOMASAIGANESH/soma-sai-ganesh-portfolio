const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Kukkala Soma Sai Ganesh",
  shortName: "Soma Sai Ganesh",
  title: "Full Stack Developer",
  subtitle: "C# / .NET • React • Java • AI/ML",
  location: "Yanam, Puducherry",
  email: "2200032791cseh@gmail.com",
  phone: "+91 9392404445",
  github: "https://github.com/KUKKALASOMASAIGANESH",
  linkedin: "https://www.linkedin.com/in/soma-sai-ganesh/",
  resume: `${base}resume.pdf`,
  summary:
    "Computer Science and Engineering graduate specializing in Artificial Intelligence with hands-on experience in full-stack software development. Experienced with ASP.NET Core 8, .NET 8, PostgreSQL, JavaScript, HTML, CSS, Java, and AI-driven solutions."
};

export const experience = [
  {
    role: "Full Stack Software Developer Intern",
    company: "Secon Pvt. Ltd.",
    period: "Present",
    points: [
      "Developing enterprise web applications using C#, ASP.NET Core 8, .NET 8, PostgreSQL, JavaScript, HTML, and CSS.",
      "Selected for a company project based on internship performance.",
      "Leading development of the Secon Library Management System as Team Lead.",
      "Managing task allocation, project coordination, GitHub workflows, and team collaboration.",
      "Designing RESTful APIs and backend services using ASP.NET Core 8.",
      "Designing and optimizing PostgreSQL schemas, queries, and stored procedures."
    ]
  }
];

export const skills = [
  ["C#", "Backend"], [".NET 8", "Backend"], ["ASP.NET Core 8", "Backend"],
  ["Java", "Language"], ["Python", "Language"], ["JavaScript", "Language"],
  ["React", "Frontend"], ["Node.js", "Backend"], ["Spring Boot", "Backend"],
  ["Hibernate", "Backend"], ["Express.js", "Backend"], ["Django", "Backend"],
  ["PostgreSQL", "Database"], ["MySQL", "Database"], ["MongoDB", "Database"],
  ["TensorFlow", "AI/ML"], ["Git", "Tools"], ["GitHub", "Tools"],
  ["Power BI", "Tools"], ["Linux", "Tools"]
];

export const projects = [
  {
    number: "01",
    title: "Secon Library Management System",
    role: "Team Lead",
    description:
      "Centralized library management platform with backend services, database workflows, source control, and reporting.",
    tech: ["ASP.NET Core 8", ".NET 8", "PostgreSQL", "GitHub"],
    accent: "violet",
    demo: "",
    github: "https://github.com/KUKKALASOMASAIGANESH"
  },
  {
    number: "02",
    title: "Smart City Application",
    role: "Java Full Stack Developer",
    description:
      "Centralized smart city platform covering city planning, emergency services, and citizen feedback management.",
    tech: ["Java", "JSP", "Hibernate", "MySQL", "HTML", "CSS"],
    accent: "cyan",
    demo: "",
    github: "https://github.com/KUKKALASOMASAIGANESH"
  },
  {
    number: "03",
    title: "Student Performance Analytics",
    role: "MERN Stack Developer",
    description:
      "Academic analytics platform with teacher and student portals, dashboards, reporting, REST APIs, and data management.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    accent: "pink",
    demo: "",
    github: "https://github.com/KUKKALASOMASAIGANESH"
  },
  {
    number: "04",
    title: "Underwater Starfish Detection",
    role: "AI Developer",
    description:
      "Deep learning pipeline using multiple neural-network architectures with preprocessing, augmentation, tuning, and evaluation.",
    tech: ["TensorFlow", "CNN", "RNN", "LSTM", "GRU"],
    accent: "amber",
    demo: "",
    github: "https://github.com/KUKKALASOMASAIGANESH"
  }
];

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "Red Hat Enterprise Application Developer",
  "Salesforce Certified AI Associate",
  "Automation Anywhere RPA"
];

export const photos = [
  `${base}images/profile-outdoor.jpg`,
  `${base}images/profile-road.jpg`,
  `${base}images/profile-sunset.jpg`,
  `${base}images/profile-bike.jpg`
];
