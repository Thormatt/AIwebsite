// Simple QA test script for the AI Advisory website
// Run with: node qa-test.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting QA Review of AI Advisory Website\n');

// Configuration
const sitePath = '/Users/thormatthiasson/Documents/GitHub/AIwebsite';
const htmlFiles = [
    'index.html',
    'thinking.html',
    'services.html',
    'framework.html',
    'tools.html',
    'portfolio.html',
    'discovery-assessment.html',
    'fractional-advisor.html'
];

const toolFiles = [
    'tools/ai-assessment.html',
    'tools/bs-detector.html',
    'tools/roi-calculator.html',
    'tools/build-vs-buy.html'
];

let issues = [];
let warnings = [];
let successes = [];

// Test 1: Check if all main HTML files exist
console.log('📁 Test 1: Checking file existence...');
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        successes.push(`✓ ${file} exists`);
    } else {
        issues.push(`✗ Missing file: ${file}`);
    }
});

// Test 2: Check tool files
console.log('\n📁 Test 2: Checking tool files...');
toolFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        successes.push(`✓ ${file} exists`);
    } else {
        issues.push(`✗ Missing tool file: ${file}`);
    }
});

// Test 3: Check for consistent navigation across pages
console.log('\n🧭 Test 3: Checking navigation consistency...');
const expectedNavItems = ['Thinking', 'Advisory', 'Framework', 'Tools', 'Portfolio', 'Contact'];
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        expectedNavItems.forEach(item => {
            if (!content.includes(`>${item}</a>`) && item !== 'Contact') {
                warnings.push(`⚠ ${file}: Missing nav item "${item}"`);
            }
        });
    }
});

// Test 4: Check for broken internal links
console.log('\n🔗 Test 4: Checking internal links...');
const linkPattern = /href="([^"#]+\.html)"/g;
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        let match;
        while ((match = linkPattern.exec(content)) !== null) {
            const linkedFile = match[1];
            if (!linkedFile.startsWith('http') && !linkedFile.startsWith('articles/')) {
                const linkedPath = path.join(sitePath, linkedFile);
                if (!fs.existsSync(linkedPath)) {
                    issues.push(`✗ ${file}: Broken link to "${linkedFile}"`);
                }
            }
        }
    }
});

// Test 5: Check for required meta tags
console.log('\n🏷️ Test 5: Checking meta tags...');
const requiredMeta = ['viewport', 'description'];
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        requiredMeta.forEach(meta => {
            if (!content.includes(`name="${meta}"`)) {
                warnings.push(`⚠ ${file}: Missing meta tag "${meta}"`);
            }
        });
    }
});

// Test 6: Check for accessibility basics
console.log('\n♿ Test 6: Checking accessibility...');
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');

        // Check for alt attributes on images
        const imgPattern = /<img[^>]+>/g;
        let imgMatch;
        while ((imgMatch = imgPattern.exec(content)) !== null) {
            if (!imgMatch[0].includes('alt=')) {
                warnings.push(`⚠ ${file}: Image missing alt attribute`);
            }
        }

        // Check for form labels
        if (content.includes('<input') && !content.includes('<label')) {
            warnings.push(`⚠ ${file}: Form inputs may be missing labels`);
        }
    }
});

// Test 7: Check for duplicate IDs
console.log('\n🆔 Test 7: Checking for duplicate IDs...');
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const idPattern = /id="([^"]+)"/g;
        const ids = {};
        let idMatch;
        while ((idMatch = idPattern.exec(content)) !== null) {
            const id = idMatch[1];
            if (ids[id]) {
                issues.push(`✗ ${file}: Duplicate ID "${id}"`);
            }
            ids[id] = true;
        }
    }
});

// Test 8: Check CSS and JS references
console.log('\n📦 Test 8: Checking resource references...');
const requiredResources = ['styles.css', 'script.js'];
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        requiredResources.forEach(resource => {
            if (!content.includes(resource)) {
                warnings.push(`⚠ ${file}: Missing reference to "${resource}"`);
            }
        });
    }
});

// Test 9: Check for console.log statements
console.log('\n🐛 Test 9: Checking for debug code...');
const jsFiles = ['script.js'];
jsFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('console.log')) {
            warnings.push(`⚠ ${file}: Contains console.log statements`);
        }
    }
});

// Test 10: Check for mobile viewport
console.log('\n📱 Test 10: Checking mobile readiness...');
htmlFiles.forEach(file => {
    const fullPath = path.join(sitePath, file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (!content.includes('viewport') || !content.includes('width=device-width')) {
            issues.push(`✗ ${file}: Missing proper viewport meta tag for mobile`);
        }
    }
});

// Generate Report
console.log('\n' + '='.repeat(60));
console.log('📊 QA TEST RESULTS SUMMARY');
console.log('='.repeat(60));

console.log(`\n✅ PASSED: ${successes.length} checks`);
if (successes.length > 0 && successes.length <= 10) {
    successes.forEach(s => console.log(`  ${s}`));
}

if (issues.length > 0) {
    console.log(`\n❌ CRITICAL ISSUES: ${issues.length}`);
    issues.forEach(issue => console.log(`  ${issue}`));
} else {
    console.log('\n✨ No critical issues found!');
}

if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS: ${warnings.length}`);
    warnings.forEach(warning => console.log(`  ${warning}`));
}

console.log('\n' + '='.repeat(60));
console.log('📈 OVERALL SCORE:');
const totalChecks = successes.length + issues.length + warnings.length;
const score = Math.round((successes.length / totalChecks) * 100);
console.log(`  ${score}% (${successes.length}/${totalChecks} checks passed)`);

if (issues.length === 0) {
    console.log('\n🎉 Site passes basic QA! Ready for deployment.');
} else {
    console.log('\n⚠️  Please fix critical issues before deployment.');
}

console.log('\n✨ QA Review Complete!\n');