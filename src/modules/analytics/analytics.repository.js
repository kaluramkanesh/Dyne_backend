const { pool } = require("../../config/database");

// Category wise rating distribution
exports.categoryRatings = async () => {

    const result = await pool.query(`
    SELECT 
      category,
      AVG(rating) as avg_rating,
      SUM(rating_count) as total_ratings
    FROM products
    GROUP BY category
    ORDER BY avg_rating DESC
  `);

    return result.rows;
};


// Top 5 performing products
exports.topProducts = async () => {

    const result = await pool.query(`
    SELECT 
      name,
      category,
      rating,
      rating_count
    FROM products
    ORDER BY rating DESC, rating_count DESC
    LIMIT 5
  `);

    return result.rows;
};


// 🔥 Review Engagement (Most Reviewed Products)
exports.reviewEngagement = async () => {

    const result = await pool.query(`
    SELECT 
      p.name,
      COUNT(r.id) as total_reviews
    FROM reviews r
    JOIN products p ON p.id = r.product_id
    GROUP BY p.name
    ORDER BY total_reviews DESC
    LIMIT 5
  `);

    return result.rows;
};
