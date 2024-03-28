# Remit

Single-file Node.js app that receives requests for multiple domains and maps them to static files. Just map your domain to a 'root' `index.html` file and it will handle the rest.

For example, here are three ways to turn a folder named `charlie` into a static site:

```javascript
{
  // GitHub repository
  "alfa.example.com": "https://raw.githubusercontent.com/bravo/charlie/main/index.html",

  // self-hosted Gitea repository
  "delta.example.com": "https://gitea.example.com/bravo/charlie/raw/branch/main/index.html",

  // FTP server
  "echo.example.com": "https://static.example/charlie/index.html",
}
```

To make this work with Remit, set the environment variable `REMIT_DOMAIN_MAP` to a JSON object:

```bash
REMIT_DOMAIN_MAP='{"alfa.example.com": "https://raw.githubusercontent.com/bravo/charlie/main/index.html","delta.example.com": "https://gitea.example.com/bravo/charlie/raw/branch/main/index.html","echo.example.com": "https://static.example/charlie/index.html"}'
```

---

Note: Remit will [copy most headers](https://github.com/rosano/remit/commit/c5a6a187507326d984a96d13de02130912944787) to the response.
