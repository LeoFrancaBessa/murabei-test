import sqlite3
from slugify import slugify

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

# GET /api/v1/books - returns a list of all books
@app.route('/api/v1/books', methods=['GET'])
def get_books():
    # Get the page and page_size parameters from the request arguments
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Call the get_all_books function with the page and page_size parameters
    books = get_all_books(page=page, page_size=page_size)

    # Return the books as a JSON response
    return jsonify(books)


# GET /api/v1/books/author/<author> - returns a list of all books by the given author
@app.route('/api/v1/books/author/<author>', methods=['GET'])
def get_books_by_author(author):
    return jsonify(get_books_by_author_name(author))


# GET /api/v1/books/title/<title> - returns a list of all books by the given title
@app.route('/api/v1/books/title/<title>', methods=['GET'])
def get_books_by_title(title):
    return jsonify(get_books_by_title(title))


# POST /api/v1/books - creates a new book
@app.route('/api/v1/books', methods=['POST'])
def create_book():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(create_new_book(book_data))


# POST /api/v1/books/delete - delete a book
@app.route('/api/v1/books/delete', methods=['POST'])
def delete_book_by_id():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(delete_book(book_data))


def get_all_books(page=1, page_size=10):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Calculate the offset based on the page number and page size
    offset = (page - 1) * page_size

    # Execute a SELECT query with pagination
    cursor.execute(f'SELECT * FROM book ORDER BY ID DESC LIMIT {page_size} OFFSET {offset};')
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4]
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list

def get_books_by_author_name(author):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    query = f"SELECT * FROM book WHERE author like '%{author}%';"
    cursor.execute(query)
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_books_by_title(title):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    query = f"SELECT * FROM book WHERE title like '%{title}%';"
    cursor.execute(query)
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author': book[2],
            'biography': book[4],
            'authors': book[5],
            'publisher': book[12],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def create_new_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Get the book data from the request body
    title = book_data['title']
    author = book_data['author']
    author_slug = slugify(author)
    author_bio = book_data['author_bio']
    authors = book_data['authors']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']

    # Execute a query to create a new book
    cursor.execute(f'''INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES ('{title}', '{author}', '{author_slug}', '{author_bio}', '{authors}', '{publisher}', '{synopsis}');''')

    # Commit the changes to the database
    conn.commit()

    print(cursor.rowcount)

    # Close the database connection
    conn.close()

    # Return a message to the user
    return {'message': 'Book created successfully.'}, 201


def delete_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Get the book data from the request body
    id = book_data['id']

    # Execute a query to delete the book
    cursor.execute('DELETE FROM book WHERE id = ?;', (id,))
    # Commit the changes to the database
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a message to the user
    return {'message': 'Book deleted successfully.'}, 201


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')