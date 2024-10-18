
export default class Post {
    constructor(title, author, content) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = new Date().toLocaleDateString();
    }

    editPost(title, author, content) {
        this.title = title;
        this.author = author;
        this.content = content;
    }

}