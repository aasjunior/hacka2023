from models.db_config import DBConnect
from bson import ObjectId

class Funcionario(DBConnect):
    def __init__(self):
        super().__init__('funcionario')
    
    def get_by_id(self, id):
        return self.collection.find_one({
            '_id': ObjectId(id)
        })