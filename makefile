# 相关脚本
PM2_CONF = ./pm2.config.js

deploy:
	node bin/deploy-dev.js

clear:
	node bin/clear-dev.js

force-deploy:
	node bin/clear-dev.js
	node bin/deploy-dev.js

dev:
	npm install
	pm2 startOrReload ${PM2_CONF} \
		--only proxy \
		--update-env
