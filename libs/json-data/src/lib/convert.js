const fs = require('fs');
const json = require('./partituras.json');

const convert = (old) => {
  return {
    //id: old.id,
    title: old.title,
    genre: old.genre,
    poetry: old.poetry,
    music: old.music,
    scores: old.scores.map((i) => ({ uri: i.url })),
    lyrics: old.lyrics,
    cover:
      old.cover === null
        ? null
        : {
            uri: old.cover.source,
          },
    playlist:
      old.playlist === null
        ? null
        : old.playlist.map((i) => ({
            title: i.title,
            description: i.description,
            duration: i.duration,
            formats: i.formats.map((f) => ({
              type: f.format,
              url: { uri: f.url },
            })),
          })),
    source: {
      uri: old.source.url,
    },
  };
};

const newJson = json.map(convert);

fs.writeFileSync('partituras-new.json', JSON.stringify(newJson, null, 2));
