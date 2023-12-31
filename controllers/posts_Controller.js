// const Post = require("../models/post");
// const Comment = require("../models/comment");

// module.exports.create = async function (req, res) {
//   try {
//     await Post.create({
//       content: req.body.content,
//       user: req.user._id,
//     });

//     if(req.xhr){
//       return res.status(200).json({
//         data: {
//           post:post
//         },
//         message: "post created!"
//       })
//     }

//     req.flash('success',"Post Published");
//     return res.redirect("back");
//   } catch (err) {
//     // console.log("Error", err);
//     req.flash('error',err);
//     return res.redirect("back");
//   }
// };

// // module.exports.destroy = async function (req, res) {
// //   Post.findById(req.params.id, function (err, post) {
// //     // .id means converting the object id into string
// //     if (post.user == req.user.id) {
// //       post.remove();

// //       Comment.deleteMany({ post: req.params.id }, function (err) {
// //         return res.redirect("back");
// //       });
// //     } else {
// //       return res.redirect("back");
// //     }
// //   });
// // };

// // converting this into async await

// module.exports.destroy = async function (req, res) {
//     try{
//         let post = await Post.findById(req.params.id);
//         if (post.user == req.user.id) {
//           post.remove();
    
//           await Comment.deleteMany({ post: req.params.id });

//           req.flash('success',"Post and associated comment deleted");

//             return res.redirect('back');
//         } else {
//           req.flash('error',"You cannot delete this Post");
//           return res.redirect("back");
//         } 
//     }catch(err){
      
//     req.flash('error',err);
//         // console.log('Error',err);
//     return res.redirect("back");
//     }
// };

const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            await Like.deleteMany({likeable: post._id, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted successfully"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}