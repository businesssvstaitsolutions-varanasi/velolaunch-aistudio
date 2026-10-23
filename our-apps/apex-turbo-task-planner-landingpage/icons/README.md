# Icon Placeholder Notice

This directory contains the icons for the Beautiful To-Do Manager extension.

## Current Status
The extension currently uses placeholder icon files. To get the best visual experience:

## Creating Proper Icons

### Option 1: Use Online SVG to PNG Converter
1. Take the `icon.svg` file in this directory
2. Upload it to an online converter like:
   - https://convertio.co/svg-png/
   - https://cloudconvert.com/svg-to-png
3. Convert to three sizes: 16x16, 48x48, and 128x128 pixels
4. Save as `icon16.png`, `icon48.png`, and `icon128.png`

### Option 2: Use Design Software
1. Open the SVG in Adobe Illustrator, Inkscape, or Figma
2. Export as PNG in the required sizes
3. Save with the correct filenames

### Option 3: Use Command Line (if you have ImageMagick)
```bash
magick icon.svg -resize 16x16 icon16.png
magick icon.svg -resize 48x48 icon48.png
magick icon.svg -resize 128x128 icon128.png
```

## Icon Design
The icon features:
- Beautiful gradient background (blue to purple)
- Checkmark symbol representing task completion
- Decorative dots and lines suggesting a to-do list
- Modern, clean design that matches the extension's aesthetic

## File Requirements
- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

All icons should be PNG format with transparent backgrounds where appropriate.
