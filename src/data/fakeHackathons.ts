export interface Hackathon {
  id: number;
  name: string;
  organizer: string;
  description: string;
  startDate: string;
  prizePool: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  type: string[];
  genre: string[];
  participants: number;
  image: string;
}

export const hackathons: Hackathon[] = [
  {
    id: 1,
    name: "AI Revolution Hackathon",
    organizer: "OpenAI",
    description: "Innovate with AI and push the boundaries of technology.",
    startDate: "2025-03-15",
    prizePool: "$50,000",
    status: "upcoming",
    type: ["AI/ML"],
    genre: ["Competitive"],
    participants: 500,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 2,
    name: "Blockchain Innovators",
    organizer: "Ethereum Foundation",
    description: "Revolutionizing finance and security with Web3.",
    startDate: "2025-02-10",
    prizePool: "$75,000",
    status: "ongoing",
    type: ["Web3", "Blockchain"],
    genre: ["Advanced"],
    participants: 300,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 3,
    name: "RoboTech Challenge",
    organizer: "Boston Dynamics",
    description: "Building intelligent robots for the future.",
    startDate: "2025-01-25",
    prizePool: "$100,000",
    status: "completed",
    type: ["Robotics", "AI/ML"],
    genre: ["Research"],
    participants: 250,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 4,
    name: "Code for Climate",
    organizer: "UNDP",
    description: "Develop solutions to tackle climate change.",
    startDate: "2025-04-05",
    prizePool: "$30,000",
    status: "upcoming",
    type: ["Open Source"],
    genre: ["Social Impact"],
    participants: 400,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 5,
    name: "Hack the Future",
    organizer: "Google",
    description: "Create groundbreaking software solutions.",
    startDate: "2025-02-05",
    prizePool: "$60,000",
    status: "ongoing",
    type: ["Software Development", "Cloud Computing"],
    genre: ["Competitive"],
    participants: 600,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 6,
    name: "CyberSec Warriors",
    organizer: "DEF CON",
    description: "Secure the digital world with ethical hacking.",
    startDate: "2025-01-10",
    prizePool: "$40,000",
    status: "completed",
    type: ["Cybersecurity"],
    genre: ["Hacker Contest"],
    participants: 200,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 7,
    name: "Startup Sprint",
    organizer: "TechCrunch",
    description: "Turn your startup idea into a reality.",
    startDate: "2025-03-20",
    prizePool: "$25,000",
    status: "upcoming",
    type: ["Entrepreneurship"],
    genre: ["Startup Incubator"],
    participants: 150,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 8,
    name: "EduHack 2025",
    organizer: "EdTech Global",
    description: "Transforming education through technology.",
    startDate: "2025-02-07",
    prizePool: "$20,000",
    status: "ongoing",
    type: ["EdTech"],
    genre: ["Beginner-friendly"],
    participants: 350,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 9,
    name: "GameDev Jam",
    organizer: "Unity & Unreal",
    description: "Build the next hit game in 48 hours!",
    startDate: "2024-12-15",
    prizePool: "$15,000",
    status: "completed",
    type: ["Game Development"],
    genre: ["Creative"],
    participants: 280,
    image: "/images/hackathon-placeholder.png"
  },
  {
    id: 10,
    name: "BioHack 2025",
    organizer: "MIT Biotech",
    description: "Advancing medicine and biotech innovation.",
    startDate: "2025-02-18",
    prizePool: "$55,000",
    status: "ongoing",
    type: ["Biotechnology"],
    genre: ["Research"],
    participants: 180,
    image: "/images/hackathon-placeholder.png"
  }
];

export const hackathonTypes = [
  "AI/ML",
  "Web3",
  "Blockchain",
  "Robotics",
  "Open Source",
  "Software Development",
  "Cybersecurity",
  "Entrepreneurship",
  "EdTech",
  "Game Development",
  "Biotechnology",
  "Cloud Computing"
];

export const hackathonGenres = [
  "Competitive",
  "Advanced",
  "Research",
  "Social Impact",
  "Hacker Contest",
  "Startup Incubator",
  "Beginner-friendly",
  "Creative"
]; 