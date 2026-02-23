const { pool } = require("../../config/database");

exports.createReview = async (productId, data, client) => {

    const db = client || pool;

    await db.query(
        `INSERT INTO reviews(
            product_id,
            user_name,
            review_title,
            review_content
        )
        VALUES($1,$2,$3,$4)`,
        [
            productId,
            data.user_name || null,
            data.review_title || null,
            data.review_content || null
        ]
    );
};
