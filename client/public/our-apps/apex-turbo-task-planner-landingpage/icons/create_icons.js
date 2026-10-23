// Icon Generator Script for Beautiful To-Do Manager
// This script creates simple SVG-based icons for the extension

const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Draw background circle with gradient
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw checkmark icon
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size * 0.08;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw checkmark
    const centerX = size / 2;
    const centerY = size / 2;
    const checkSize = size * 0.3;
    
    ctx.beginPath();
    ctx.moveTo(centerX - checkSize/2, centerY);
    ctx.lineTo(centerX - checkSize/6, centerY + checkSize/3);
    ctx.lineTo(centerX + checkSize/2, centerY - checkSize/3);
    ctx.stroke();
    
    // Add small dots for decoration
    ctx.fillStyle = '#ffffff';
    const dotSize = size * 0.03;
    
    // Top dot
    ctx.beginPath();
    ctx.arc(centerX, centerY - checkSize, dotSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Bottom left dot
    ctx.beginPath();
    ctx.arc(centerX - checkSize, centerY + checkSize/2, dotSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Bottom right dot
    ctx.beginPath();
    ctx.arc(centerX + checkSize, centerY + checkSize/2, dotSize, 0, 2 * Math.PI);
    ctx.fill();
    
    return canvas.toBuffer('image/png');
}

// Note: This script requires the 'canvas' npm package to run
// For the extension, we'll create simple placeholder images
console.log('Icon generator script created. To generate actual icons, install canvas package and run this script.');

module.exports = { createIcon };
