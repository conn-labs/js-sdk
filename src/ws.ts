import WebSocket from 'ws';
import { Pearl } from './client';
import { AgentWorkflow } from './types';

const ws = new WebSocket('ws://www.host.com/path');



export async function handleWebSocket(p: Pearl, schema: AgentWorkflow) {
  ws.on("error", console.error);
  if(!schema.apiKey) throw new Error(" ")
  if(schema.input === "") throw new Error(" ")


  ws.on("open", () => {
    ws.send(JSON.stringify(schema));
  })


  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());

    console.log(data)
  })
}