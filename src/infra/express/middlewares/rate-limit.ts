import rateLimit from 'express-rate-limit';

// One minute => 100 requests
export const rateLimitRequests = rateLimit({
  windowMs: 60000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_, res) => {
    res.status(429).json({
      error: 'Too many requests from this IP, please try again in an minute!',
    });
  },
});
