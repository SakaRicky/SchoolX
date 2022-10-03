import { Query } from 'express-serve-static-core';

// used to create the type of body I will receive for request.body
// I define it locally to the routes because I will be using it here
export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

// may use it if I use query on this app
export interface TypedRequestQuery<T extends Query> extends Express.Request {
     query: T

     // app.get('/article/:id', function (req: TypedRequestQuery<{ id: string }>, res: Express.Response) {
    //     const id = req.query.id;
    //     // Fetch from database here and return article        
    //     res.status(200).json({ ID: id });
    // });
}
