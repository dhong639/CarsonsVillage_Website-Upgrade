Based on following tutorial: 
https://www.digitalocean.com/community/tutorials/nodejs-intro-stripe-payments

Required Dependencies: 
- express
- ejs
- stripe

Notes for EC2 Hosting: 
- Create security group inbound rule as following: 
  - CUSTOM TCP
  - Port 3000
  - 0.0.0.0/0 (IPv4)
  - ::/0 (IPv6)
