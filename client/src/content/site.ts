/**
 * Precision Field design reminder: content is a measured, credible system. Product visibility is intentional.
 */
export type ProductStatus = "live" | "v2" | "beta" | "waitlist" | "hidden";
export type LaunchMode =
  | "PUBLIC"
  | "PRELAUNCH"
  | "PRODUCT_HIDDEN"
  | "PRODUCT_WAITLIST"
  | "FULL_PORTFOLIO";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: ProductStatus;
  statusTone: "emerald" | "blue" | "amber" | "silver";
  public: boolean;
  featured: boolean;
  detailLevel: "full" | "summary" | "name-only";
  launchDate?: string;
  cta?: string;
  order: number;
};

export type Service = {
  code: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: readonly string[];
  deliverables: readonly string[];
  process: readonly string[];
};

export type PublicProduct = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  availability: "prelaunch" | "available" | "private";
  public: boolean;
};

export type ForthcomingProduct = {
  slug: string;
  title: string;
  description: string;
  category: "Browser" | "Finance" | "Education" | "Productivity";
};

export type OfferListing = {
  productSlug: string;
  askingPrice: string;
  currency: string;
  leadingBid: string | null;
  bidCount: number;
  status: "open" | "review" | "closed";
  public: boolean;
};

export const siteConfig = {
  name: "VeloLaunch",
  parent: "Smart Vista IT Solutions",
  tagline: "Building Intelligent Products That Scale.",
  positioning: "AI-first software development for products that need to perform in the real world.",
  launchMode: "PRELAUNCH" as LaunchMode,
  contactPath: "#contact",
  assets: {
    mark: "/manus-storage/velolaunch-logo-transparent-trimmed_9c5c5059.png",
    heroArtwork: "/manus-storage/velolaunch-hero-artwork_37f1bb46.webp",
    heroArtworkMobile: "/manus-storage/velolaunch-hero-mobile-tablet_de540abe.webp",
    supportVertical: "/manus-storage/velolaunch-support-vertical_2e7a0848.webp",
    supportHorizon: "/manus-storage/velolaunch-support-horizon_d4a7cb0d.webp",
    companyVideo: "/manus-storage/velolaunch-company-video_d40b1a8e.mp4",
    heroCore: "/manus-storage/velolaunch-hero-core_20778025.png",
    constellation: "/manus-storage/velolaunch-product-constellation_95bf849c.png",
    intelligentStack: "/manus-storage/velolaunch-intelligent-stack_aaf96b24.png",
    launchTable: "/manus-storage/velolaunch-launch-table_9919b679.png",
    callbackPopup: "/manus-storage/velolaunch-callback-popup_df302f04.png",
  },
} as const;

/**
 * These records remain non-public in PRELAUNCH mode. They demonstrate the disclosure model without revealing
 * unapproved product names, metadata, or claims.
 */
export const products: Product[] = [
  {
    id: "private-system-01",
    name: "Private Product System 01",
    slug: "private-system-01",
    description: "An unreleased product record controlled through the launch configuration.",
    icon: "layer",
    status: "hidden",
    statusTone: "silver",
    public: false,
    featured: false,
    detailLevel: "name-only",
    order: 1,
  },
  {
    id: "private-system-02",
    name: "Private Product System 02",
    slug: "private-system-02",
    description: "An unreleased product record controlled through the launch configuration.",
    icon: "orbit",
    status: "hidden",
    statusTone: "silver",
    public: false,
    featured: false,
    detailLevel: "name-only",
    order: 2,
  },
];

export function getVisibleProducts(mode: LaunchMode, list = products) {
  if (mode === "FULL_PORTFOLIO") return [...list].sort((a, b) => a.order - b.order);
  if (mode === "PRODUCT_HIDDEN") return [];
  return list
    .filter((product) => product.public && product.status !== "hidden")
    .sort((a, b) => a.order - b.order);
}

