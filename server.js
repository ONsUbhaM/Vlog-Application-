import express from 'express';
import articalRouter from './routes/articals.js';
import Artical from './models/artical.js';
import mongoose from 'mongoose';
import methodOverride from 'method-override';

const app = express();
const port = process.env.port || 5000;

mongoose.connect('mongodb://localhost:27017/blog')

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/", async (req, res) => {
    const articals = await Artical.find().sort({createdAt: 'desc'});
    res.render("articals/index.ejs", {
        articals: articals,
    });
});

app.use("/articals", articalRouter);

app.listen(port, () => {
    console.log(`Listning on port: ${port}`);
});
