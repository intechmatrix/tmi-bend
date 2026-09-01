import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const DATA_DIR = path.resolve("./data");

// Helper to ensure data directory exists
const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

// Helper to read data from a file
export const readData = (type) => {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${type}.json`);
  if (!fs.existsSync(filePath)) {
    // Return default seed data
    const defaults = getDefaultData(type);
    writeData(type, defaults);
    return defaults;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error(`Error reading data for ${type}:`, error);
    return [];
  }
};

// Helper to write data to a file
export const writeData = (type, data) => {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, `${type}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing data for ${type}:`, error);
    return false;
  }
};

// Default seed data
const getDefaultData = (type) => {
  if (type === "admin") {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("Matrix_Secure_2026_!!_Admin", salt);
    return [
      {
        id: 1,
        email: "techmatrix.admin@quantum.inc",
        password: hashedPassword,
        active: true
      }
    ];
  }

  if (type === "service") {
    return [
      {
        id: 1,
        slug: "software-engineering",
        title: "Software & Application Development",
        description: "Custom Next.js and Node.js platforms. High-performance web applications, scalable SaaS architectures, and complex headless commerce ecosystems.",
        features: ["Custom Next.js & React", "High-Performance APIs", "Scalable Multi-tenant SaaS", "Payment Gateway Integration"],
        benefits: ["Slick user experience", "99.9% uptime architecture", "Highly secure codebase"],
        active: true
      },
      {
        id: 2,
        slug: "creative-production",
        title: "Digital Marketing & Creative Production",
        description: "Cinematic commercial video ads, professional product photography, and brand identity design.",
        features: ["Commercial Videos & Reels", "Brand Identity Design", "Product Photography", "Social Media Creatives"],
        benefits: ["Higher engagement rate", "Unshakeable visual trust", "Consistent cross-platform branding"],
        active: true
      },
      {
        id: 3,
        slug: "seo-optimization",
        title: "Search Engine Optimization",
        description: "Organic search dominance driven by semantic on-page layouts, technical audits, and link-building campaigns.",
        features: ["Technical SEO Auditing", "Semantic On-Page Content Silos", "Digital PR & Backlinks", "Keyword Search Mapping"],
        benefits: ["Sustainable organic customer acquisition", "Better Google SERP positioning", "Optimized marketing ROI"],
        active: true
      },
      {
        id: 4,
        slug: "it-infrastructure",
        title: "IT Infrastructure & Hosting",
        description: "Managed business email, continuous cloud server architectures, containerized scaling, and downtime monitoring.",
        features: ["AWS/GCP Cloud Management", "Secure Business Email Hosting", "DevOps & CI/CD automation", "Vulnerability Security Audits"],
        benefits: ["Unbreakable security compliance", "Downtime reduced to zero", "Auto-scaling server costs"],
        active: true
      }
    ];
  }

  if (type === "testimonial") {
    return [
      {
        id: 1,
        name: "Abhishek Karki",
        role: "Managing Director",
        company: "Bhatbhateni Online",
        content: "Tech Matrix transformed our online ordering flow completely. Our page speed halved, and our checkout drop-offs reduced by 25%. A world-class technical partner here in Kathmandu.",
        avatar: "",
        active: true
      },
      {
        id: 2,
        name: "Prerna Thapa",
        role: "Co-Founder",
        company: "Vesper Digital",
        content: "Their high-end video ads and creative branding gave our social media campaigns an edge. The quality of output matches global creative standards.",
        avatar: "",
        active: true
      }
    ];
  }

  if (type === "team") {
    return [
      {
        id: 1,
        name: "Saurav Sharma",
        role: "Founder & Lead Accountant",
        certs: "ACCA, Xero Advisor",
        image: "",
        active: true
      },
      {
        id: 2,
        name: "Pooja Karki",
        role: "Senior Bookkeeper",
        certs: "QB ProAdvisor",
        image: "",
        active: true
      },
      {
        id: 3,
        name: "Niranjan Shrestha",
        role: "Tax Associate",
        certs: "ACCA",
        image: "",
        active: true
      }
    ];
  }

  if (type === "client") {
    return [
      {
        id: 1,
        name: "Bhatbhateni Group",
        logo: "",
        website: "https://bhatbhatenionline.com",
        active: true
      },
      {
        id: 2,
        name: "Nimbus Nepal",
        logo: "",
        website: "https://nimbusnepal.com",
        active: true
      },
      {
        id: 3,
        name: "Vesper Foods",
        logo: "",
        website: "https://vesperfoods.com.np",
        active: true
      }
    ];
  }

  return [];
};

// JSON Datastore API functions
export const jsonStore = {
  getAll: (type) => {
    const list = readData(type);
    return list.filter(item => item.active === true);
  },

  getOne: (type, id) => {
    const list = readData(type);
    return list.find(item => item.id === Number(id) && item.active === true);
  },

  getBySlug: (type, slug) => {
    const list = readData(type);
    return list.find(item => item.slug === slug && item.active === true);
  },

  create: (type, payload) => {
    const list = readData(type);
    const newId = list.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
    const newRecord = { id: newId, ...payload, active: true };
    list.push(newRecord);
    writeData(type, list);
    return newRecord;
  },

  update: (type, id, payload) => {
    const list = readData(type);
    const index = list.findIndex(item => item.id === Number(id) && item.active === true);
    if (index === -1) return null;
    const updatedRecord = { ...list[index], ...payload };
    list[index] = updatedRecord;
    writeData(type, list);
    return updatedRecord;
  },

  remove: (type, id) => {
    const list = readData(type);
    const index = list.findIndex(item => item.id === Number(id) && item.active === true);
    if (index === -1) return false;
    list[index].active = false; // Soft delete
    writeData(type, list);
    return true;
  }
};