export const services: readonly Service[] = [
  {
    code: "01",
    slug: "ai-powered-development",
    title: "AI-Powered Development",
    summary: "Smart product systems shaped around decisions, workflows, and the people who use them.",
    description: "We define, design, and build intelligent software where AI has a clear job, appropriate controls, and a durable place in the product architecture.",
    tags: ["AI workflows", "Product design", "Intelligent UX", "System controls"],
    deliverables: ["Product and AI opportunity framing", "Experience and interaction design", "Build-ready system architecture", "Measured delivery plan"],
    process: ["Frame the operating decision", "Prototype the product behavior", "Engineer the working system", "Improve from evidence"],
  },
  {
    code: "02",
    slug: "web-app-development",
    title: "Web App Development",
    summary: "Responsive web products designed to stay legible as the underlying system becomes more capable.",
    description: "We build web applications that connect clear product flows, reliable software foundations, and the integrations needed to make work happen in context.",
    tags: ["Web products", "SaaS systems", "Integrations", "Product platforms"],
    deliverables: ["Interaction and interface system", "Responsive application build", "Integration architecture", "Release-ready quality controls"],
    process: ["Map the product surface", "Design the critical workflows", "Build with stable contracts", "Prepare a useful release"],
  },
  {
    code: "03",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary: "Mobile product experiences for the moments that need to happen away from the desk.",
    description: "We design and develop mobile experiences around the constraints of real environments, including context, speed, usability, and reliable handoff to the wider system.",
    tags: ["Mobile UX", "Cross-platform", "Field workflows", "Product releases"],
    deliverables: ["Mobile experience design", "Cross-platform build plan", "System and API integration", "Release preparation"],
    process: ["Understand the mobile moment", "Prototype the task flow", "Build the connected application", "Prepare the release path"],
  },
  {
    code: "04",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary: "Software foundations that make a product safer to change, observe, and operate.",
    description: "We shape the delivery environment around the product’s real needs: dependable deployment, clear operational signals, and an architecture that can grow without obscuring risk.",
    tags: ["Cloud delivery", "Deployment", "Observability", "Engineering practice"],
    deliverables: ["Delivery environment assessment", "Deployment workflow design", "Operational visibility plan", "Platform change roadmap"],
    process: ["Assess the current foundation", "Make delivery repeatable", "Expose the useful signals", "Create room for the next change"],
  },
] as const;

export const publicProducts: readonly PublicProduct[] = [];
export const publicOffers: readonly OfferListing[] = [];

export const forthcomingProducts = [
  {
    slug: "apex-turbo-smart-tab-organizer",
    title: "Apex Turbo Smart Tab Organizer and Memory Saver",
    description: "A forthcoming browser companion designed to organize active tabs and keep working sessions easier to manage.",
    category: "Browser",
  },
  {
    slug: "finaura-ai-finance-vault",
    title: "FinAura AI - Powered Finance Vault",
    description: "A forthcoming finance workspace for bringing important financial records and AI-assisted guidance into one private vault.",
    category: "Finance",
  },
  {
    slug: "plutolearn-ai-edtech-platform",
    title: "PlutoLearn AI - Powered EdTech Platform",
    description: "A forthcoming learning platform for structured study, progress guidance, and AI-assisted educational experiences.",
    category: "Education",
  },
  {
    slug: "velotools-powerful-tools",
    title: "VeloTools - 1000+ Powerful Tools",
    description: "A forthcoming collection of practical tools being prepared to simplify common digital work in one place.",
    category: "Productivity",
  },
] as const satisfies readonly ForthcomingProduct[];

export const forthcomingHomepageProducts = forthcomingProducts;

export function getForthcomingProduct(slug?: string) {
  return forthcomingProducts.find((product) => product.slug === slug);
}

export const technologyEcosystem = [
  { name: "Amazon AWS", logo: "/manus-storage/aws_dd46d96f.png" },
  { name: "Google Cloud", logo: "/manus-storage/gcp_20cad8d6.svg" },
  { name: "Oracle Cloud", logo: "/manus-storage/oracle_63792664.png" },
  { name: "GitHub Copilot", logo: "/manus-storage/github-copilot_788911c6.svg" },
  { name: "Windsurf", logo: "/manus-storage/windsurf_95ad3057.svg" },
  { name: "Cursor", logo: "/manus-storage/cursor_2fa88289.svg" },
  { name: "Manus AI", logo: "/manus-storage/manus_0eda502d.png" },
  { name: "Anthropic", logo: "/manus-storage/anthropic_3f95b697.svg" },
  { name: "Google DeepMind", logo: "/manus-storage/google-deepmind_9c6b74d0.svg" },
  { name: "OpenAI GPT", logo: "/manus-storage/openai-gpt_4d966a65.webp" },
] as const;

export function getService(slug?: string) {
  return services.find((service) => service.slug === slug);
}

export function getPublicProduct(slug?: string) {
  return publicProducts.find((product) => product.slug === slug && product.public);
}

export const principles = [
  {
    index: "01",
    name: "Start with the operating reality",
    copy: "A useful product begins with the constraints, decisions, and people it must serve.",
  },
  {
    index: "02",
    name: "Keep the system legible",
    copy: "Intelligence should make work clearer, not hide a brittle chain of automation behind a polished surface.",
  },
  {
    index: "03",
    name: "Engineer for the next decision",
    copy: "Architecture, interfaces, and delivery practices should leave room for the product to change with evidence.",
  },
] as const;
