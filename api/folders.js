import express from "express";
const router = express.Router();
export default router;

import { getFolders, getFolder } from "#db/folders";
import { createFile } from "#db/files";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer.");

  const folder = await getFolder(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("Request must have a body.");
    }

    const { name, size } = req.body;

    if (!name || !size) {
      return res.status(400).send("Request must include name and size");
    }

    const folderId = req.params.id;
    const file = await createFile({
      folderId,
      name,
      size,
    });

    res.status(201).send(file);
  } catch (err) {
    next(err);
  }
});
