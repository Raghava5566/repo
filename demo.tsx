import React from "react";
// Fixing the import path as components are now housed in components/ui
import { Footer2 } from "./ui/shadcnblocks-com-footer2";

const demoData = {
  logo: {
    // Unsplash stock image explicitly requested
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=150&auto=format&fit=crop",
    alt: "LearnFlow Placeholder",
    title: "LearnFlow Analytics",
    url: "/",
  },
  tagline: "Empowering your study sessions.",
  menuItems: [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help", url: "#" },
        { text: "Sales", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ],
  copyright: "© 2026 LearnFlow. All rights reserved.",
  bottomLinks: [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
};

export default function Footer2Demo() {
  return <Footer2 {...demoData} />;
}
