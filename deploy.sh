git branch -D gh-pages
git checkout -b gh-pages
yarn docs:build
mv docs/.vitepress/dist/ temp
rm -rf docs
mv temp docs
git add -A
git commit -m "deploy"
git push --set-upstream origin gh-pages -f
git checkout main
