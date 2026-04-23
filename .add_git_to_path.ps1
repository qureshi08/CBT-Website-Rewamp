# This script adds the Git bin directory to your User PATH environment variable
$gitPath = "D:\SWs\Git\bin"

# Get the current User PATH
$oldPath = [Environment]::GetEnvironmentVariable("Path", "User")

# Check if it's already there
if ($oldPath -like "*$gitPath*") {
    Write-Host "Git path is already in your environment variables."
} else {
    # Add to path
    $newPath = "$oldPath;$gitPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "Successfully added $gitPath to your User PATH."
    Write-Host "Please RESTART your terminal/IDE for changes to take effect."
}

# Also verify the file exists
if (Test-Path "$gitPath\git.exe") {
    Write-Host "Verified: git.exe found at $gitPath\git.exe"
} else {
    Write-Warning "Caution: git.exe was NOT found at $gitPath\git.exe. Please double-check the path."
}
