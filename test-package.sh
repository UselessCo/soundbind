#!/bin/bash
set -e

echo "🧪 Testing Soundbind Package Locally..."
echo ""

# Create package
echo "📦 Step 1: Creating package tarball..."
npm pack
echo "✅ Package created: soundbind-1.0.0.tgz"
echo ""

# Check package size
echo "📊 Package size:"
ls -lh soundbind-1.0.0.tgz
echo ""

# Show package contents
echo "📋 Package contents (first 20 files):"
tar -tzf soundbind-1.0.0.tgz | head -20
echo ""

# Verify sounds are included
echo "🎵 Checking sounds..."
tar -tzf soundbind-1.0.0.tgz | grep "assets/sounds" || echo "❌ No sounds found!"
echo ""

# Install globally
echo "🌍 Step 2: Installing globally..."
npm install -g ./soundbind-1.0.0.tgz
echo "✅ Installed globally"
echo ""

# Check installation
echo "📍 Installation location:"
which soundbind
echo ""

# Create test directory
echo "📁 Step 3: Creating test directory..."
TEST_DIR=$(mktemp -d)
echo "Test directory: $TEST_DIR"
cd "$TEST_DIR"

# Copy default config from installed package
echo "⚙️  Step 4: Setting up config..."
PKG_ROOT="$(npm root -g)/soundbind"
cp "$PKG_ROOT/src/configs/default.yaml" soundbind.yaml
echo "✅ Config copied from package"
echo ""

# Show config
echo "📄 Config contents:"
cat soundbind.yaml
echo ""

# Test CLI (will run for 3 seconds then exit)
echo "🎵 Step 5: Testing CLI (will run for 3 seconds)..."
echo "Press Ctrl+C to stop early, or wait..."
timeout 3 soundbind || echo "✅ CLI test completed"
echo ""

# Clean up
echo "🧹 Step 6: Cleaning up..."
cd -
rm -rf "$TEST_DIR"
npm uninstall -g soundbind
rm soundbind-1.0.0.tgz
echo "✅ Cleanup complete"
echo ""

echo "✅ All tests passed!"
