# SMART JUGAAD - CredLo "Green Graph" Generator
# Period: July 1, 2025 to Oct 31, 2025

$startDate = Get-Date -Date "2025-07-05"
$endDate = Get-Date -Date "2025-10-31"
$workLogFile = "development_log.md"

# 1. Reset Git
if (Test-Path ".git") {
    Write-Host "🗑️  Deleting existing .git folder..." -ForegroundColor Red
    Remove-Item -Path ".git" -Recurse -Force
}
git init
git config user.email "youremail@example.com" # Change if needed or relies on global
git config user.name "Your Name"

# 2. Get all files (excluding script and .git)
$allFiles = Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notmatch "\\.git\\" -and 
    $_.Name -ne "smart_jugaad.ps1" -and 
    $_.Name -ne "git_jugaad.ps1" -and
    $_.Name -ne $workLogFile
}

# Shuffle files to simulate random development order
$fileQueue = $allFiles | Sort-Object { Get-Random }
$queueIndex = 0
$totalFiles = $fileQueue.Count

# Create log file
New-Item -Path $workLogFile -ItemType File -Force | Out-Null

$currentDate = $startDate

Write-Host "🚀 Starting Time Travel (Jul-Oct 2025)..." -ForegroundColor Cyan

while ($currentDate -le $endDate) {
    # 90% chance to work on a day
    if ((Get-Random -Min 0 -Max 100) -lt 90) {
        
        # Determine intensity: Normal (1-4 commits) or HEAVY (10-20 commits)
        $isHeavy = (Get-Random -Min 0 -Max 100) -lt 15 # 15% chance of heavy day
        $commitsToday = if ($isHeavy) { Get-Random -Min 10 -Max 22 } else { Get-Random -Min 2 -Max 5 }

        # Visual feedback
        $color = if ($isHeavy) { "Green" } else { "Gray" }
        Write-Host "📅 $currentDate ($commitsToday commits)" -ForegroundColor $color

        for ($i = 0; $i -lt $commitsToday; $i++) {
            # Set Commit Time (Random work hours 10 AM - 2 AM)
            $hour = Get-Random -Min 10 -Max 26
            if ($hour -ge 24) { $hour -= 24 } # Handle late night
            $commitDate = $currentDate.Date.AddHours($hour).AddMinutes((Get-Random -Min 0 -Max 59))
            $dateStr = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")

            # Set Env Vars for Git
            $env:GIT_AUTHOR_DATE = $dateStr
            $env:GIT_COMMITTER_DATE = $dateStr

            # DECIDE: Commit a Real File or a Log Update?
            # We want to ensure all real files are committed by Oct 31.
            
            $commitRealFile = $false
            if ($queueIndex -lt $totalFiles) {
                # If we have files left, 40% chance to commit one
                if ((Get-Random -Min 0 -Max 100) -lt 40) {
                    $commitRealFile = $true
                }
            } else {
                # All files committed, just maintenance logs now
                $commitRealFile = $false
            }

            if ($commitRealFile) {
                # Commit a REAL file
                $file = $fileQueue[$queueIndex]
                $relPath = $file.FullName.Replace($PWD.Path + "\", "")
                
                git add "$relPath"
                $msg = "Feat: Add $($file.Name) implementation"
                git commit -m "$msg" --quiet --allow-empty
                
                $queueIndex++
            } else {
                # filler commit (Green Graph Booster)
                # Modify the log file
                $logMsg = "Updates :: $dateStr - Refactoring core logic"
                Add-Content -Path $workLogFile -Value $logMsg
                git add $workLogFile
                
                $msgs = @("Refactor code", "Optimize performance", "Fix linting errors", "Update build config", "Documentation updates", "Bug fix in controller", "UI adjustments", "Clean up")
                $msg = $msgs | Get-Random
                git commit -m "$msg" --quiet
            }
        }
    }
    $currentDate = $currentDate.AddDays(1)
}

# 3. Final Cleanup on last day
$finalDate = $endDate.ToString("yyyy-MM-dd 23:59:59")
$env:GIT_AUTHOR_DATE = $finalDate
$env:GIT_COMMITTER_DATE = $finalDate

# Ensure ALL remaining files are added (if any skipped)
git add .
git commit -m "chore: Final project cleanup and release" --quiet

# Remove the temporary log file for clean history structure
# But we keep it in git history (it will show as deleted in latest)
git rm $workLogFile
git commit -m "chore: Remove dev logs" --quiet

# Clean Env
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host "✅ History Generated!" -ForegroundColor Yellow
Write-Host "Run: 'git remote add origin <URL>' and 'git push -f origin master'"
