import mongoose from "mongoose";
import slugify from 'slugify';
import {marked} from 'marked';
import createDomPurifier from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = createDomPurifier(new JSDOM().window);

const articalSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    markdown: { 
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        require: true,
    }
})

articalSchema.pre('validate', function(next){
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
})

export default mongoose.model('Artical',articalSchema);