const db = require("../routes/connect.js");
const jwt = require('jsonwebtoken');

const getLikes = (req, res) =>{
    const q = `SELECT userId FROM likes WHERE postId = ?`;

    db.query(q, [req.query.postId], (err, data) =>{
        if(err){res.status(500).send(err)};
        res.send(data.map(like=> like.userId));
    })
}

const addLikes = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token){res.status(401).send("Not logged in!")}
    
    jwt.verify(token, 'secretkey', (err, userInfo)=>{
        if(err){res.status(403).send("Token is not valid!")}  // we have a token but it's not valid;
        
        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.postId
        ]
    
        db.query(q, [values], (err, data) =>{  // userInfo is auth.js's jwt token id;
            if(err){res.status(500).send(err)};
            res.status(200).send('Post has been liked!');
        })
    })
}

const deleteLikes = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token){res.status(401).send("Not logged in!")}
    
    jwt.verify(token, 'secretkey', (err, userInfo)=>{
        if(err){res.status(403).send("Token is not valid!")}  // we have a token but it's not valid;
        
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
    
        db.query(q, [userInfo.id, req.query.postId], (err, data) =>{  // userInfo is auth.js's jwt token id;
            if(err){res.status(500).send(err)};
            res.status(200).send('Like has been removed!');
        })
    })
}

module.exports = {getLikes, addLikes, deleteLikes};