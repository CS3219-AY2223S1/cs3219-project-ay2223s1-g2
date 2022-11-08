FROM mongo

COPY question.json /question.json
CMD mongoimport --host questionmongo:27019 --db test --collection questions --type json --file /question.json --jsonArray