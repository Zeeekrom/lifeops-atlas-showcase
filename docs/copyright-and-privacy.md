# Copyright and privacy release / 版权与隐私发布

Prepared 13 November 2026. AI-assisted draft; legal and English review remain pending.

Published with the owner's explicit approval on 13 November 2026. Bilingual
terms and footer are live. The effective hostname-root policy is now served
at https://zeeekrom.github.io/robots.txt from the separate minimal repository
https://github.com/Zeeekrom/zeeekrom.github.io (reviewed release `b77a1c7`).
It disallows the named AI crawlers only under `/lifeops-atlas-showcase/` and
leaves ordinary search engines and other project paths allowed. No DNS or
production data changes were made. Root policy tests run before deployment.
The configuration candidates below remain templates rather than served files.

- Project-original work: all rights reserved, with statutory exceptions and
  third-party licence rights preserved. See `LICENSE` and the bilingual `/terms/`.
- Existing public main history had no open-source reuse grant at review.
- No personal or production data has been copied into this release.
- Soundtrack permission/provenance remains unverified. Its ownership is not claimed.
- Pages workflow publishes changes under `demo/**` after a push to `main`.
  Obtain the owner's release approval before that push; local preparation is not release approval.

## Crawler deployment boundary

The current site is a project Pages URL under `/lifeops-atlas-showcase/`.
Robots rules are read from the hostname root, not that project subdirectory.
`deployment/robots.github-pages-root.txt` is a scoped candidate for the hostname
root; `robots.production.txt` is for a future dedicated hostname; `robots.preview.txt`
blocks a preview hostname. These are prepared configuration, not active controls.
Do not create another repository, change DNS or deploy a root site without approval.
Search engines stay allowed on the formal showcase; listed AI bots are disallowed.

当前 GitHub Pages 是项目子路径。爬虫会读取域名根目录的 `/robots.txt`，不会把项目目录
中的同名文件当作全站规则。部署目录里的文件是待发布配置，不是已经生效的保护。
修改域名根站、创建其他仓库或更改 DNS 需要另行确认。正式展示允许搜索引擎，只限制列出
的 AI 爬虫；预览域名禁止全部爬虫。规则不是访问控制，也不能保证阻止复制。

References:
- https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
