npx jetify
cd android
./gradlew assembleDebug
cp app/build/outputs/apk/debug/app-debug.apk ../mini-debug.apk
cd ..
