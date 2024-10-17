import { Pearl } from "../src"


const client = new Pearl({ apiKey: "quark_ls_KUXR4U$$2$R3LgF^OkXx9k+" })
.context([])
.defineWorkflow(`
  go to flipkart.com and search 10 laptops of 10 different 
  brands by url jumping instead of manual search
  and compare their prices in the success message at end
`)
.instances(10);


client.on("update", (msg: any) => {
    console.log("thoughts on action: ", msg)
})

client.execute();

