[![DeepScan grade](https://deepscan.io/api/projects/3089/branches/24981/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=3089&bid=24981)

# favurl-help

Application where user can store and organize
his favorite URLs.

It have three pages:
• Home page
• Add URL page
• Broken URLs page

### Installing
```
cd favurl-help
npm install
npm start
```

### Troubleshoting

Testing it locally you might need to add Google Extension to get right Broken links results.
Otherwise it is going to return all links as broken.
The reason is:

```
Allow-Control-Allow-Origin: *
```