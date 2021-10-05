echo "Creating skin-and-body (sab) database users..."
sleep 5

mongo "db = db.getSiblingDB('mpp');\
db.createRole({ \
  role: 'sabApiRole', \
  privledges: [{ \
    resource: { \
      db: 'sabdb', \
      collection: 'items' \
    }, \
    actions: [ 'find', 'insert', 'remove', 'update' ] }], \
}); \
db.createUser({ user: 'sabApiUser', pwd: '', roles: [{ role: 'sabApiRole', db: 'sabdb'}] });"

echo "User created"