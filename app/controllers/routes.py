from flask import Flask, render_template, request, redirect, url_for, session, send_file, jsonify, json
from .utils.components import *

def init_app(app):
    @app.route("/")
    def index():
        return render_template("dashboard.html", **components)
    
    