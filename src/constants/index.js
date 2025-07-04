import { o } from "maath/dist/index-0332b2ed.esm";
import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    html,
    css,
    git,
    maisha,
    quan,
    oerwf,
    python,
    c,
    swift,
    java,
    latex,
    postgres,
    xampp,
    php,
    abat,
    apple,
    micai,
    metro,
    jenifa,
    chaity,
    bmale,
    bfemale,
  } from "../assets";

  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Experience",
    },
    {
      id: "project",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "App Developer",
      icon: web,
    },
    {
      title: "QC Enthusiast",
      icon: quan,
    },
    {
      title: "AI/ML Developer",
      icon: mobile,
    },
    {
      title: "Programmer",
      icon: backend,
    },
    {
      title: "Web Developer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "Python",
      icon: python,
    },
    {
      name: "Swift",
      icon: swift,
    },
    {
      name: "C",
      icon: c,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "PHP",
      icon: php,
    },
    {
      name: "Postgres",
      icon: postgres,
    },
    {
      name: "Xampp",
      icon: xampp,
    },
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "LaTeX",
      icon: latex,
    },
    
  ];
  
  const experiences = [
    {
      title: "Computer Science & Engineering - Student",
      company_name: "Metropolitan University",
      icon: metro,
      iconBg: "#E6DEDD",
      date: "July 2023 - June 2027 (expected)",
      points: [
        "CGPA: 3.75/4.00",
        "https://www.metrouni.edu.bd",
        "Programming Coursework: Algorithms and Programming, Object-Oriented Programming, Data Structures, Computational Architectures, Operating Systems, Databases.",
        "Math Coursework: Linear Algebra, Calculus I, Calculus II, Ordinary Diﬀerential Equations, Discrete Mathematics.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial: "Avishek is one of the most dedicated and skilled individuals I’ve met in our CSE batch. As his classmate, I’ve seen how passionate he is about artificial intelligence, machine learning, and Python development. He’s always eager to learn, solve problems, and help others when needed. Even without working directly with him, it’s clear that he stands out for his consistent effort and strong technical abilities. I’m confident he’ll do great things in the future!",
      name: "Nahida Akter Jenifa",
      designation: "Full-Stack Web Developer",
      company: "CrevoSys",
      image: jenifa
    },
    {
      testimonial: "Avishek is one of the most hardworking and sincere people I know. He takes his responsibilities seriously and always puts in genuine effort, no matter how big or small the task is. What stands out most is his dedication,he doesn't give up easily and is always willing to learn and improve. He's not just reliable, but also someone who brings a positive energy to any team or environment. I truly believe he'll do well in whatever he sets his mind to.",
      name: "Farhana Maisha Chowdhury",
      designation: "CSE Undergraduate",
      company: "Metropolitan University",
      image: maisha
    },
    {
      testimonial: "During my time working with Avishek, I’ve come to truly admire his talent and dedication. Despite being my batchmate and of the same age, he stands out with his skills in artificial intelligence, machine learning and Python development. He consistently delivers high-quality work. It’s been a great experience collaborating with him, especially during the Hult Prize journey.",
      name: "Chaity Upadhyay",
      designation: "CSE Undergraduate",
      company: "Metropolitan University",
      image: chaity
    },
    {
      testimonial: "From my experience, I found Avishek—a very hardworking, motivated, and reliable person. His efforts reflect his commitment to his goals and growth mindset. I believe his good communication skills, hardworking mentality, and reliable personality will be a great asset for any company.",
      name: "Sadia Sultana",
      designation: "CSE Undergraduate",
      company: "Metropolitan University",
      image: bfemale
    },

  ];
  
  const projects = [
    {
      name: "BongoFind - Website",
      description:
        "A website that provides multiple services based on different cities. Make sure that all services are in one place and organized ",
        tags: [
          {
            name: "HTML",
            color: "blue-text-gradient",
          },
        {
          name: "CSS",
          color: "green-text-gradient",
        },
        {
          name: "JS",
          color: "pink-text-gradient",
        },
      ],
      image: micai,
      source_code_link: "https://bongo--find.web.app",
      github_link: "https://github.com/avishekchandradas/bongofind", // Add your actual GitHub repo
    },
    {
      name: "MU RoomRadar",
      description:
        "An online based routine system that helps student and teacher to look for free rooms based on the present time",
      tags: [
        {
          name: "HTML",
          color: "blue-text-gradient",
        },
        {
          name: "JS",
          color: "green-text-gradient",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
      ],
      image: oerwf,
      source_code_link: "https://roomradarmu.web.app",
      github_link: "https://github.com/avishekchandradas/roomradar", // Add your actual GitHub repo
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };