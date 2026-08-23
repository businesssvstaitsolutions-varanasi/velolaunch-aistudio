import { FormEvent, useState } from "react";
import { ArrowUpRight, Bot, MessageCircleMore, Send, X } from "lucide-react";
import { chatbotPrompts, getVeloLaunchChatbotReply, type ChatbotReply } from "@/lib/velolaunchChatbot";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  handoff?: boolean;
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content: "Hi, I’m the VeloLaunch guide. Ask about AI development, web or mobile apps, DevOps, services, or how pricing conversations work.",
};

export function WebsiteChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);

  const respond = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const reply: ChatbotReply = getVeloLaunchChatbotReply(trimmed);
    setMessages(current => [...current, { role: "user", content: trimmed }, { role: "assistant", content: reply.answer, handoff: reply.handoff }]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    respond(input);
  };

  return (
    <aside className="website-chatbot" aria-label="VeloLaunch website chatbot">
      {open ? (
        <section className="website-chatbot-panel" role="dialog" aria-modal="false" aria-labelledby="website-chatbot-title">
          <header className="website-chatbot-head">
            <div><span className="website-chatbot-mark"><Bot size={15} aria-hidden="true" /></span><div><p>VeloLaunch</p><strong id="website-chatbot-title">Project guide</strong></div></div>
            <button type="button" className="website-chatbot-close focus-ring" onClick={() => setOpen(false)} aria-label="Close website chatbot"><X size={17} aria-hidden="true" /></button>
          </header>
          <div className="website-chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`website-chatbot-message ${message.role}`} key={`${message.role}-${index}`}>
                <p>{message.content}</p>
                {message.handoff ? <a href="/#contact">Request a conversation <ArrowUpRight size={14} aria-hidden="true" /></a> : null}
              </div>
            ))}
          </div>
          <div className="website-chatbot-prompts" aria-label="Suggested questions">
            {chatbotPrompts.slice(0, 3).map(prompt => <button type="button" key={prompt} onClick={() => respond(prompt)}>{prompt}</button>)}
          </div>
          <form className="website-chatbot-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="website-chatbot-input">Ask VeloLaunch about a project</label>
            <input id="website-chatbot-input" value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about a project" autoComplete="off" />
            <button type="submit" aria-label="Send chatbot question"><Send size={16} aria-hidden="true" /></button>
          </form>
        </section>
      ) : null}
      <button type="button" className="website-chatbot-launcher focus-ring" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-controls="website-chatbot-title">
        <MessageCircleMore size={18} aria-hidden="true" />
        <span>{open ? "Close guide" : "Ask VeloLaunch"}</span>
      </button>
    </aside>
  );
}
