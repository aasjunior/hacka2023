from models.db_config import DBConnect
from bson import ObjectId

class Usuario():
    def __init__(self):
        super().__init__('usuario')

    def get_by_id(self, id):
        return self.collection.find_one({
            '_id': ObjectId(id)
        })