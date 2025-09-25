# GIT JUGAAD SCRIPT - CredLo Resume Booster
# Range: July 2025 - Oct 2025

$startDate = Get-Date -Date "2025-07-01"
$endDate = Get-Date -Date "2025-10-31"
$currentDate = $startDate

# Messages to make it look real
$messages = @(
    "Update UI components",
    "Fix backend validation bug",
    "Refactor api routes",
    "Optimize database queries",
    "Update README",
    "WIP: Dashboard improvements",
    "Fix CSS responsiveness",
    "Add unit tests",
    "Clean up code",
    "Update dependencies",
    "Feature: Add AI integration",
    "Fix login token issue"
)

Write-Host "🚀 Starting Git History Injection (July 2025 - Oct 2025)..." -ForegroundColor Cyan

# Ensure dummy file exists
if (-not (Test-Path ".history_log")) {
    New-Item -Path ".history_log" -ItemType File
}

while ($currentDate -le $endDate) {
    # 85% chance to work on any given day (Very hardworking Dev!)
    $shouldCommit = (Get-Random -Minimum 0 -Maximum 100) -lt 85 
    
    # Weekends (Sat/Sun) might be lighter? Let's keep it heavy to impress.
    
    if ($shouldCommit) {
        # Random number of commits per day (1 to 12)
        # Occasional "Crunch Mode" (12-20 commits)
        $isCrunch = (Get-Random -Minimum 0 -Maximum 100) -lt 10
        $maxCommits = if ($isCrunch) { 20 } else { 8 }
        $numCommits = Get-Random -Minimum 1 -Maximum $maxCommits
        
        Write-Host "📅 processing $currentDate ... ($numCommits commits)" -ForegroundColor Green

        for ($i = 0; $i -lt $numCommits; $i++) {
            # Randomize time (9 AM to 2 AM next day)
            $hour = Get-Random -Minimum 9 -Maximum 23
            $minute = Get-Random -Minimum 0 -Maximum 59
            $second = Get-Random -Minimum 0 -Maximum 59
            
            $commitDate = $currentDate.Date.AddHours($hour).AddMinutes($minute).AddSeconds($second)
            $dateStr = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
            
            # 1. Modify file
            Add-Content -Path ".history_log" -Value "Commit log: $dateStr"
            
            # 2. Stage
            git add .history_log
            
            # 3. Commit with PAST DATE
            $env:GIT_AUTHOR_DATE = $dateStr
            $env:GIT_COMMITTER_DATE = $dateStr
            
            $msg = $messages | Get-Random
            git commit -m "$msg" --quiet
        }
    } else {
        Write-Host "💤 Skipping $currentDate" -ForegroundColor Gray
    }
    
    $currentDate = $currentDate.AddDays(1)
}

# Clean up env variables
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host "✅ Jugaad Complete! History from July 2025 to Oct 2025 created." -ForegroundColor Yellow
Write-Host "👉 Now run: 'git push origin main' (or force push if needed)" -ForegroundColor Cyan
