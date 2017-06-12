var SpacebookApp = function () {
    var posts = [
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]}
    ];

    // the current id to assign to a post
    var currentId = 0;
    var commentId = 0;
    var $posts = $('.posts');
    var source1 = $('#new-post').html();
    var source2 = $('#new-comment').html();
    var source3 = $('#new-commentholder').html();
    var template1 = Handlebars.compile(source1);
    var template2 = Handlebars.compile(source2);
    var template3 = Handlebars.compile(source3);
    var newHTML1;
    var newHTML2;
    var newHTML3;

    var _findPostById = function (id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
    }

    var _findPostById2 = function (obj, id2) {
        for (var i = 0; i < obj.comments.length; i += 1) {
            if (obj.comments[i].id === id2) {
                return i;
            }
        }
    }

    var createPost = function (text) {
        var post = {
            text: text,
            id: currentId,
            comments: []
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function () {
        $posts.empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            newHTML1 = template1({ id: post.id, text: post.text });
            newHTML2 = template2();

            // var commentsContainer = '<div class="comments-container">' +
            //     '<input type="text" class="comment-name">' +
            //     '<button class="btn btn-primary add-comment">Post Comment</button>' +
            //     '<div class="comments"></div></div>';

            // $posts.append('<div class="post" data-id=' + post.id + '>'
            //     + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
            //     commentsContainer + '</div>');

            $posts.append(newHTML1 + newHTML2);
        }
    }

    var removePost = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;

        var post = _findPostById(id);

        posts.splice(posts.indexOf(post), 1);
        $clickedPost.remove();
    }

    var toggleComments = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    var createComment = function (currentLocation, comment) {
        var clickedPost = $(currentLocation).closest('.post');
        var id = clickedPost.data().id;
        var post = _findPostById(id);
        post.comments.push({ id: commentId, comment: comment });
        commentId += 1;
    }

    var renderComments = function (currentLocation) {
        var clickedPost = $(currentLocation).closest('.post');
        var id = clickedPost.data().id;
        var post = _findPostById(id);
        clickedPost = $(currentLocation).siblings(".comments");
        clickedPost.empty();
        for (i = 0; i < post.comments.length; i++) {
            newHTML3 = template3({ id: post.comments[i].id, comment: post.comments[i].comment });
            clickedPost.append(newHTML3);
        }
    }

    var removeComment = function (currentLocation) {
        var clickedPost = $(currentLocation).closest('.post');
        var id = clickedPost.data().id;
        var post = _findPostById(id);
        clickedPost = $(currentLocation).closest(".commentholder");
        var id2 = clickedPost.data().id;
        var post2 = _findPostById2(post, id2);
        post.comments.splice(post2, 1);
        clickedPost.remove();
    }

    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        createComment: createComment,
        renderComments: renderComments,
        removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
    var text = $(this).siblings("input").val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
    //var text = $(this).closest("div").find("input").val();
    var text = $(this).siblings("input").val();
    app.createComment(this, text);
    app.renderComments(this);
});

$('.posts').on('click', '.delete-comment', function () {
    app.removeComment(this);
});




