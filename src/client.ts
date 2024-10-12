import { error } from "console";
import { EventHandler } from "./eventHandler";
import { AgentWorkflow, Context, JobEvents } from "./types";

export class Pearl extends EventHandler {
   private workFlow: AgentWorkflow;
   private route: string = "/agent"; 
     
  constructor({ apiKey, openaiKey }: { apiKey?: string; openaiKey?: string }) {
     super();
     if (!apiKey && !process.env.PEARL_API_KEY) throw new Error("API key is required. Please provide an API key or set the PEARL_API_KEY environment variable.");

     this.workFlow = {
       input: "",
       instances: 0,
       apiKey: process.env.PEARL_API_KEY || apiKey || "",
       context: [],
       memory: true,
       proMode: true,  
       openaiKey: process.env.OPENAI_API_KEY || openaiKey
     };
   }


   public async defineWorkflow(input: string) {
     this.workFlow.input = input;
   }

   public async context(ctx: Context[]) {
     this.workFlow.context = ctx
   }

   public async once() {
    this.workFlow.instances = 1;
   }

   public async instances(instances: number) {
    this.workFlow.instances = instances
   }

   public async cron(cron: string) {
    console.warn("Cron functionality has not been implemented yet. Follow @PearlAI_ on Twitter for updates.");
    throw new Error("Cron functionality is not yet available.");
   }

   public async onEvent(event: JobEvents) {
    console.warn("Event functionality has not been implemented yet. Follow @PearlAI_ on Twitter for updates.");
    throw new Error("Event functionality is not yet available.");
   }


}