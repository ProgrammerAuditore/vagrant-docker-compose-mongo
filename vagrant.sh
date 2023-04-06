# Este es un script para Vagranfile
# vagrant provision
echo "[...] Provision iniciando [...]"
sudo rm -rf /home/vagran/data
sudo mkdir -p /home/vagran/data
cd /home/vagrant/workspace
ls -lsa
docker-compose stop
docker-compose rm --force
docker-compose build --no-cache
docker-compose up -d
echo "[...] Provision finalizado exitosamente ! [...]"