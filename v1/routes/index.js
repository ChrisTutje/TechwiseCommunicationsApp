import express from "express"; // import the express module

const app = express(); // Create an app object

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.get("/v1", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
export default app;