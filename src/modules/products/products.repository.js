const { pool } = require("../../config/database");

const cleanNumber = (value) => {

    if (!value) return null;

    const cleaned = String(value)
        .replace(/[^\d.]/g, "")   // remove ₹ , % , | etc
        .trim();

    return cleaned === "" ? null : Number(cleaned);
};


// 🔥 ADD THIS FUNCTION (missing one)
exports.findByExternalId = async (externalId, client) => {

    const db = client || pool;

    const result = await db.query(
        "SELECT * FROM products WHERE product_external_id=$1",
        [externalId]
    );

    return result.rows[0];
};



exports.createProduct = async (data, client) => {

    const db = client || pool;

    const result = await db.query(
        `INSERT INTO products(
            product_external_id,
            name,
            category,
            discounted_price,
            actual_price,
            discount_percentage,
            rating,
            rating_count,
            about_product
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *`,
        [
            data.product_id,
            data.product_name,
            data.category,
            cleanNumber(data.discounted_price),
            cleanNumber(data.actual_price),
            cleanNumber(data.discount_percentage),
            cleanNumber(data.rating),
            cleanNumber(data.rating_count),
            data.about_product
        ]
    );

    return result.rows[0];
};




// exports.getAllProducts = async () => {

//     const result = await pool.query(`SELECT * FROM products ORDER BY id DESC`);

//     return result.rows;
// };

exports.getAllProducts = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    // get paginated data
    const dataQuery = await pool.query(
        `SELECT * FROM products
         ORDER BY id DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    // total count for pagination meta
    const countQuery = await pool.query(
        `SELECT COUNT(*) FROM products`
    );

    const total = Number(countQuery.rows[0].count);

    return {
        data: dataQuery.rows,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};



exports.getProductById = async (id) => {

    const result = await pool.query(
        `SELECT * FROM products WHERE id=$1`,
        [id]
    );

    return result.rows[0];
};


exports.updateProduct = async (id, data) => {

    const result = await pool.query(`
    UPDATE products
    SET name=$1, category=$2
    WHERE id=$3
    RETURNING *
  `, [data.name, data.category, id]);

    return result.rows[0];
};


exports.deleteProduct = async (id) => {

    await pool.query(`DELETE FROM products WHERE id=$1`, [id]);

    return true;
};

exports.deleteAllProduct = async () => {
    await pool.query(`Delete from products`)
    return true
}
