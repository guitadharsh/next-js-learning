import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

// Secret key for JWT signing
const JWT_SECRET = 'adharsh-is-great!';
const ACCESS_TOKEN_EXPIRES_IN = '5m'; // Access token expiration time
const REFRESH_TOKEN_EXPIRES_IN = '10m'; // Refresh token expiration time

// Simulated user data with email and passwords
const users = [
  { userId: 1, name: 'Alice', email: 'alice@example.com', password: 'psd1' },
  { userId: 2, name: 'Bob', email: 'bob@example.com', password: 'psd2' },
  { userId: 3, name: 'Charlie', email: 'charlie@example.com', password: 'psd3' }
];

// Mock database for refresh tokens
const refreshTokens = {};

// Middleware to parse JSON request bodies
app.use(express.json());

// LOGIN API: Returns accessToken and refreshToken
app.post('/login', (req, res) => {
  console.log("api hitting...")
  const { userId, email, password } = req.body;

  // Find user by userId or email and validate password
  const user = users.find(
    (u) =>
      ((userId && u.userId === userId) || (email && u.email === email)) &&
      u.password === password
  );

  if (!user) return res.status(401).json({ message: 'Invalid user ID, email, or password' });

  const accessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  // Store the refresh token in the mock database
  refreshTokens[user.userId] = refreshToken;

  // Get the expiry time in seconds
  const accessTokenExpiryTime = Math.floor(Date.now() / 1000) + 5 * 60; // 5 minutes for access token
  const refreshTokenExpiryTime = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes for refresh token

  res.json({
    accessToken,
    accessTokenExpiryTime,
    refreshToken,
    refreshTokenExpiryTime
  });
});

// VERIFY ACCESS TOKEN API: Verifies the provided accessToken
app.post('/verify', (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) return res.status(400).json({ message: 'Access token is required' });

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired access token' });

    // Access token is valid, return user ID
    res.json({ userId: decoded.userId });
  });
});

// GET USER DETAILS API: Fetch user details by userId
app.get('/getuserdetails/:userId', (req, res) => {
  const { userId } = req.params;

  const user = users.find((u) => u.userId == userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Return user details
  res.json({ userId: user.userId, name: user.name, email: user.email });
});

// REFRESH TOKEN API: Provides a new access token using refresh token
app.post('/refreshtoken', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required' });

  // Check if the refresh token is valid
  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    // Generate new access token
    const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

    res.json({ accessToken: newAccessToken });
  });
});

// LOGOUT API: Destroys the current user's token
app.post('/logout', (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) return res.status(400).json({ message: 'Access token is required' });

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired access token' });

    // Remove the refresh token from the mock database
    delete refreshTokens[decoded.userId];

    res.json({ message: 'Logged out successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
