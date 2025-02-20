


export interface InitalInterface{
    allPosts:PostInterface[]|null,
    isLoading:boolean,
    error:null|string,
    singlePost:null|PostInterface,
    getAllCommentsLoader:boolean
}
export interface PostInterface{
    _id:string,
    body:string,
    image:string,
     user:User,
     createdAt:string,
     comments?:Comment[]
}
interface User{
    _id:string,
    name:string,
    photo:string
}
interface Comment{
    _id:string,
    content:string,
    commentCreator:User,
    post:string,
    createdAt:string
}
/*


"posts": [
        {
            "_id": "6665d220594c3191507a33dc",
            "body": "Route is an Egyptian IT-Training Center founded in 2012\nWe have identified the unique challenges peop",
            "image": "https://linked-posts.routemisr.com/uploads/7b8f29c7-5390-4045-b907-8dbd2df7e6e8-241513285_4254592044636278_6228006272036394703_n.jpeg",
            "user": {
                "_id": "6665ce235a68189e40bb3a65",
                "name": "Ahmed Bahnasy",
                "photo": "https://linked-posts.routemisr.com/uploads/default-profile.png"
            },
            "createdAt": "2024-06-09T16:02:40.280Z",
            "comments": [
                {
                    "_id": "6669869f594c3191507a3b33",
                    "content": "great",
                    "commentCreator": {
                        "_id": "66682f80594c3191507a366a",
                        "name": "Ahmed",
                        "photo": "https://linked-posts.routemisr.com/uploads/undefined"
                    },
                    "post": "6665d220594c3191507a33dc",
                    "createdAt": "2024-06-12T11:29:35.735Z"
                },

*/