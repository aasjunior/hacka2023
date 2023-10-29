from pymongo import MongoClient, errors

class DBConfig:
    @staticmethod
    def get_db_config():
        host = "localhost"
        port = "27017"
        db_name = "dbHacka"

        return host, port, db_name

class DBConnect:
    def __init__(self, collection_name):
        host, port, db_name = DBConfig.get_db_config()

        self.client = MongoClient(f'mongodb://{host}:{port}', serverSelectionTimeoutMS = 5000)

        try:
            self.client.server_info()
        except errors.ServerSelectionTimeoutError as err:
            raise Exception("Não foi possível estabelecer conexão com o MongoDB: ", err)
        
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]