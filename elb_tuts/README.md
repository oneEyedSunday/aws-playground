Lab setup can be found [here](https://github.com/benpiper/aws-powershell/blob/master/elb/README.md)

## VPC
- Create via console
- Edit, then enable DNS Hostnames

### Subnets
- Create via console

### Route Tables

## Security Groups
- DB
- Web

## EC2 Instances
- 3 web instances
- 3 app instances
- 1 db instance

## Launch web instances
```sh
docker run -d -p 80:80 -p 443:443  -h web${instance_id} benpiper/mtwa:web
```

## Fix docker perm issues
```sh
sudo usermod -aG docker ${USER} && su -s ${USER}

# Optionally
# just reconnect since we may not want to set up an ec2-user root password
su -s ${USER}

```

More general instructions [here](https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket)


### Public IPs
- Only 5 available per account
- Just ssh from one of the web instances


-e APPSERVER=http://internal-app-lb-364423273.us-east-1.elb.amazonaws.com:8080 benpiper/mtwa:web