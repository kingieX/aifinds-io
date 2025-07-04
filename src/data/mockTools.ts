import { AITool } from "@/types/tool";

export const mockTools: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description:
      "AI chatbot powered by GPT-4 for general-purpose text generation.",
    category: "Chatbot",
    tags: ["OpenAI", "Text", "GPT-4"],
    website: "https://chat.openai.com/",
    image: "/tools/chatgpt.png",
    isFeatured: true,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "AI tool that creates stunning images from text prompts.",
    category: "Image Generator",
    tags: ["Art", "Image", "Prompt"],
    website: "https://www.midjourney.com/",
    image: "/tools/midjourney.png",
    isFeatured: true,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI coding assistant powered by OpenAI Codex.",
    category: "Code Assistant",
    tags: ["Coding", "IDE", "GitHub"],
    website: "https://github.com/features/copilot",
    image: "/tools/copilot.png",
    isFeatured: true,
  },
];
