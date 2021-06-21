import express, { request, response } from "express";

const app = express();

app.get("/test", (request, response) => {
    return response.send("Olá NLW");
})

app.post("/test-post", (request, response) => {
    return response.send("Olá NlW método Post")
})

// http//localhost:3000
app.listen(3000, () => console.log("Server is Running"));
