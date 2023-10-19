{

    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $("#new-post-form");

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:"post",
                url:'/post/create',
                data: newPostForm.serialize(),
                success: function(data){

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
// method to create the post in dom




    createPost();

}




