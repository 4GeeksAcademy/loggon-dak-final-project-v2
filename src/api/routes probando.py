"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User, Deal, Saved, Interest, Vote
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_oauthlib.client import OAuth
from werkzeug.security import generate_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



#---------------------------------------------------------Signup-------------------------------------------------------------

@api.route("/signup", methods=["POST"])
def signup():
    # Get the request data
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Bad Request"}), 400

    # Validate the data
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    if not email or not password or not username:
        return jsonify({"msg": "Missing required fields"}), 400

    # Check if the user already exists
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"msg": "User already exists"}), 400

    # Hash the password and create the new user
    new_user = User(email=email, password=password, username=username)
    
    db.session.add(new_user)
    db.session.commit()
  

    return jsonify({ "message": "success" }), 200

#----------------------------------------------------------Login Google-------------------------------------------------------------------------


# Configura la instancia de OAuth
oauth = OAuth()

# Configura el proveedor de autenticación de Google
google = oauth.remote_app(
    'google',
    consumer_key='141396503593-5ucoa6ughl6iobs8tmks7rjmvp27die2.apps.googleusercontent.com',
    consumer_secret='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',
    request_token_params={
        'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    },
    base_url='https://www.googleapis.com/plus/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

# cuando pasemos a render comentar linea 82 y descomentar linea 81
@api.route('/google_login')
def google_login():
    print(url_for('api.authorized', _external=True))
    # return google.authorize(callback=url_for('api.authorized', _external=True))
    return google.authorize(callback="https://curly-palm-tree-5gqrjj97pq4rc7gg7-3001.app.github.dev/api/google_login/google/authorized")

@api.route('/google_login/google/authorized')
def authorized():
    response = google.authorized_response()
    
    
    if response is None or response.get('access_token') is None:
        return jsonify({"msg": "Google login Failed"}), 401

    session['google_token'] = (response['access_token'], '')
    user_info = google.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses')
    

    # Verificar si el usuario ya existe en la base de datos
    user = User.query.filter_by(email=user_info.data['emailAddresses'][0]['value']).first()

    if not user:
        # Si no existe, crear un nuevo usuario
        user = User(email=user_info.data['emailAddresses'][0]['value'], username=user_info.data['names'][0]['displayName'], password=user_info.data['resourceName'])
        db.session.add(user)
        db.session.commit()

    # Puedes iniciar sesión al usuario aquí si lo deseas

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token })

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')


#-------------------------------------------------Login Steam (Esperando por autorizacion de steam)----------------------------------------------------------------------

('''
steam = oauth.remote_app(
    'steam',
    consumer_key='DC6C64C101D47449665EB173CF4E9A62',
    consumer_secret='https://steamcommunity.com/oauth/login?response_type=token&client_id=&state=lo_que_quieras',
    base_url='https://api.steampowered.com',
    request_token_params=None,
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://steamcommunity.com/openid/login',
    authorize_url='https://steamcommunity.com/openid/login',
)

@api.route('/login_steam/steam')
def login_steam():
    return steam.authorize(callback=url_for('api.authorized_steam', _external=True))

@api.route('/login_steam/steam/authorized')
def authorized_steam():
    response = steam.authorized_response()
    if response is None or 'openid.claimed_id' not in response:
        return 'Access denied: Unable to authorize via Steam.'

    steam_id = response['openid.claimed_id'].split('/')[-1]
    # Aquí puedes usar el steam_id para identificar y manejar al usuario en tu aplicación
    print(steam_id)
     # Verificar si el usuario ya existe en la base de datos
    user = User.query.filter_by(steam_id=steam_id).first()

    if not user:
        # Si no existe, crear un nuevo usuario
        user = User(steam_id=steam_id)
        db.session.add(user)
        db.session.commit()

    return 'Logged in via Steam with SteamID: ' + steam_id

@steam.tokengetter
def get_steam_oauth_token():
    return session.get('steam_token')
    ''')


#---------------------------------------------------------------------------------------------------------------------------------------------------

('''


Que nos Falta? dinero JAJAJAJ



''')
#---------------------------------------------------------------Login---------------------------------------------------------------------------------

