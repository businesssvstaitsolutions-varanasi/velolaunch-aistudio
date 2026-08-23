export type ChatbotReply = {
  answer: string;
  handoff?: boolean;
};

export const chatbotPrompts = [
  "What does VeloLaunch do?",
  "Tell me about AI development",
  "Can you build a web app?",
  "How do you handle DevOps?",
  "How does pricing work?",
] as const;

const fallbackReply: ChatbotReply = {
  answer: "I can help with VeloLaunch services, AI-assisted development, web and mobile apps, DevOps, or pricing guidance. Choose a topic above, or request a conversation for project-specific advice.",
  handoff: true,
};

export function getVeloLaunchChatbotReply(input: string): ChatbotReply {
  const query = input.toLowerCase().trim();
  if (!query) return fallbackReply;

  if (/price|pricing|cost|budget|quote|rate|bid/.test(query)) {
    return {
      answer: "VeloLaunch does not publish standard prices or public bids because the right scope depends on the product, integration, delivery constraints, and operating needs. Share the outcome you need, and we can prepare a considered commercial conversation.",
      handoff: true,
    };
  }

  if (/devops|cloud|deploy|deployment|infrastructure|observability/.test(query)) {
    return {
      answer: "Cloud & DevOps work focuses on the foundations that keep a product safe to change, deploy, observe, and operate. Typical topics include cloud delivery, deployment practices, observability, and engineering workflow.",
    };
  }

  if (/web|website|saas|dashboard|portal/.test(query)) {
    return {
      answer: "VeloLaunch builds responsive web products, SaaS systems, dashboards, integrations, and product platforms. The work starts with the workflows and decisions the product needs to support—not just screens.",
      handoff: true,
    };
  }

  if (/mobile|ios|android|app development|application development/.test(query)) {
    return {
      answer: "Mobile app development is for product experiences that need to work away from the desk. VeloLaunch can help define the mobile workflow, cross-platform approach, release path, and operating requirements.",
      handoff: true,
    };
  }

  if (/ai|artificial intelligence|assisted|copilot|automation|intelligent/.test(query)) {
    return {
      answer: "AI-powered and AI-assisted development is used where it makes a workflow, decision, or product capability more useful. VeloLaunch evaluates the product context, data and integration constraints, human review needs, and the operating system around the feature.",
      handoff: true,
    };
  }

  if (/velo|service|what do you do|company|product/.test(query)) {
    return {
      answer: "VeloLaunch is an AI-first software development company by Smart Vista IT Solutions. We combine product thinking, AI systems, software engineering, and delivery practices for work that needs to become real.",
    };
  }

  if (/call|contact|conversation|consult|talk|help/.test(query)) {
    return {
      answer: "A short project conversation is the best next step when you need advice specific to your product, team, timeline, or commercial scope. Use the callback request below and we will follow up.",
      handoff: true,
    };
  }

  return fallbackReply;
}
