from flask import Flask, render_template, request, redirect, url_for, session, send_file, jsonify, json
from .utils.components import *
from .utils.helpers import *
from pymongo import MongoClient

def init_app(app):
    @app.route("/")
    def index():
        client = MongoClient(f'mongodb://localhost:27017/dbHacka')
        print(f'CLIENTE: {client}')
        db = client.get_default_database()
        print(f'DB: {db}')
        mensal = consultar_ocorrencias_mensal(db)
        print(f'\n\nMENSAL TAXA OCORRENCIAS: {mensal}\n\n')
        
        return render_template("dashboard.html", **components, mensal=mensal)
    
    