@api.route("/login", methods=["POST"])

def Login():

    email = request.json.get("email", None)
    password = request.json.get("password", None)


# Consulta la base de datos por el nombre de usuario y la contraseña

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 401
      

    # Crea un nuevo token con el id de usuario dentro

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token })

#----ADDED THIS-------------------------------------------------------Verify Identity---------------------------------------------------------------------------------

@api.route('/verify_identity', methods=['GET'])
@jwt_required()
def verify():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if user is None:
        return jsonify({ "error": "Este usuario no existe" }), 401
    
    return jsonify({ "user": user.serialize() })

#---------------------------------------------------------------Modificar usuario-------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    id = get_jwt_identity()
    try:
        # Obtener el usuario existente por su ID
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        
        data = request.get_json()

        # Modificar solo los campos que necesitemos actualizar
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        user.username = data.get('username', user.username)
        # Actualiza otros campos según sea necesario

        # Guardar los cambios en la base de datos
        db.session.commit()

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#---------------------------------------------------------------Ver usuarios-------------------------------------------------------------------
    
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'email': user.email, 'steam_username': user.steam_username} for user in users]
    return jsonify(user_list)


#---------------------------------------------------------------Ver un usuario-------------------------------------------------------------------

@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    id = get_jwt_identity()
    try:
        # Obtener el usuario por su ID
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Serializar los datos del usuario para la respuesta
        user_data = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "steam_username": user.steam_username,
            "twitch_username": user.twitch_username,
            "image_url": user.image_url,
            "saved": [saved.serialize() for saved in user.saved],
            "posts": [posts.serialize() for posts in user.posts],
            "alerts": [alerts.serialize() for alerts in user.alerts]           
        }

        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#---------------------------------------------------------------Create Post-------------------------------------------------------------------------


