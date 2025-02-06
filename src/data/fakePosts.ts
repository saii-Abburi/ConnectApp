export interface Post {
  id: number;
  author: {
    name: string;
    profileImage: string;
    role: string;
  };
  timestamp: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
}

export const posts: Post[] = [
  {
    id: 1,
    author: {
      name: "Team Innovators",
      profileImage: "/images/team-placeholder.png",
      role: "Hackathon Finalists"
    },
    timestamp: "2025-02-06T14:30:00Z",
    title: "🏆 Victory at AI MegaHack 2025!",
    content: "We secured 1st place at AI MegaHack 2025 with our AI-powered precision farming solution. Huge thanks to our mentors!",
    image: "/images/post-1.png",
    tags: ["Hackathon", "AI", "Agritech"],
    likes: 250,
    comments: 35,
    shares: 50
  },
  {
    id: 2,
    author: {
      name: "Company TechFusion",
      profileImage: "/images/company-placeholder.png",
      role: "Tech Startup"
    },
    timestamp: "2025-02-05T10:15:00Z",
    title: "🚀 Internship Program 2025 Applications Open!",
    content: "We're hiring interns for AI, Web Dev, and Cybersecurity roles. Apply before Feb 20 to join our dynamic team!",
    image: "/images/post-2.png",
    tags: ["Internship", "Hiring", "Tech"],
    likes: 180,
    comments: 45,
    shares: 30
  },
  {
    id: 3,
    author: {
      name: "Team CodeCrafters",
      profileImage: "/images/team-placeholder.png",
      role: "Software Developers"
    },
    timestamp: "2025-02-04T17:45:00Z",
    title: "📢 Open Source Project - Join Us!",
    content: "We're building an AI-based personal assistant. Contributors are welcome! Let's innovate together.",
    image: "/images/post-3.png",
    tags: ["Open Source", "Collaboration", "AI"],
    likes: 140,
    comments: 20,
    shares: 60
  },
  {
    id: 4,
    author: {
      name: "Company CloudScape",
      profileImage: "/images/company-placeholder.png",
      role: "Cloud Solutions Provider"
    },
    timestamp: "2025-02-04T12:30:00Z",
    title: "🌐 Cloud Security Webinar - Register Now!",
    content: "Join our webinar on latest cloud security trends and best practices. Limited seats available!",
    image: "/images/post-4.png",
    tags: ["Webinar", "Cloud Security", "Tech"],
    likes: 120,
    comments: 18,
    shares: 22
  },
  {
    id: 5,
    author: {
      name: "Team PixelMasters",
      profileImage: "/images/team-placeholder.png",
      role: "UI/UX Designers"
    },
    timestamp: "2025-02-03T15:00:00Z",
    title: "🎨 New UI/UX Trends for 2025",
    content: "We analyzed the latest UI/UX trends for better user experience. Check out our research!",
    image: "/images/post-5.png",
    tags: ["Design", "UX", "UI Trends"],
    likes: 95,
    comments: 12,
    shares: 10
  }
];

export const categories = [
  "All",
  "Hackathon",
  "Internship",
  "Open Source",
  "Webinar",
  "Design",
  "Tech News"
];

export const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Most Liked", value: "likes" },
  { label: "Most Discussed", value: "comments" }
]; 