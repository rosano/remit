# Remit

Single-file Node.js app that receives requests for multiple domains and maps them to folders under any public URL.

First, set `REMIT_BASE` to a URL in `.env`, maybe something like:

```bash
REMIT_BASE="https://example.com/folder_with_websites/"
```

Then Remit will map `alfa.com/bravo` to `https://example.com/folder_with_websites/alfa.com/bravo`.

---

Dockerfiles are for [easy](https://easyindie.app) deployment to [Cloudron](cloudron.io) and [Caprover](https://caprover.com).

---

Note: I somehow remade this project [a year before](https://github.com/rosano/remit-2024/) without realizing, but that one is more complicated and copies headers.
