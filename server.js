
const express = require("express")
const connectDB = require("./config/db")
const categoryRoute = require("./routes/categoryRoute")
const cors = require("cors")
const productRoute = require("./routes/productRoute")
const authRoute = require("./routes/authRoute")
const cookieParser = require("cookie-parser")
const cartRoute = require("./routes/cartRoute")
const paymentRoute = require("./routes/paymentRoute")

connectDB()
const app = express()

app.use(cors({
    origin: "https://technotronix-frontend-delta.vercel.app/",
    allowedHeaders: ["Content-Type", "Authorization", "auth-token" ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)
app.use("/", paymentRoute)
app.use("/uploads", express.static('uploads'))
app.use("/", authRoute)
app.use("/", cartRoute)
app.use(cookieParser())

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`You are listening on port ${port}`))