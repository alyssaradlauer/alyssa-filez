import db from "#db/client";

//returns all files
export async function getFiles() {
  const SQL = `
    SELECT files.*,
    folders.name AS folder_name
    FROM files
    JOIN folders
    ON files.folder_id = folders.id
    ORDER BY files.id
    `;
  const response = await db.query(SQL);
  return response.rows;
}

export async function createFile({ folderId, name, size }) {
  const SQL = `
INSERT INTO files (folder_id, name, size) VALUES ($1, $2, $3) RETURNING *
`;

  const params = [folderId, name, size];
  const response = await db.query(SQL, params);
  return response.rows[0];
}
