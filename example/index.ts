import {Pearl} from "../src"

import { Fields, Provider } from "../src/types";



const client = new Pearl({ apiKey: "quark_ls_KUXR4U$$2$R3LgF^OkXx9k+" })
.context([])
.defineWorkflow("Go to google.com, search google finance find me stocks of 10 different companies and you can use url hopping, all 10 companies have to be different, memorize their stock prices and charts on the page and give me a detailed comparision of their prices as successmessage")
.instances(10);




client.on("update", (msg: any) => {
    console.log(msg)
})


client.execute();

