git branch -D gh-pages
git checkout -b gh-pages
yarn docs:build
rm -rf docs
mv docs/.vitepress/dist/ docs
git add -A
git commit -m "deploy"
git push --set-upstream origin gh-pages
git checkout main
