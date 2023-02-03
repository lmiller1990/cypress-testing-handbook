git checkout gh-pages
yarn docs:build
rm -rf docs
mv docs/.vitepress/dist/ docs
git add -A
git commit -m "deploy"
git push
git checkout main
