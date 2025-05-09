import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

/**
 * Generate a PDF file from the investor brief HTML template
 */
export async function generateInvestorBriefPDF() {
  try {
    console.log('Starting PDF generation process...');
    
    // Paths
    const rootDir = process.cwd();
    const templatePath = path.join(rootDir, 'client', 'public', 'investor-brief-template.html');
    const outputPath = path.join(rootDir, 'client', 'public', 'patang-omniverse-investor-brief.pdf');
    
    // Check if the template exists
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found at ${templatePath}`);
    }
    
    console.log('Template found, launching puppeteer...');
    
    // Launch a new browser instance
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Read the HTML template
    const htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Set the page content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });
    
    console.log('Page loaded, generating PDF...');
    
    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    console.log('PDF generation complete, closing browser...');
    
    // Close the browser
    await browser.close();
    
    console.log(`PDF successfully generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

// For direct execution
// Since we're using ES modules, we can't use require.main === module
// Instead, we'll expose the function for use by the server
export default generateInvestorBriefPDF;