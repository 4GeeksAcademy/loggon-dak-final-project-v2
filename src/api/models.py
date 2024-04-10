from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

#--------------------------------------------------------User------------------------------------------------------------------------ 
#-----------------------------------Notas: Antes de popular base de datos, incluso test,---------------------------------------------
#----------------------------------------  asegurar de no modifcar models               ---------------------------------------------
#------------------------------------------------------------------------------------------------------------------------------------

class User(db.Model): #(todo)
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    image_url = db.Column(db.String)
    username = db.Column(db.String(30), nullable=False)
    steam_username = db.Column(db.String(40))
    twitch_username = db.Column(db.String(40))
    interests = db.relationship('Interests', backref='user', lazy=True) 
    saved = db.relationship('Saved', backref='user', lazy=True)
    posts = db.relationship('Post', backref='user', lazy=True)
    alerts = db.relationship('Alerts', backref='user', lazy=True)
    newsletter = db.Column(db.Boolean())
     

    def __repr__(self):
        return '<User %r>' % self.id
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "image_url": self.image_url,
            "username": self.username,
            "steam_username": self.steam_username,
            "twitch_username": self.twitch_username,
            "interests": [interest.serialize() for interest in self.interest],
            "saved" : [saved.serialize() for saved in self.saved],
            "posts": [posts.serialize() for posts in self.saved],
            "alerts": [alerts.serialize() for alerts in self.saved],
            "newsletter": self.newsletter,
    
        }
    
#--------------------------------------------------Deal--------------------------------------------------------------
    
class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    game_title = db.Column(db.String(200), nullable=False)
    platform = db.Column(db.String(250), nullable=False)
    #date_of_creation = db.Column(db.DateTime, nullable=False)
    expiration_date = db.Column(db.DateTime)
    original_price = db.Column(db.String, nullable=False)
    offer_price = db.Column(db.String, nullable=False)
    format = db.Column(db.String(250), nullable=False)
    item_type = db.Column(db.String(250), nullable=False)
    promo_code = db.Column(db.String(250))
    scheduled = db.Column(db.Boolean())
    scheduled_date = db.Column(db.DateTime)
    scheduled_time = db.Column(db.DateTime)
    offer_link = db.Column(db.String(200), unique=True, nullable=False)
    image_url = db.Column(db.String(200))
    rating = db.Column(db.Integer) # serializar diferencias
    game_tags = db.Column(db.String(5)) #array (datos de otra)
    
    
    

    def __repr__(self):
        return f'<Deal {Deal.user_id}>'
    

    def serialize(self): #( todo)
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_title": self.game_title,
            "platform": self.platform,
            #"date_of_creation": self.date_of_creation,
            "expiration_date": self.expiration_date,
            "original_price": self.original_price,
            "offer_price": self.offer_price,
            "format": self.format,
            "item_type": self.item_type,
            "promo_code": self.promo_code,
            "scheduled": self.scheduled,
            "scheduled_date": self.scheduled_date,
            "scheduled_time": self.scheduled_time,
            "offer_link": self.offer_link,
            "image_url": self.image_url,
            "rating": self.rating,
            "game_tags": self.game_tags
    
        }
    
#------------------------------------------------------Interest----------------------------------------------------------------------
    
class Interest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    tag_name = db.Column(db.Integer, nullable=False)
    

    def __repr__(self):
        return '<Interest %r>' % self.id

    def serialize(self): 
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tag_name": self.tag_name
        }
    
#---------------------------------------------------------Save------------------------------------------------------------------------

class Saved(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    deal_id = db.Column(db.Integer, db.ForeignKey("deal.id"), nullable=False)
    

    def __repr__(self):
        return '<Saved %r>' % self.id

    def serialize(self): 
        return {
            "id": self.id,
            "user_id": self.user_id,
            "deal_id": self.deal_id
        }
    
#---------------------------------------------------------Vote-------------------------------------------------------------------------
    
class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    deal_id = db.Column(db.Integer,db.ForeignKey("deal.id"), nullable=False)
    
    
    def __repr__(self):
        return '<Vote %r>' % self.id

    def serialize(self): 
        return {
            "id": self.id,
            "user_id": self.user_id,
            "deal_id": self.deal_id 
        }