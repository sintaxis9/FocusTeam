from app.app import app  # IMPORTA la instancia 'app' definida en app/app.py

if __name__ == "__main__":
    import os
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
