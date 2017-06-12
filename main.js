var SpacebookApp = function () {
  // dummy data
  var STORAGE_ID = 'spacebook';

  // variable for storing our posts div
  var $posts = $('.posts');

  // build a single post object and push it to array
  var createPost = function (text) {
    posts.push({ text: text, comments: [] });
  };

  // Empty all the posts, then add them from the posts array along with our
  // new comments HTML
  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' + '<div class=comments-list></div>' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post">'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var renderComments = function () {
    $('.comments-list').empty();

    for (var i = 0; i < posts.length; i += 1) {
      // the current post in the iteration
      var post = posts[i];

      // finding the "post" element in the page that is equal to the
      // current post we're iterating on... alertnatively we could have
      // used the data_attriubute, but the index is the same
      var $post = $('.posts').find('.post').eq(i);

      // iterate through each comment in our post's comments array
      for (var j = 0; j < post.comments.length; j += 1) {
        // the current comment in the iteration
        var comment = post.comments[j];

        // append the comment to the post we wanted to comment on
        $post.find('.comments-list').append(
          '<div class="comment">' + comment.text +
          '<button class="btn btn-danger remove-comment">Remove Comment</button>' +
          '</div>'
        );
      };
    };
  };

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');

    var index = $clickedPost.index();

    posts.splice(index, 1);
    $clickedPost.remove();
  };

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  };

  var createComment = function (text, postIndex) {
    var comment = { text: text };

    // pushing the comment into the correct posts array
    posts[postIndex].comments.push(comment);
  };

  var removeComment = function (commentButton) {
    // the comment element that we're wanting to remove
    var $clickedComment = $(commentButton).closest('.comment');

    // index of the comment element on the page
    var commentIndex = $clickedComment.index();

    // index of the post in the posts div that the comment belongs to
    var postIndex = $clickedComment.closest('.post').index();

    // removing the comment from the page
    $clickedComment.remove();

    // remove the comment from the comments array on the correct post object
    posts[postIndex].comments.splice(commentIndex, 1);
  };

  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(posts));
  }

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

  var posts = getFromLocalStorage();

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments,
    saveToLocalStorage: saveToLocalStorage,
    getFromLocalStorage: getFromLocalStorage
  };
};

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();
app.renderComments();

// Events
$('.add-post').on('click', function (e) {
  e.preventDefault();

  var text = $('#post-name').val();
  app.createPost(text);
  app.renderPosts();
  app.renderComments();
  app.saveToLocalStorage();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
  app.saveToLocalStorage();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();

  // finding the index of the post in the page... will use it in #createComment
  var postIndex = $(this).closest('.post').index();

  app.createComment(text, postIndex);
  app.renderComments();
  app.saveToLocalStorage();
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
  app.saveToLocalStorage();
});