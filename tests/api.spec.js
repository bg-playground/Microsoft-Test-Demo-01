const { test, expect } = require('@playwright/test');

test.describe('API Testing Examples', () => {
  test('should GET a list of posts and verify response', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Verify status code
    expect(response.status()).toBe(200);
    
    // Verify response body
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');
    expect(body.id).toBe(1);
  });

  test('should POST a new resource', async ({ request }) => {
    const newPost = {
      title: 'Test Post from Playwright',
      body: 'This is a test post created by automated testing',
      userId: 1
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });
    
    // Verify status code
    expect(response.status()).toBe(201);
    
    // Verify response body contains our data
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
  });

  test('should verify response headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    
    // Verify status code
    expect(response.status()).toBe(200);
    
    // Check response headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    
    // Verify we got an array of posts
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('should handle 404 responses', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
    
    // Verify 404 status
    expect(response.status()).toBe(404);
  });

  test('should test multiple API endpoints', async ({ request }) => {
    // Test users endpoint
    const usersResponse = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(usersResponse.status()).toBe(200);
    const users = await usersResponse.json();
    expect(Array.isArray(users)).toBeTruthy();
    
    // Test comments endpoint
    const commentsResponse = await request.get('https://jsonplaceholder.typicode.com/comments?postId=1');
    expect(commentsResponse.status()).toBe(200);
    const comments = await commentsResponse.json();
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
  });
});
