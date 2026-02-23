const { pool } = require("../../config/database");

exports.bulkInsert = async (rows) => {

    const values = [];
    const placeholders = rows.map((r, i) => {

        const idx = i * 6;

        values.push(
            r.product,
            r.category,
            r.region,
            r.amount,
            r.quantity || 1,
            r.date
        );

        return `($${idx + 1},$${idx + 2},$${idx + 3},$${idx + 4},$${idx + 5},$${idx + 6})`;

    }).join(",");

    await pool.query(`
    INSERT INTO sales(product,category,region,amount,quantity,created_at)
    VALUES ${placeholders}
  `, values);

};
