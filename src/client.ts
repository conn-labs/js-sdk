import { error } from "console";
import { EventHandler } from "./eventHandler";
import { AgentWorkflow, Context, JobEvents } from "./types";
import { handleWebSocket } from "./ws";

export class Pearl extends EventHandler {
   private workFlow: AgentWorkflow;
   private route: string = "/workflow"; 
     
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
       openaiKey: process.env.OPENAI_API_KEY || openaiKey || null
     };
   }     


   public defineWorkflow(input: string): Pearl {
     this.workFlow.input = input;
     return this
   }     

   public context(ctx: Context[]): Pearl {
     this.workFlow.context = ctx
     return this
   }    

   public once(): Pearl {
    this.workFlow.instances = 1;
    return this
   }   

   public instances(instances: number): Pearl {
    this.workFlow.instances = instances
    return this
   }

   public cron(cron: string): Pearl {
    console.warn("Cron functionality has not been implemented yet. Follow @PearlAI_ on Twitter for updates.");
    throw new Error("Cron functionality is not yet available.");
   }

   public onEvent(event: JobEvents): Pearl {
    console.warn("Event functionality has not been implemented yet. Follow @PearlAI_ on Twitter for updates.");
    throw new Error("Event functionality is not yet available.");
   }


   public async execute() {
    await handleWebSocket(this, this.workFlow)
  }

}