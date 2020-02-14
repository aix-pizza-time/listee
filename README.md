# Listee

This is a primitive shopping list used for collecting wishes and contributions for Pizza Time. It currently is the only available service under 
<https://pizza.bartolomey.me/> and is a frontend without any authentication or user management.

The RESTful backend currently uses a file-based storage for items on the list. **This is to be changed in the next major version to be a standard redis-cache 
database backend** to resist against reboots and failures. 

## Building & Deploying

Build both Docker images in `/client` and `/server`. Deploy them using the same ingress, i.e. the backend is available under the same hostname as the frontend. This can elegantly be done using Kubernetes, e.g. 
```YAML
apiVersion: v1
kind: Service
metadata:
  namespace: $NAMESPACE
  name: listee-backend
spec:
  selector:
    app: listee-backend-deployment
  ports:
  - port: 7002
    targetPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  namespace: $NAMESPACE
  name: listee-frontend
spec:
  selector:
    app: listee-frontend-deployment
  ports:
  - port: 7003
    targetPort: 80
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: $RESOURCE_NAME
  namespace: $NAMESPACE
  annotations:
    ...
spec:
  tls: 
  - hosts:
    - $HOSTNAME
    secretName: ...
  rules:
  - host: $HOSTNAME
    http:
      paths:
      - path: /
        backend:
          serviceName: listee-frontend
          servicePort: 80
      - path: /api
        backend:
          serviceName: listee-backend
          servicePort: 3000
```
for two deployments of both images, `listee-frontend-deployment` and `listee-backend-deployment`.

## Roadmap

# v1.1

- [] Add redis backend instead of file-based storage
- [] Add user authentication using JWT from `$HOSTNAME/auth`
- [] Redesign frontend to adopt some colors rather than grey and white

# v2.0

- [] Integrate price interpolation based on scanned receipts (s. other projects)
- [] Refactor API
- [] Integrate into Service Discovery