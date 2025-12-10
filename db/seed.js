import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const SQL = `
  INSERT INTO folders(name) VALUES('red');
  INSERT INTO folders(name) VALUES('green');
  INSERT INTO folders(name) VALUES('blue');


  INSERT INTO files(name, size, folder_id) VALUES ('red-file-1', 100, 1);
  INSERT INTO files(name, size, folder_id) VALUES ('red-file-2', 110, 1);
  INSERT INTO files(name, size, folder_id) VALUES ('red-file-3', 115, 1);
  INSERT INTO files(name, size, folder_id) VALUES ('red-file-4', 120, 1);
  INSERT INTO files(name, size, folder_id) VALUES ('red-file-5', 117, 1);

  INSERT INTO files(name, size, folder_id) VALUES ('green-file-1', 100, 2);
  INSERT INTO files(name, size, folder_id) VALUES ('green-file-2', 110, 2);
  INSERT INTO files(name, size, folder_id) VALUES ('green-file-3', 115, 2);
  INSERT INTO files(name, size, folder_id) VALUES ('green-file-4', 120, 2);
  INSERT INTO files(name, size, folder_id) VALUES ('green-file-5', 117, 2);

  INSERT INTO files(name, size, folder_id) VALUES ('blue-file-1', 100, 3);
  INSERT INTO files(name, size, folder_id) VALUES ('blue-file-2', 110, 3);
  INSERT INTO files(name, size, folder_id) VALUES ('blue-file-3', 115, 3);
  INSERT INTO files(name, size, folder_id) VALUES ('blue-file-4', 120, 3);
  INSERT INTO files(name, size, folder_id) VALUES ('blue-file-5', 117, 3);
  `;
  await db.query(SQL);
}
