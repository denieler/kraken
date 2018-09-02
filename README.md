# Kraken test

There are 2 parts of the project:

```
./font-end
./back-end
```

### To run ./back-end

The back end part is a decorated Symfony 4 sample project. As DB it's using SqlLite inside.

Use `composer` to install dependencies:

```
cd ./back-end
php ./composer.phar install
```

Then setup DB and migrations:

```
php bin/console doctrine:migrations:migrate
```

The app uses folder `/var/tmp/kraken_files` to upload files. So please create the folder and give permissions:

```
mkdir /var/tmp/kraken_files
chmod 755 /var/tmp/kraken_files
```

Then to run server on `http://localhost:8000`, run:

```
php -S 127.0.0.1:8000 -t public
```

### To run ./front-end

It's just usual `create-react-app` project. So to start it run:

```
cd ./front-end
yarn
yarn start
```

Inside it has url to API, which is hardcoded to `http://localhost:8000` in `./front-end/src/app/constants/api.js`. So if you will use another port or url, please configure it there.

Open `http://localhost:3000/`
Enjoy!
