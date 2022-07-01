import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfMakerService {
  async generate(templatePath: string, outputPath: string, data: any) {
    // read template file
    const hbs = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    // handlebar create template function
    const template = handlebars.compile(hbs);
    // render template
    const content = template(data);

    // create using puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content);
    await page.emulateMediaType('print');
    await page.pdf({ path: outputPath, format: 'a4', printBackground: true });
    await browser.close();

    // return output file path
    return outputPath;
  }
}
