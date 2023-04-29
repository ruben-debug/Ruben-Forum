// Define global variables
var posts = []; // Array to store posts
var loggedInUser = null; // Variable to store logged-in user

// Define post object constructor
function Post(title, content, author) {
  this.title = title;
  this.content = content;
  this.author = author;
  this.comments = [];
}

// Define comment object constructor
function Comment(content, author) {
  this.content = content;
  this.author = author;
}

// Function to add a new post
function addPost(title, content) {
  if (loggedInUser !== null) {
    var post = new Post(title, content, loggedInUser);
    posts.push(post);
    displayPosts();
  } else {
    alert("You need to be logged in to post.");
  }
}

// Function to add a new comment to a post
function addComment(postIndex, content) {
  if (loggedInUser !== null) {
    var comment = new Comment(content, loggedInUser);
    posts[postIndex].comments.push(comment);
    displayPosts();
  } else {
    alert("You need to be logged in to comment.");
  }
}

// Function to display posts
function displayPosts() {
  var postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    var postHTML = "<div class='post'>" +
                   "<h3>" + post.title + "</h3>" +
                   "<p>" + post.content + "</p>" +
                   "<div class='author'>Posted by " + post.author + "</div>" +
                   "<div class='comment-form'><textarea id='comment-" + i + "' placeholder='Add a comment...'></textarea>" +
                   "<button onclick='addComment(" + i + ", document.getElementById(\"comment-" + i + "\").value)'>Comment</button></div>" +
                   "<div class='comments'>";
    for (var j = 0; j < post.comments.length; j++) {
      var comment = post.comments[j];
      postHTML += "<div class='comment'>" +
                  "<p>" + comment.content + "</p>" +
                  "<div class='author'>Comment by " + comment.author + "</div>" +
                  "</div>";
    }
    postHTML += "</div></div>";
    postsContainer.innerHTML += postHTML;
  }
}

// Function to log in
function login(username) {
  loggedInUser = username;
  document.getElementById("login-form").style.display = "none";
  document.getElementById("logout-form").style.display = "block";
  displayPosts();
}

// Function to log out
function logout() {
  loggedInUser = null;
  document
