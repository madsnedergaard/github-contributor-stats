# GitHub Contributor Stats

Get the **actual** amount of people who have contributed to a GitHub repository - not just the people who have committed code.

![Screenshot of the app](./screenshot.png)

_Hack day project at [Electricity Maps](https://github.com/electricitymaps?type=source)_

The scraper saves data to JSON files for easy calculations, while the web app is just a fun way to visualise the numbers.

## Getting started

```bash
# 1. Set up
npm install

# 2. Update repo details in scraper.mjs

# 3. Run scraper
GITHUB_TOKEN=XXX node scraper.mjs

# 4. Run web app to see results
npm run dev
```
