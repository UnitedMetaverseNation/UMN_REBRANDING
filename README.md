# Nation-HTML

aws-vault exec umn-prod -- aws s3 sync . s3://united-metaverse-nation.org
aws-vault exec umn-prod -- aws cloudfront create-invalidation --distribution-id E2OBPY6QH6PCB1 --paths "/*"
