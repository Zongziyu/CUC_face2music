import os
from flask import Flask, request, redirect, url_for

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '../../../upload'

@app.route('/')
def index():
    return app.send_static_file('main.html')

@app.route('/send',methods=['GET','POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file :
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)+'.png')
            return filename
    return ''


if __name__ == '__main__':
    app.debug=True
    app.run(host='0.0.0.0')
