# Website Chatbot Validation Notes

The public homepage renders the **Ask VeloLaunch** launcher as a dedicated fixed control. The initial browser click did not expose the panel in the automation output, so the live DOM interaction was retried directly.

The direct live interaction opened the guide successfully: the launcher reported `aria-expanded="true"`, the conversation panel and input were present, and three suggested prompts were available. A live pricing question then returned the grounded no-standard-prices guidance and displayed a callback handoff link to `/#contact`.
