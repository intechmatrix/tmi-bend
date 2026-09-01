import bcrypt from "bcryptjs";
import { sequelize, connectToDB } from "./utils/database.js";
import { Admin, Service } from "./models/model.js";

const seedData = async () => {
  await connectToDB();
  
  try {
    // Sync models
    await sequelize.sync({ force: true }); // WARNING: This drops tables. OK for seeding current state.
    console.log("Database synced");

    // 1. Create Admin
    const hashedPassword = await bcrypt.hash("Matrix_Secure_2026_!!_Admin", 10);
    await Admin.create({
      email: "techmatrix.admin@quantum.inc",
      password: hashedPassword
    });
    console.log("Admin user created: techmatrix.admin@quantum.inc / Matrix_Secure_2026_!!_Admin");

    // 2. Seed Services
    const servicesData = [
      {
        slug: "web-development",
        title: "Web Development",
        image: "/web.webp",
        description: "We build high-performance, scalable websites and web applications tailored to your business needs.",
        features: ["Custom React & Next.js", "Responsive Design", "PWA", "API Integration", "SEO Optimized"],
        benefits: ["Improved engagement", "Faster load times", "Scalable infrastructure"]
      },
      {
        slug: "app-development",
        title: "App Development",
        image: "/app.webp",
        description: "Transform your ideas into powerful mobile experiences for iOS and Android.",
        features: ["React Native", "Native Performance", "App Store Optimization"],
        benefits: ["Direct channel to customers", "Brand loyalty"]
      },
      {
        slug: "digital-marketing-seo",
        title: "Digital Marketing & Growth",
        image: "/marketing.webp",
        description: "Scale your business with full-funnel digital marketing combining SEO, PPC, and content strategy.",
        features: ["SEO Optimization", "Google Search & Display Ads", "Conversion Optimization (CRO)"],
        benefits: ["Sustainable organic search growth", "Higher conversion rates", "Optimized ROI"]
      },
      {
        slug: "video-production-reels",
        title: "Video Ads & Reels Production",
        image: "/video-production.png",
        description: "Engage your audience with professional video ads, TikToks, and Instagram Reels.",
        features: ["Short-form Video Editing", "Commercial Video Ads", "Scriptwriting & Storyboarding", "Motion Graphics & VFX"],
        benefits: ["Boost organic social reach", "Increase ad click-through rates (CTR)", "Stronger brand storytelling"]
      },
      {
        slug: "ecommerce-development",
        title: "E-Commerce Development",
        image: "/ecommerce.webp",
        description: "Building online stores that convert with secure, user-friendly platforms.",
        features: ["Custom Stores", "Payment Integration", "Inventory Mgmt"],
        benefits: ["Increased sales", "Streamlined journey"]
      },
      {
        slug: "software-development",
        title: "Software Development",
        description: "Custom software solutions designed to solve unique business challenges.",
        image: "/software.webp",
        features: ["Enterprise Software", "SaaS", "Cloud Native"],
        benefits: ["Optimized workflows", "Reduced costs"]
      },
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        image: "/uiux.webp",
        description: "User-centric design that blends beauty with functionality.",
        features: ["User Research", "Prototyping", "Design Systems"],
        benefits: ["Satisfaction", "Reduced rework"]
      },
      {
        slug: "graphic-design-branding",
        title: "Graphic Design & Branding",
        image: "/graphic.webp",
        description: "Establish a striking visual identity with professional branding and social media assets.",
        features: ["Brand Identity & Logo Design", "Social Media Creatives", "Pitch Deck Design", "Print & Packaging"],
        benefits: ["Cohesive brand image", "Stand out in feeds", "Higher brand recall"]
      }
    ];

    for (const service of servicesData) {
      await Service.create(service);
    }
    console.log("Services seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
