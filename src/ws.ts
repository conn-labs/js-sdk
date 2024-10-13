import WebSocket from 'ws';
import { Pearl } from './client';
import { AgentWorkflow } from './types';
import { WS_URL } from './constant';

const ws = new WebSocket(WS_URL+"/workflow")



export async function handleWebSocket(p: Pearl, schema: AgentWorkflow) {
  ws.on("error", console.error);
  if(!schema.apiKey) throw new Error(" ")
  if(schema.input === "") throw new Error(" ")


  ws.on("open", () => {
    const data = {
        route: "/workflow",
        data: schema
    }

    console.log(data)
    ws.send(JSON.stringify(data));
  })


  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());
    if(data.thought) {
      p.emit("update", data.thought)
    }
    if(data.success) {
      p.emit("update", data.success)
      ws.close()
    }
  })
}