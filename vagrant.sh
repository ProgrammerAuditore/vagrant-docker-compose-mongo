# Este es un script para Vagranfile
# vagrant provision
echo "[...] Provision iniciando [...]"
sudo rm -rf ~/data
sudo mkdir ~/data
cd /home/vagrant/workspace
ls -lsa
docker-compose stop
docker-compose rm --force
docker-compose build
docker-compose up -d
echo "[...] Provision finalizado exitosamente ! [...]"