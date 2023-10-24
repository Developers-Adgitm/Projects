import express from "express";
import {Book} from "../models/bookmodel.js";


const router = express.Router();


// route for save a new book 
router.post('/' , async (request , response) =>{
    try{
    if(!request.body.title ||
        !request.body.author ||
        !request.body.publishyear
        ){
            return response.status(400).send({message : "send all the required fields"});
        }
    
        const newbook = {
            title : request.body.title,
            author : request.body.author,
            publishyear : request.body.publishyear,
        };

        const book = await Book.create(newbook);

        return response.status(201).send(book);
    }catch(error){
        console.log(error);
        return response.status(500).send({message : error.message});
    }
});

//route to get all books 

router.get('/' , async (request , response) => {
    try{
       const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
        });

    }catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
});

// get one book by id from database 

router.get('/:id' , async (request , response) => {
    try{
        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
});

//route for update a book 
 router.put('/:id' , async (request , response) => {
    try{
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishyear
            ){
                return response.status(400).send({message : "send all the required fields"});
            }

            const {id} = request.params;
     const result = await Book.findByIdAndUpdate(id , request.body);

     if(!result){
        return response.status(404).send({message : "book not found"});
     }
     else{
return response.status(200).send({message : "book updated successfully"})
};
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
 });

// route for delete a book 

router.delete('/:id' , async (request , response) => {
    try{

        const {id} = request.params;
         const book = await Book.findByIdAndDelete(id);

         return response.status(200).send({message : "book deleted successfully"});
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
});


export default router ;
