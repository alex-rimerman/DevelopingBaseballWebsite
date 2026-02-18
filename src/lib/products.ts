/**
 * Product catalog for Developing Baseball.
 * Add your Stripe Price IDs here after creating products in the Stripe Dashboard.
 * Find them at: https://dashboard.stripe.com/products
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents, for display (use -1 for contact pricing)
  priceId: string; // Stripe Price ID (price_xxx)
  mode: "payment" | "subscription"; // Stripe Checkout mode
  image?: string;
  video?: string; // path to video file
  contactForPricing?: boolean; // show "Contact" instead of "Buy Now"
  comingSoon?: boolean; // show "Coming Soon", button links to contact
  priceLabel?: string; // custom price display (e.g. "$5/mo Personal")
}

export const products: Product[] = [
  {
    id: "stuff-plus-analyzer-personal",
    name: "Stuff+ Analyzer App (Personal)",
    description: "Professional-grade pitch analytics in your pocket. Evaluate Stuff+, track your arsenal, and get insights used at the highest levels of the game.",
    price: 500,
    priceId: "",
    mode: "subscription",
    video: process.env.NEXT_PUBLIC_VIDEO_APP_URL ?? "https://youtube.com/shorts/L9j1vhOAmvo",
    comingSoon: true,
  },
  {
    id: "stuff-plus-analyzer-team",
    name: "Stuff+ Analyzer App (Team)",
    description: "Same powerful analytics for your whole team. Share insights, track multiple pitchers, and manage your organization's development.",
    price: 2500,
    priceId: "",
    mode: "subscription",
    image: "/appReport.jpeg",
    comingSoon: true,
  },
  {
    id: "stuff-plus-portal",
    name: "Stuff+ Pitching Portal",
    description: "Team-wide analytics with Trackman integration. Reports, leaderboards, and session management for facilities and college programs.",
    price: -1,
    priceId: "",
    mode: "payment",
    video: process.env.NEXT_PUBLIC_VIDEO_PORTAL_URL ?? "https://youtu.be/T9WXP1o5bUM",
    contactForPricing: true,
  },
];
