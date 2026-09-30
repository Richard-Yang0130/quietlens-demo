# QuietLens 静处 · 百度地图创作大赛 Demo

公开体验：https://richard-yang0130.github.io/quietlens-demo/

九城水彩界面、上海真实地点及步行路线回放、可追溯的评论解读。无需登录和定位。

本版本为静态交互演示：样本采集于2026-09-29，非实时查询，不调用在线AI。只包含公开演示文件，不包含主项目后台、密钥或用户位置。

## 运行

```sh
python3 -m http.server 4183
node check.mjs
```

GitHub Pages 从 main 分支根目录发布；`.nojekyll` 保留原生静态文件。资源使用相对路径，兼容项目子目录。

Banner：`quietlens-banner.png`，1200×675 PNG。

数据来源：百度 Place API、步行路线规划，以及官方 PlaceDetail 组件实际展示的评论样本。评论原文日期与采集日期分开记录；缺乏环境证据时不强行推荐。

Copyright © 2026 QuietLens. All rights reserved.
