import { describe, expect, it } from "vitest";
import { getVeloLaunchChatbotReply } from "../client/src/lib/velolaunchChatbot";

describe("VeloLaunch chatbot answer catalogue", () => {
  it("routes pricing questions to grounded commercial guidance", () => {
    const reply = getVeloLaunchChatbotReply("How much does a SaaS app cost?");
    expect(reply.handoff).toBe(true);
    expect(reply.answer).toContain("does not publish standard prices");
  });

  it("covers AI, web, mobile, and DevOps without inventing commercial details", () => {
    expect(getVeloLaunchChatbotReply("Tell me about AI assisted development").answer).toContain("AI-powered and AI-assisted");
    expect(getVeloLaunchChatbotReply("Can you build a web dashboard?").answer).toContain("responsive web products");
    expect(getVeloLaunchChatbotReply("Do you make mobile apps?").answer).toContain("Mobile app development");
    expect(getVeloLaunchChatbotReply("How do you handle DevOps?").answer).toContain("Cloud & DevOps");
  });

  it("uses a callback handoff for unknown or contact-specific questions", () => {
    expect(getVeloLaunchChatbotReply("Can someone call me?").handoff).toBe(true);
    expect(getVeloLaunchChatbotReply("What should I know?").handoff).toBe(true);
  });
});
