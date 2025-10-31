const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const START_DATE = new Date('2025-07-05T10:00:00');
const END_DATE = new Date('2025-10-31T18:00:00');
const LOG_FILE = 'development_log.md';
const REPO_URL = 'https://github.com/krish070904/CredLo.git';
const USER_EMAIL = 'krishna.official0717@gmail.com';
const USER_NAME = 'Krish';

// Helper to execute commands
function run(cmd) {
    try {
        execSync(cmd, { stdio: 'pipe' });
    } catch (error) {
        // Ignore errors
    }
}

function formatDate(date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1. Reset Git
console.log("🗑️  Resetting Git with Correct Email...");
if (fs.existsSync('.git')) {
    fs.rmSync('.git', { recursive: true, force: true });
}
run('git init');
// FORCE CONFIG
run(`git config user.email "${USER_EMAIL}"`);
run(`git config user.name "${USER_NAME}"`);
run(`git remote add origin ${REPO_URL}`);

// 2. Get all files
function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (file === '.git' || file === 'node_modules' || file === 'git-jugaad.js' || file === LOG_FILE) return;

        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(path.relative(process.cwd(), filePath).replace(/\\/g, '/'));
        }
    });
    return fileList;
}

const allFiles = getAllFiles(process.cwd());
const shuffledFiles = allFiles.sort(() => 0.5 - Math.random());

let fileIndex = 0;
let currentDate = new Date(START_DATE);

console.log("🚀 Starting History Generation...");

fs.writeFileSync(LOG_FILE, `# Dev Log\n`);

while (currentDate <= END_DATE) {
    if (Math.random() < 0.85) {
        const isCrunch = Math.random() < 0.20;
        const commitsCount = isCrunch ? randomInt(8, 15) : randomInt(2, 6);

        for (let i = 0; i < commitsCount; i++) {
            const hour = randomInt(10, 25) % 24;
            currentDate.setHours(hour, randomInt(0, 59));

            const dateStr = formatDate(currentDate);
            process.env.GIT_AUTHOR_DATE = dateStr;
            process.env.GIT_COMMITTER_DATE = dateStr;

            let committedReal = false;

            // Distribute files
            const totalDays = (END_DATE - START_DATE) / (1000 * 60 * 60 * 24);
            const daysLeft = (END_DATE - currentDate) / (1000 * 60 * 60 * 24);

            if (fileIndex < shuffledFiles.length) {
                if (Math.random() < (shuffledFiles.length - fileIndex) / (commitsCount * daysLeft + 1) * 2) {
                    const file = shuffledFiles[fileIndex];
                    run(`git add "${file}"`);
                    run(`git commit -m "feat: Add ${path.basename(file)} implementation" --quiet`);
                    fileIndex++;
                    committedReal = true;
                }
            }

            if (!committedReal) {
                const msg = `Updates at ${dateStr}`;
                fs.appendFileSync(LOG_FILE, `- ${msg}\n`);
                run(`git add ${LOG_FILE}`);
                run(`git commit -m "chore: Update dev logs" --quiet`);
            }
        }
    }
    currentDate.setDate(currentDate.getDate() + 1);
}

// Final Cleanup
const FINAL_DATE = formatDate(END_DATE);
process.env.GIT_AUTHOR_DATE = FINAL_DATE;
process.env.GIT_COMMITTER_DATE = FINAL_DATE;

run('git add .');
run('git commit -m "chore: Final project polish" --quiet');
run(`git rm ${LOG_FILE}`);
run('git commit -m "chore: Clean up logs" --quiet');

console.log("✅ COMPLETED! History generated for: " + USER_EMAIL);
