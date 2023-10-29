from flask import Flask
from controllers import routes
from controllers.utils import helpers

app = Flask(__name__, template_folder="views/templates", static_folder="views/static")
routes.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)