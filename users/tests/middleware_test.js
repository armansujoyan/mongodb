const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware tests', () => {
  let joe;
  let blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yeah it really is.',
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('User clean up propogates remove on blog post', (done) => {
    joe.remove()
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
