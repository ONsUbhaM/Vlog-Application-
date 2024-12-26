import express from 'express';
import Artical from '../models/artical.js';

const router = express.Router();

export default router;

router.get("/new", (req, res) => {
    res.render("articals/new", {artical: new Artical() });
});

router.get('/:slug', async (req, res) => {
    const artical = await Artical.findOne({slug: req.params.slug});
    if(artical == null) res.redirect('/')
    res.render('articals/show', {artical: artical});
})

router.post('/', async (req, res, next) => {
    req.artical = new Artical();
    next();
}, 
    saveArticalAndRedirect('new')
);

function saveArticalAndRedirect(path) {
    return async (req, res) => {
        let artical = req.artical

        artical.title = req.body.title
        artical.description = req.body.description
        artical.markdown = req.body.markdown
        
        try{
            artical = await artical.save();
            res.redirect(`/articals/${artical.slug}`);
        }catch(e){
            res.render(`articals/${path}`,{artical: artical});
        }
    }
 }

router.delete('/:id', async (req, res) => {
    await Artical.findByIdAndDelete(req.params.id);
    res.redirect('/');
});