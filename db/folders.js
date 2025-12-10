import db from "#db/client";

export async function getFolders() {
  const SQL = `
    SELECT folders.*
    FROM folders
    `;
  const response = await db.query(SQL);
  return response.rows;
}

export async function getFolder(id) {
  const SQL = `
    SELECT folders.*,
    COALESCE(
    json_agg(files ORDER BY files.id)
    FILTER (WHERE files.id IS NOT NULL),
    '[]'::json
    ) AS files
    FROM folders
    LEFT JOIN files
    ON files.folder_id = folders.id
    WHERE folders.id = $1
    GROUP BY folders.id;
    `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
}
