var post = [];
var id = 1;

var comment = '<form><h3>Comment</h3><div class="form-group"><input type="text" id="username" class="form-control" placeholder="Post Username"><input type="text" id="post-comment" class="form-control" placeholder="Post Comment"></div><button class="btn btn-primary add-comment" type="button">Comment</button></form>'


var newPost = function (id, text) {
    post.push({ id: id, text: text });
}

var updatePost = function () {
    $(".posts").empty();
    for (i = 0; i < post.length; i++) {
        $(".posts").append('<br><p class="post" data-id="' + post[i].id + '">' + post[i].text + '<br><button class="btn btn-primary remove-post" type="button">Remove Post</button>' + comment);
    }
}

$(".add-post").click(function () {
    newPost(id, $("#post-name").val());
    id++;
    $("#post-name").val("");
    updatePost();
})

$(".posts").on("click", "button", function () {
    post.splice($(this.closest("p")), 1);
    $(this.closest("p")).remove();
    $(".posts").find("form").remove();
})



