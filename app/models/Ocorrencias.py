from models.db_config import DBConnect
from bson import ObjectId

class Ocorrencias(DBConnect):
    def __init__(self):
        super().__init__('Ocurrency')
    
    def get_all(self):
        return self.collection.find()

    def get_by_id(self, id):
        return self.collection.find_one({
            '_id': ObjectId(id)
        })