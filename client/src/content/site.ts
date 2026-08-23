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
    heroArtwork: "/manus-storage/velolaunch-hero-artwork_6ca194d6.png",
    supportVertical: "/manus-storage/velolaunch-support-vertical_3a1d25eb.png",
    supportHorizon: "/manus-storage/velolaunch-support-horizon_531822cd.png",
    heroCore: "/manus-storage/velolaunch-hero-core_20778025.png",
    constellation: "/manus-storage/velolaunch-product-constellation_95bf849c.png",
    intelligentStack: "/manus-storage/velolaunch-intelligent-stack_aaf96b24.png",
    launchTable: "/manus-storage/velolaunch-launch-table_9919b679.png",
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
