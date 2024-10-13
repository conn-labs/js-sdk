import {Pearl} from "../src"



const client = new Pearl({ apiKey: "quark_ls_KUXR4U$$2$R3LgF^OkXx9k+" })
.context([])
.defineWorkflow("Open google.com and go to google finance")
.once()


client.on("update", (msg: any) => {
    console.log(msg)
})


client.execute();

