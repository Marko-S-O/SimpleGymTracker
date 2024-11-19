$clientDir = "C:\Users\ext\SimpleGymTracker\gym-tracker-app"
$serverDir = "C:\Users\ext\SimpleGymTracker\gym-tracker-server"
$distDir = "$clientDir\dist"

# Build the app
Write-Output "Building gym-tracker-app..."
Set-Location $clientDir
npx expo export --platform web
if ($LASTEXITCODE -ne 0) {
    Write-Error "Client build failed. Exiting."
    exit $LASTEXITCODE
}

# Copy the dist directory to the server

Write-Output "Copying dist directory to the server..."
Remove-Item -Path $serverDir\dist -Recurse
Copy-Item $distDir -Destination $serverDir -Recurse -Force
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to copy dist directory to the server. Exiting."
    exit $LASTEXITCODE
}

# Deploy to fly.io
Write-Output "Deploying to fly.io..."
Set-Location $serverDir
fly deploy
if ($LASTEXITCODE -ne 0) {
    Write-Error "Render deployment failed. Exiting."
    exit $LASTEXITCODE
}

# Build Android App with EAS
Write-Output "Building the Android app with EAS..."
Set-Location $clientDir
eas build -p android --profile production
if ($LASTEXITCODE -ne 0) {
    Write-Error "EAS Android build failed. Exiting."
    exit $LASTEXITCODE
}

Write-Output "Deployment process completed successfully!"