const fs = require('fs');
const contentPath = 'C:/Users/jvker/.gemini/antigravity/brain/f9632126-720d-4e1f-b68d-df2070f67e9d/.system_generated/steps/21635/content.md';
const text = fs.readFileSync(contentPath, 'utf8');

// The file has very long lines. We can try to regex search for string of a, b, c.
const words = text.match(/[abc]{1000,}/g);

if (words) {
    console.log(`Found ${words.length} long words.`);
    let lengths = words.map(w => w.length);
    console.log("Lengths:", lengths);
    
    // Find the 3268 length word
    let word3268 = words.find(w => w.length === 3268);
    if (word3268) {
        if(!fs.existsSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline")) {
            fs.mkdirSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline", {recursive: true});
        }
        fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/aa2fr3268.txt", word3268);
        console.log("Saved aa2fr3268.txt");
    } else {
        console.log("Could not find word of length 3268.");
        // Just save the longest one that is <= 4000
        let target = words.find(w => w.length >= 3000 && w.length <= 4000);
        if(target) {
            console.log("Saving word of length", target.length);
            fs.writeFileSync("C:/abc-worktrees/profile-response-baseline-h2-h7-2026-08-25/scratch/unified-pipeline/target_word.txt", target);
        }
    }
} else {
    console.log("No long words found.");
}
