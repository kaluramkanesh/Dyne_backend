const { pool } = require("../../config/database");
const excelParser = require("../../utils/excelParser");
const productRepo = require("../products/products.repository");
const reviewRepo = require("../reviews/reviews.repository");

exports.importDataset = async (file) => {

    const rows = await excelParser(file.path);

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        for (const row of rows) {

            const cleanRow = {};

            Object.keys(row).forEach(key => {
                const newKey = key
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "_")
                    .replace(/_+/g, "_");

                cleanRow[newKey] = row[key];
            });

            if (!cleanRow.product_id) continue;

            // 🔥 ALWAYS SAME CLIENT
            let product = await productRepo.findByExternalId(cleanRow.product_id, client);

            if (!product) {
                product = await productRepo.createProduct(cleanRow, client);
            }

            if (!product || !product.id) {
                throw new Error("Product creation failed");
            }

            await reviewRepo.createReview(product.id, cleanRow, client);
        }

        await client.query("COMMIT");

        return true;

    } catch (err) {

        await client.query("ROLLBACK");

        throw err;

    } finally {
        client.release();
    }
};
