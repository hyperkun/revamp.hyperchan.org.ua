server {
        listen 80;
        listen [::]:80;

        root /home/user/revamp;
        index index.html index.htm;

        server_name revamp.hyperchan.org.ua;

        client_max_body_size 20M;

        location / {
                fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_index index.php;
                include fastcgi_params;
                fastcgi_param SCRIPT_FILENAME $document_root/index.php;
        }

        location /res/ {
                alias /home/user/revamp/res/;
                charset utf-8;
        }
}