@api.route('/deal', methods=['POST'])
@jwt_required()
def create_deal():
    id = get_jwt_identity()
    try:
        
        data = request.get_json()

        # Crear una nueva instancia de Deal
        print(data)
        new_deal = Deal(
            user_id=id,
            game_title=data['game_title'],
            platform=data['platform'],
            expiration_date=data['expiration_date'],
            original_price=data['original_price'],
            offer_price=data['offer_price'],
            format=data['format'],
            item_type=data['type'],
            promo_code=data['promo_code'],
            scheduled=data['scheduled'],
            scheduled_date=data['scheduled_date'],
            scheduled_time=data['scheduled_time'],
            offer_link=data['offer_link'],
            image_url=data['image_url'],
            rating=data['rating'],
            game_tags=data['game_tags']
        )

        # Agregar la instancia a la base de datos
        db.session.add(new_deal)
        db.session.commit()

        return jsonify({"message": "Deal created successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#---------------------------------------------------------------Modificar Post-------------------------------------------------------------------------
    
@api.route('/deal/<int:deal_id>', methods=['PUT'])
@jwt_required()
def update_deal(deal_id):
    id = get_jwt_identity()
    try:
        # Obtener el post existente por su ID
        deal = Deal.query.get(deal_id)

        if not deal:
            return jsonify({"error": "Deal not found"}), 404

        
        data = request.get_json()

        # Modificar solo los campos que necesitemos actualizar
        deal.promo_code = data.get('promo_code', deal.promo_code)
        deal.image_url = data.get('image_url', deal.image_url)
        deal.expiration_date = data.get('expiration_date', deal.expiration_date)
        deal.offer_price = data.get('offer_price', deal.offer_price)
        deal.scheduled_date = data.get('scheduled_date', deal.scheduled_date)
        #  Actualiza otros campos según sea necesario

        # Guardar los cambios en la base de datos
        db.session.commit()

        return jsonify({"message": "Deal updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#---------------------------------------------------------------------Eliminar un Deal-----------------------------------------------------------------

@api.route('/deal/<int:deal_id>', methods=['DELETE'])
@jwt_required()
def delete_deal(deal_id):
    id = get_jwt_identity()
    try:
        # Obtener el post existente por su ID
        deal = Deal.query.get(deal_id)

        if not deal:
            return jsonify({"error": "Deal not found"}), 404

        # Eliminar el post de la base de datos
        db.session.delete(deal)
        db.session.commit()

        return jsonify({"message": "Deal deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
#---------------------------------------------------------------------Ver un Deal-----------------------------------------------------------------------
    
@api.route('/deal/<int:deal_id>', methods=['GET'])
@jwt_required()
def get_deal(deal_id):
    id = get_jwt_identity()
    try:
        # Obtener el deal por su ID
        deal = Deal.query.get(deal_id)

        if not deal:
            return jsonify({"error": "Deal not found"}), 404

        # Serializar los datos del deal para la respuesta
        deal_data = {
            "id": deal.id,
            "user_id": deal.user_id,
            "game_title": deal.game_title,
            "platform": deal.platform,
            "date_of_creation": deal.date_of_creation,
            "expiration_date": deal.expiration_date,
            "original_price": deal.original_price,
            "offer_price": deal.offer_price,
            "format": deal.format,
            "item_type": deal.item_type,
            "promo_code": deal.promo_code,
            "scheduled": deal.scheduled,
            "scheduled_date": deal.scheduled_date,
            "scheduled_time": deal.scheduled_time,
            "offer_link": deal.offer_link,
            "image_url": deal.image_url,
            "rating": deal.rating
            # Modificar a gusto lo que se pueda ver
        }

        return jsonify(deal_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#--------------------------------------------------------------Ver todos los Deals------------------------------------------------------------------
    

@api.route('/deals', methods=['GET'])
@jwt_required()
def get_all_deals():
    id = get_jwt_identity()
    try:
        # Obtener todos los deals de la base de datos
        deals = Deal.query.all()

        # Serializar los datos de los deals para la respuesta
        deals_data = [
            {
                "id": deal.id,
                "user_id": deal.user_id,
                "game_title": deal.game_title,
                "platform": deal.platform,
                "date_of_creation": deal.date_of_creation,
                "expiration_date": deal.expiration_date,
                "original_price": deal.original_price,
                "offer_price": deal.offer_price,
                "format": deal.format,
                "item_type": deal.item_type,
                "promo_code": deal.promo_code,
                "scheduled": deal.scheduled,
                "scheduled_date": deal.scheduled_date,
                "scheduled_time": deal.scheduled_time,
                "offer_link": deal.offer_link,
                "image_url": deal.image_url,
                "rating": deal.rating
                # modificar a gusto
            }
            for deal in deals
        ]

        return jsonify(deals_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#---------------------------------------------------------Recuperar Contraseña(chequear)-----------------------------------------------------
    
('''@api.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password_request():
    id = get_jwt_identity()
    try:
        # Obtener el correo electrónico del cuerpo de la solicitud
        data = request.get_json()
        email = data.get('email')

        # Verificar si el correo electrónico está asociado a un usuario
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Generar un token de restablecimiento de contraseña y enviar un correo electrónico al usuario
        send_password_reset_email(user)

        return jsonify({"message": "Password reset email sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    ''')
#-------------------------------------------------------- Rating (chequear)--------------------------------------------------------------------
    
@api.route('/deal/up_rating/<int:item_id>', methods=['PATCH'])
@jwt_required()
def like_item(item_id):
    id = get_jwt_identity()
    try:
        # Obtener el elemento por su ID
        item = Deal.query.get(item_id)

        if not item:
            return jsonify({"error": "Item not found"}), 404

        # Incrementar el contador de likes
        item.rating += 10
        db.session.commit()

        return jsonify({"message": "Item liked successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/deal/down_rating/<int:item_id>', methods=['PATCH'])
@jwt_required()
def dislike_item(item_id):
    id = get_jwt_identity()
    try:
        # Obtener el elemento por su ID
        item = Deal.query.get(item_id)

        if not item:
            return jsonify({"error": "Item not found"}), 404

        # Incrementar el contador de likes
        item.rating -= 10
        db.session.commit()

        return jsonify({"message": "Item liked successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

