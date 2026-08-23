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

export const siteConfig = {
  name: "VeloLaunch",
  parent: "Smart Vista IT Solutions",
  tagline: "Building Intelligent Products That Scale.",
  positioning: "AI-first software development for products that need to perform in the real world.",
  launchMode: "PRELAUNCH" as LaunchMode,
  contactPath: "#contact",
  assets: {
    mark: "/manus-storage/VeloLaunch_82dd907a.ico",
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

export const services = [
  {
    code: "01",
    title: "AI product engineering",
    description:
      "Define, design, and build intelligent software around the decisions and workflows that matter.",
  },
  {
    code: "02",
    title: "Agentic systems",
    description:
      "Turn models, tools, and operating context into systems with clear controls and useful human oversight.",
  },
  {
    code: "03",
    title: "Product-scale delivery",
    description:
      "Move from an early product signal to a durable software foundation without losing technical clarity.",
  },
] as const;

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
