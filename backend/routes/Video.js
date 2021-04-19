const express = require('express')
const router = express.Router()
const videos = require('../mockData')
const fs = require('fs')
const assetsDir = '/Users/diogolima/Documents/projects/stream-app/backend/assets'

router.get('/', (req, res) => {
  res.json(videos)
})

router.get('/liz', (req, res) => {
  res.sendFile('liz-nadando.mp4', { root: assetsDir })
})

router.get('/:id/data', (req, res) => {
  const data = video(req.params)
  res.json((data))
})

router.get('/:id', (req, res) => {
  const data = video(req.params)
  const videoPath = `${assetsDir}/${data.video_path}`
  const videoStat = fs.statSync(videoPath)
  const fileSize = videoStat.size;
  const videoRange = req.headers.range;
  if (videoRange) {
    const { head, start, end, chunksize } = generateParts(videoRange, fileSize)
    const file = fs.createReadStream(videoPath, { start, end });
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
})

const video = (params) => {
  const id = parseId(params)
  return videos[id]
}

const parseId = (params) => {
  return parseInt(params.id, 10) - 1
}

const generateParts = (videoRange, fileSize) => {
  const parts = videoRange.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunksize = (end - start) + 1;
  const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
  };
  return { head, start, end, chunksize }
}

module.exports = router