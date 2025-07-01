const fs = require("fs");
const path = require("path");

// Path to your public/people directory
const peopleDir = path.join(process.cwd(), "public/people");

// Output file
const outputFile = path.join(process.cwd(), "public/people.json");

const people = [];

fs.readdirSync(peopleDir).forEach((personName) => {
  const personPath = path.join(peopleDir, personName);
  if (!fs.statSync(personPath).isDirectory()) return;

  const files = fs.readdirSync(personPath);

  // Find the first image
  const firstImage = files.find((f) => /\.(jpg|jpeg|png|gif)$/i.test(f));

  // Check for note.txt
  const noteFile = files.find((f) => f.toLowerCase() === "note.txt");
  let note = undefined;
  if (noteFile) {
    const notePath = path.join(personPath, noteFile);
    const content = fs.readFileSync(notePath, "utf-8").trim();
    if (content.length > 0) note = content; // only include if not empty
  }

  const personEntry = {
    name: personName,
    photoUrl: firstImage ? `/people/${personName}/${firstImage}` : undefined,
  };

  // Only include message if there’s note content
  if (note) {
    personEntry.message = note;
  }

  people.push(personEntry);
});

// Write people.json
fs.writeFileSync(outputFile, JSON.stringify(people, null, 2));
console.log(`✅ Generated people.json with ${people.length} entries.`);
