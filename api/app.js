import path from "path";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express from "express";  
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import {app,server} from "./socket/app.js"
import messageRoute from "./routes/message.route.js";



const port=process.env.PORT || 5000;
// const app=express();

const corsOptions ={
  origin:'http://localhost:5173', 
// origin:'https://realestate-client-zcfo.onrender.com/',
  credentials:true, 
}  
app.use(cookieParser());

app.use(cors(corsOptions));
// app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts",postRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);

//code for deployment....
if(process.env.NODE_ENV ==="production"){
  const dirPath = path.resolve();

  app.use(express.static("./client/dist"));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(dirPath,"./client/dist","index.html"));
});
}



server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });