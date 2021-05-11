set -e

VERSION=$(cat version | awk '{$1=$1;print}')
echo "publish version ${VERSION}"

git config --local user.name "wangshijun"
git config --local user.email "wangshijun2010@gmail.com"

echo "publishing to npm..."
make release
npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
echo "SKIP_PREFLIGHT_CHECK=true" > ./.env
npm run bundle
npm publish .blocklet/bundle

echo "publishing to staging blocklet registry"
blocklet config registry ${STAGING_REGISTRY}
blocklet publish --developer-sk ${ABTNODE_DEV_STAGING_SK}


NAME=$(cat package.json | grep name | head -n 1 |  awk '{print $2}' | sed 's/"//g' | sed 's/,//g')
curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"${NAME} v${VERSION} was successfully published to registry\"}" ${SLACK_WEBHOOK}